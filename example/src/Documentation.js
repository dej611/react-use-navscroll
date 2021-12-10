import React from 'react';

export const Documentation = () => {
  return (
    <div className='md-8 col'>
      <div className='paper'>
        <div className='section'>
          <h1>Get started</h1>
          <h3>Installation</h3>
          Installing <code>react-use-navscroll</code> only takes a single
          command and you're ready to scroll.
          <pre>
            <code>npm install react-use-navscroll</code>
          </pre>
          <h3>Register elements</h3>
          One of the key concepts in <code>react-use-navscroll</code> is to{' '}
          <strong>register</strong> the elements to track and record its
          hierarchy.
          <pre>
            <code>
              {`import React from 'react';
import { useNavScroll } from 'react-use-navscroll';

const Example = () => {
  const { register, isActive } = useNavScroll();
  const getActiveMark = (id) => (isActive(id) ? ' (active)' : '');

  return (
    <div className='md-9 col'>
      <div className='section'>
        <h2>Navscroll with long sidebar</h2>
        <div className='row'>
          <div className='md-4 col'>
            <ol className='sticky'>
              <li>
                <a href='#1'>Article 1 {isActive('1') ? ' (active)' : ''}</a>
              </li>
              <li>
                <a href='#2'>Article 2 {isActive('2') ? ' (active)' : ''}</a>
              </li>
            </ol>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <article className='article'>
                <ArticleIntro />
                <h2 className='article-title' {...register('1')}>
                  Article 1
                </h2>
                <Article />
                <h2 className='article-title' {...register('2')}>
                  Article 2
                </h2>
                <Article />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`}
            </code>
          </pre>
          <h4>Hierarchies</h4>
          The libraries keep track of hierarchies and provides some helpers for
          that use case. Here's an example:
          <pre>
            <code>
              {`
...
<h2 className='article-title' {...register('2')}>
    Article 2
</h2>
<Article />
<h2 className='article-title' {...register('2.1', {parent: '2'})}>
    Article 2.1
</h2>
<Article />
            `}
            </code>
          </pre>
          The element with <code>id: "2.1"</code> will be registered as children
          of the <code>id: "2"</code> in a hierarchy. This can be useful in some
          use cases, for instance when sub elements are nested within an
          accordion/collapse parent element that has to be open when active.
        </div>
      </div>
    </div>
  );
};
