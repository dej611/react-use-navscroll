import React from 'react';
import { Link } from 'wouter';

export const Navbar = () => {
  return (
    <nav className='border fixed split-nav'>
      <div className='nav-brand'>
        <h3>
          <Link href='/'>useNavScroll</Link>
        </h3>
      </div>
      <div className='collapsible'>
        <input id='collapsible1' type='checkbox' name='collapsible1' />
        <label htmlFor='collapsible1'>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </label>
        <div className='collapsible-body'>
          <ul className='inline'>
            <li>
              <Link href='/documentation'>Get started</Link>
            </li>
            <li>
              <Link href='/api'>API</Link>
            </li>
            <li>
              <Link href='/examples'>Examples</Link>
            </li>
            <li>
              <a
                href='https://github.com/dej611/react-use-navscroll'
                target='_blank'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
