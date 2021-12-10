import React from 'react';
import { useNavScroll } from 'react-use-navscroll';
import { ArticleIntro } from '../atoms/Intro';
import { Article } from '../atoms/Article';

export const TopMenuHorizontal = () => {
  const { register, isActive } = useNavScroll({ isHorizontal: true });
  const getActiveClass = (id) => (isActive(id) ? 'text-secondary' : '');
  return (
    <div>
      <nav className='border sticky fixed' style={{ top: 80 }}>
        <div className='nav-brand'>
          <h4>Top menu</h4>
        </div>
        <div className='collapsible'>
          <input id='collapsible2' type='checkbox' name='collapsible2' />
          <label htmlFor='collapsible2'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </label>
          <div className='collapsible-body'>
            <ul className='inline'>
              <li>
                <a href={`#1`} className={getActiveClass('1')}>
                  Article 1
                </a>
              </li>
              <li>
                <a href={`#2`} className={getActiveClass('2')}>
                  Article 2
                </a>
              </li>
              <li>
                <a href={`#3`} className={getActiveClass('3')}>
                  Article 3
                </a>
              </li>
              <li>
                <a href={`#4`} className={getActiveClass('4')}>
                  Article 4
                </a>
              </li>
              <li>
                <a href={`#5`} className={getActiveClass('5')}>
                  Article 5
                </a>
              </li>
              <li>
                <a href={`#6`} className={getActiveClass('6')}>
                  Article 6
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='md-8 col'>
        <div className='paper'>
          <article className='article'>
            <ArticleIntro />
          </article>
        </div>
        <div
          className='row'
          style={{ flexWrap: 'nowrap', flexDirection: 'row' }}
        >
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`1`)}>
                Article 1
              </h2>
              <Article />
            </div>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`2`)}>
                Article 2
              </h2>
              <Article />
            </div>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`3`)}>
                Article 3
              </h2>
              <Article />
            </div>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`4`)}>
                Article 4
              </h2>
              <Article />
            </div>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`5`)}>
                Article 5
              </h2>
              <Article />
            </div>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <h2 className='article-title' {...register(`6`)}>
                Article 6
              </h2>
              <Article />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
