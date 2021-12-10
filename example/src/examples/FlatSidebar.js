import React from 'react';
import { useNavScroll } from 'react-use-navscroll';
import { ArticleIntro } from '../atoms/Intro';
import { Article } from '../atoms/Article';

export const FlatSidebar = () => {
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
                <a href={`#1`}>Article 1{getActiveMark(`1`)}</a>
              </li>
              <li>
                <a href={`#2`}>Article 2{getActiveMark(`2`)}</a>
              </li>
              <li>
                <a href={`#3`}>Article 3{getActiveMark(`3`)}</a>
              </li>
              <li>
                <a href={`#4`}>Article 4{getActiveMark(`4`)}</a>
              </li>
              <li>
                <a href={`#5`}>Article 5{getActiveMark(`5`)}</a>
              </li>
              <li>
                <a href={`#6`}>Article 6{getActiveMark(`6`)}</a>
              </li>
            </ol>
          </div>
          <div className='md-8 col'>
            <div className='paper'>
              <article className='article'>
                <ArticleIntro />
                <h2 className='article-title' {...register(`1`)}>
                  Article 1
                </h2>
                <Article />
                <h2 className='article-title' {...register(`2`)}>
                  Article 2
                </h2>
                <Article />
                <h2 className='article-title' {...register(`3`)}>
                  Article 3
                </h2>
                <Article />
                <h2 className='article-title' {...register(`4`)}>
                  Article 4
                </h2>
                <Article />
                <h2 className='article-title' {...register(`5`)}>
                  Article 5
                </h2>
                <Article />
                <h2 className='article-title' {...register(`6`)}>
                  Article 6
                </h2>
                <Article />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
