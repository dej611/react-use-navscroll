import React from 'react';
import { Link } from 'wouter';
import { examplesPages } from './constants';

export const Menu = () => {
  return (
    <div className='row'>
      <div className='col'>
        <div className='paper'>
          <h3>Examples</h3>
          <ol>
            {examplesPages.map(({ url, title, img }) => (
              <li key={url}>
                <Link href={url}>{title}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
