import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

const docURL = process.env.PUBLIC_URL + '/doc.md';

const possibleStates = {
  init: { state: 'init' },
  loaded: { state: 'loaded', payload: '' },
  error: { state: 'error' }
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const Api = () => {
  const [doc, setDoc] = useState(possibleStates.init);

  useEffect(() => {
    Promise.all([fetch(docURL).then((response) => response.text()), wait(1500)])
      .then(([markdown]) =>
        setDoc({
          ...possibleStates.loaded,
          payload: markdown
        })
      )
      .catch(() => setDoc(possibleStates.error));
  }, [setDoc]);

  return (
    <div className='md-9 col'>
      <div className='section'>
        <h1>Api</h1>
        The documentation is compiled from the Typescript source and contains
        also the types exported.
        {doc.state === 'init' && <p>Loading...</p>}
        {doc.state === 'loaded' ? <Markdown>{doc.payload}</Markdown> : null}
        {doc.state === 'error' && (
          <p>
            An error occurred when loading the documentation from the server
          </p>
        )}
      </div>
    </div>
  );
};
