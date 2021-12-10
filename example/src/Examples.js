import React from 'react';
import { Link } from 'wouter';
import { examplesPages } from './constants';

export const Examples = () => {
  return (
    <div className='md-9 col'>
      <div className='section'>
        <h1>Examples</h1>
        <div className='row'>
          {examplesPages.map(({ url, title, img }) => (
            <div className='md-4 col' key={url}>
              <Link href={url}>
                <img src={img} alt={title} />
                {title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
