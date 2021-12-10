import React, { Fragment, useMemo, useRef, useEffect } from 'react';
import { useNavScroll } from 'react-use-navscroll';
import { ArticleIntro } from '../atoms/Intro';
import { Article } from '../atoms/Article';

const POINTS = 1000;
export const PerformancePage = () => {
  const { register, isActive, activeIds, getActiveRef } = useNavScroll();
  const menuRef = useRef(null);
  const getActiveMark = (id) => (isActive(id) ? ' (active)' : '');

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const arr = useMemo(() => {
    const points = parseInt(params.points, 10);
    return Array(Number.isNaN(points) ? POINTS : points).fill(1);
  }, [params.points]);

  useEffect(() => {
    const id = activeIds && activeIds[activeIds.length - 1];
    if (id) {
      const el = document.querySelector('#' + id.replace('nested', 'anchor'));
      if (el) {
        el.scrollIntoView(false);
      }
    }
  }, [activeIds]);

  return (
    <div className='md-9 col'>
      <div className='section'>
        <h2>Navscroll with long sidebar</h2>
        <div className='row'>
          <div className='md-4 col'>
            <ol
              className='sticky'
              style={{ overflowY: 'scroll', height: 'calc(100vh - 80px)' }}
              ref={menuRef}
            >
              {arr.map((_, index) => (
                <li key={index} id={`anchor_${index}`}>
                  <a href={`#nested_${index}`}>
                    Article {index + 1}
                    {getActiveMark(`nested_${index}`)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className='md-8 col'>
            <div className='row flex-right sticky'>
              <div className='col'>
                <div className='paper'>
                  Current active: {getActiveRef()?.current.textContent}
                </div>
              </div>
            </div>
            <div className='paper'>
              <article className='article'>
                <ArticleIntro />
                {arr.map((_, index) => (
                  <Fragment key={index}>
                    <h2
                      className='article-title'
                      {...register(`nested_${index}`)}
                    >
                      Article {index + 1}
                    </h2>
                    <Article />
                  </Fragment>
                ))}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
