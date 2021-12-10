const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const rootPath = path.resolve(__dirname);

let json;
try {
  json = require('../doc.json');
} catch (e) {
  throw Error(
    "No doc.json file found. Run 'npm run doc' to make sure the file is in place."
  );
}

function isFunction({ kindString }) {
  return kindString === 'Function';
}

function isInterface({ kindString, type }) {
  return (
    kindString === 'Interface' ||
    (kindString === 'Type alias' &&
      type.type === 'reflection' &&
      type.declaration.children)
  );
}

function isProperty({ kindString }) {
  return kindString === 'Property';
}

function isMethod({ kindString }) {
  return kindString === 'Method';
}

const isUtility = isFunction;

function isReactComponent({ kindString, signatures }) {
  return isFunction({ kindString }) && signatures[0].type.name === 'Element';
}

function getCommentSection(typeRecord) {
  return { shortText: '', tags: [], ...typeRecord.comment };
}

function getChildren({ kindString, children, type }) {
  if (kindString === 'Interface') {
    return children;
  }
  if (
    kindString === 'Type alias' &&
    type.type === 'reflection' &&
    type.declaration.children
  ) {
    return type.declaration.children;
  }
  throw Error('No children found');
}

function typeDescription({ type, ...props } = {}, inline = false) {
  if (type === 'literal') {
    return '"' + props.value + '"';
  }
  if (props.kindString === 'Property' || props.kindString === 'Parameter') {
    return `${props.name} ${
      props.flags.isOptional ? '?' : ''
    }: ${typeDescription(type)}`;
  }
  if (props.kindString === 'Method') {
    return `${props.name} ${
      props.flags.isOptional ? '?' : ''
    }: ${typeDescription(type)}`;
  }
  if (type === 'reference' || type === 'intrinsic') {
    if (props.typeArguments) {
      return `${props.name}<${props.typeArguments
        .map(({ type: innerType, ...innerProps }) => {
          return innerType === 'reference' && innerProps.name !== 'Element'
            ? // TODO: refactor this to be more generic
              `${innerProps.name} extends Element`
            : typeDescription({ type: innerType, ...innerProps });
        })
        .join(' , ')}>`;
    }
    return props.name;
  }
  if (type === 'union') {
    return props.types.map(typeDescription).join(' | ');
  }

  if (type === 'array') {
    return `${typeDescription(props.elementType)}[]`;
  }

  if (type === 'indexedAccess') {
    return `${typeDescription(props.objectType)}[${typeDescription(
      props.indexType
    )}]`;
  }

  if (type === 'reflection') {
    if (props.declaration.children) {
      // object shaped
      return `{
            ${props.declaration.children
              .map(typeDescription)
              .join(inline ? ', ' : '\n')}
        }`;
    }
    if (props.declaration.signatures) {
      const [signature] = props.declaration.signatures;
      if (!signature.parameters) {
        return `() => ${typeDescription(signature.type)}`;
      }
      // function literal
      return `(
          ${signature.parameters
            .map(typeDescription)
            .join(',\n')}) => ${typeDescription(signature.type)}`;
    }
  }

  if (type === 'unknown') {
    // give it a try
    return props.name;
  }
}

function unrollType(record, array) {
  if (record.type === 'reference') {
    const referenced = array.find(({ name }) => name === record.name);
    if (referenced) {
      const value = typeDescription(
        referenced.type ? referenced.type : referenced,
        true
      );
      return value && value.replace(/\n/g, '');
    }
  }
  if (record.type === 'union') {
    return record.types
      .map((nestedRecord) => unrollType(nestedRecord, array))
      .join(' | ');
  }
  if (record.type === 'array') {
    const finalType = unrollType(record.elementType, array);
    return finalType ? finalType + '[]' : undefined;
  }
  if (record.type === 'indexedAccess') {
    const referenced = array.find(
      ({ name }) => name === record.objectType.name
    );
    if (referenced) {
      const prop = referenced.children.find(
        ({ name }) => name === record.indexType.value
      );
      if (prop) {
        return typeDescription(prop).replace(/.* : /, '');
      }
    }
  }
  return record.name;
}

const rewriteRecord = (typeRecord, i, array) => {
  if (isReactComponent(typeRecord)) {
    return {
      type: 'Component',
      name: typeRecord.name,
      description: getCommentSection(typeRecord.signatures[0]).shortText,
      returnType: typeDescription(typeRecord.signatures[0].type),
      props: typeRecord.signatures.flatMap(({ parameters }) =>
        parameters.map(typeDescription)
      )
    };
  }
  if (isUtility(typeRecord)) {
    return {
      type: typeRecord.kindString,
      name: typeRecord.name,
      description: typeRecord.signatures
        .flatMap(({ comment }) => comment && comment.shortText)
        .filter(Boolean)
        .join('\n'),
      returnType: typeDescription(typeRecord.signatures[0].type),
      props: typeRecord.signatures
        .flatMap(
          ({ parameters }) => parameters && parameters.map(typeDescription)
        )
        .filter(Boolean)
    };
  }
  if (isInterface(typeRecord)) {
    return {
      type: typeRecord.kindString,
      name: typeRecord.name,
      description: getCommentSection(typeRecord).shortText,
      children: getChildren(typeRecord).map((record) =>
        rewriteRecord(record, null, array)
      )
    };
  }
  if (isProperty(typeRecord)) {
    return {
      type: typeRecord.kindString,
      name: typeRecord.name,
      description: getCommentSection(typeRecord).shortText,
      isOptional: typeRecord.flags.isOptional,
      unrolledTypes: unrollType(typeRecord.type, array),
      valueType: typeDescription(typeRecord.type),
      defaultValue: getCommentSection(typeRecord)
        .tags.filter(({ tag }) => tag === 'defaultvalue')
        .map(({ text }) => text),
      paramsDescription: getCommentSection(typeRecord)
        .tags.filter(({ tag }) => tag === 'param')
        .map(({ param, text }) => `\`${param}\`: ${text}`)
    };
  }
  if (isMethod(typeRecord)) {
    return {
      type: typeRecord.kindString,
      name: typeRecord.name,
      description: typeRecord.signatures
        .flatMap(({ comment }) => comment && comment.shortText)
        .filter(Boolean)
        .join('\n'),
      returnType: typeDescription(typeRecord.signatures[0].type),
      props: typeRecord.signatures
        .flatMap(
          ({ parameters }) => parameters && parameters.map(typeDescription)
        )
        .filter(Boolean)
    };
  }
  return {
    type: typeRecord.kindString,
    name: typeRecord.name,
    description: getCommentSection(typeRecord).shortText,
    valueType: typeDescription(typeRecord.type)
  };
};

const types = json.children.flatMap(rewriteRecord);

readFile(path.normalize(rootPath + '/readme.template'), {
  encoding: 'UTF8'
})
  .then((readme) => {
    const SEPARATOR = '\n\n___\n\n';
    const markdown = `
  ## Hook

  ${types
    .filter(({ type }) => type === 'Function')
    .map(({ name, description, returnType, props }) => {
      return `#### ${name}\n
        
        \`${name}(${props.length ? props.join('`, `') : ''}) => ${returnType}\`

        ${description.replace(/\n/g, '  \n')}
        `;
    })
    .join('\n')}
    ${SEPARATOR}

    ## Types

  ${types
    .filter(({ name, type }) => !/Props$/.test(name) && /Type/.test(type))
    .map(({ name, valueType, description, children }) => {
      if (children) {
        return `**${name}**
        
        ${description.replace(/\n/g, '  \n')}

        \`\`\`
        {
          ${children
            .map(({ name, valueType, returnType, props }) => {
              if (valueType) {
                return `
              ${name}: ${valueType}`;
              }
              return `
            ${name}: (${
                props.length ? props.join(', ') : ''
              }) => ${returnType}`;
            })
            .join(',\n')}
          
          }
          \`\`\`  \n
        ${
          children.some(({ description }) => description)
            ? `
        The details of each property is described here:

        ${children
          .map(({ name, valueType, returnType, props, description }) => {
            if (valueType) {
              return `
              * **${name}**: \`${valueType}\`  \n
              ${description.replace(/\n/g, '  \n')}`;
            }
            return `
            * **${name}**: \`(${
              props.length ? props.join(', ') : ''
            }) => ${returnType}\`\n
            
            ${description.replace(/\n/g, '  \n')}`;
          })
          .join('  \n\n')}
        `
            : ''
        }`;
      }
      return `**${name}**
      
      ${description.replace(/\n/g, '  \n')}

      \`${valueType}\`  \n
        ${description.replace(/\n/g, '  \n')}`;
    })
    .join(SEPARATOR)}
  ${SEPARATOR}
  ${types
    .filter(({ type }) => type === 'Interface')
    .map(({ name, description, children }) => {
      return `**${name}**\n
        ${description.replace(/\n/g, '  \n')}
        
        ${children
          .map(({ name, description, isOptional, valueType }) => {
            return `* ${name}: \`${valueType}\`${
              isOptional ? ' - Optional' : ''
            }  \n
            ${description.replace(/\n/g, '  \n')}`;
          })
          .join('\n')}`;
    })
    .join(SEPARATOR)}
    `
      .split('\n')
      .map((line) => line.trimStart())
      .join('\n');
    const result = readme.replace('{{api}}', markdown);

    return Promise.all([
      writeFile(path.normalize(rootPath + '/../README.md'), result, {
        encoding: 'UTF8'
      }),
      writeFile(
        path.normalize(rootPath + '/../example/public/doc.md'),
        markdown,
        {
          encoding: 'UTF8'
        }
      )
    ]);
  })
  .then(() => console.log('All done!'));
