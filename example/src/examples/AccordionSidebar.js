import React, { useState } from 'react';
import { useNavScroll } from 'react-use-navscroll';
import { ArticleIntro } from '../atoms/Intro';
import { Article } from '../atoms/Article';

export const AccordionSidebar = () => {
  const { register, isActive } = useNavScroll();
  const getActiveMark = (id) => (isActive(id) ? ' (active)' : '');

  const [isOpenOne, toggleOne] = useState(false);
  const [isOpenTwo, toggleTwo] = useState(false);
  return (
    <div className='md-9 col'>
      <div className='section'>
        <h2>Navscroll with accordion sidebar</h2>
        <div className='row'>
          <div className='md-4 col'>
            <ol className='sticky'>
              <li>
                <div className='collapsible'>
                  <input
                    id='collapsible1'
                    type='checkbox'
                    name='collapsible'
                    checked={isActive('nested_1') || isOpenOne}
                    onChange={() => {}}
                  />
                  <label
                    htmlFor='collapsible1'
                    onClick={() => toggleOne(!isOpenOne)}
                  >
                    <a href='#nested_1'>Intro 1{getActiveMark('nested_1')}</a>
                  </label>
                  <div className='collapsible-body'>
                    <ol>
                      <li>
                        <a href='#nested_1_1'>
                          Nested Item 1.1{getActiveMark('nested_1_1')}
                        </a>
                        <ol>
                          <li>
                            <a href='#nested_1_1_1'>
                              Nested Item 1.1.1{getActiveMark('nested_1_1_1')}
                            </a>
                          </li>
                          <li>
                            <a href='#nested_1_1_2'>
                              Nested Item 1.1.2{getActiveMark('nested_1_1_2')}
                            </a>
                          </li>
                          <li>
                            <a href='#nested_1_1_3'>
                              Nested Item 1.1.3{getActiveMark('nested_1_1_3')}
                            </a>
                          </li>
                        </ol>
                      </li>
                      <li>
                        <a href='#nested_1_2'>
                          Nested Item 1.2{getActiveMark('nested_1_2')}
                        </a>
                      </li>
                      <li>
                        <a href='#nested_1_3'>
                          Nested Item 1.3{getActiveMark('nested_1_3')}
                        </a>
                      </li>
                    </ol>
                  </div>
                </div>
              </li>
              <li>
                <div className='collapsible'>
                  <input
                    id='collapsible1'
                    type='checkbox'
                    name='collapsible'
                    checked={isActive('nested_2') || isOpenTwo}
                    onChange={() => {}}
                  />
                  <label
                    htmlFor='collapsible1'
                    onClick={() => toggleTwo(!isOpenTwo)}
                  >
                    <a href='#nested_2'>Intro 2{getActiveMark('nested_2')}</a>
                  </label>
                  <div className='collapsible-body'>
                    <ol>
                      <li>
                        <a href='#nested_2_1'>
                          Nested Item 2.1{getActiveMark('nested_2_1')}
                        </a>
                        <ol>
                          <li>
                            <a href='#nested_2_1_1'>
                              Nested Item 1.1.1{getActiveMark('nested_2_1_1')}
                            </a>
                          </li>
                          <li>
                            <a href='#nested_2_1_2'>
                              Nested Item 2.1.2{getActiveMark('nested_2_1_2')}
                            </a>
                          </li>
                          <li>
                            <a href='#nested_2_1_3'>
                              Nested Item 2.1.3{getActiveMark('nested_2_1_3')}
                            </a>
                          </li>
                        </ol>
                      </li>
                      <li>
                        <a href='#nested_2_2'>
                          Nested Item 2.2{getActiveMark('nested_2_2')}
                        </a>
                      </li>
                      <li>
                        <a href='#nested_2_3'>
                          Nested Item 2.3{getActiveMark('nested_2_3')}
                        </a>
                      </li>
                    </ol>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <article className='article'>
                <ArticleIntro />
                <h2 className='article-title' {...register('nested_1')}>
                  Introduzione
                </h2>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_1_1', { parent: 'nested_1' })}
                >
                  Nested item 1.1
                </h3>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_1_1_1', { parent: 'nested_1_1' })}
                >
                  Nested item 1.1.1
                </h4>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_1_1_2', { parent: 'nested_1_1' })}
                >
                  Nested item 1.1.2
                </h4>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_1_1_3', { parent: 'nested_1_1' })}
                >
                  Nested item 1.1.3
                </h4>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_1_2', { parent: 'nested_1' })}
                >
                  Nested item 1.2
                </h3>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_1_3', { parent: 'nested_1' })}
                >
                  Nested item 1.3
                </h3>
                <Article />
                <h2 className='article-title' {...register('nested_2')}>
                  Introduzione 2
                </h2>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_2_1', { parent: 'nested_2' })}
                >
                  Nested item 2.1
                </h3>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_2_1_1', { parent: 'nested_2_1' })}
                >
                  Nested item 2.1.1
                </h4>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_2_1_2', { parent: 'nested_2_1' })}
                >
                  Nested item 2.1.2
                </h4>
                <Article />
                <h4
                  className='article-title'
                  {...register('nested_2_1_3', { parent: 'nested_2_1' })}
                >
                  Nested item 2.1.3
                </h4>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_2_2', { parent: 'nested_2' })}
                >
                  Nested item 2.2
                </h3>
                <Article />
                <h3
                  className='article-title'
                  {...register('nested_2_3', { parent: 'nested_2' })}
                >
                  Nested item 2.3
                </h3>
                <Article />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
