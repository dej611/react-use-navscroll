import React, { useState } from 'react';

export const SourceCode = ({ content }) => {
  const [open, toggle] = useState(false);
  return (
    <div className='md-9 col'>
      <div className='section'>
        <div className='collapsible'>
          <input
            id='collapsibleSourceCode'
            type='checkbox'
            name='collapsible'
            checked={open}
            onChange={() => {}}
          />
          <label htmlFor='collapsibleSourceCode' onClick={() => toggle(!open)}>
            {open ? 'Close' : 'Click to show source code'}
          </label>
          <div
            className='collapsible-body'
            style={open ? { overflowY: 'scroll' } : {}}
          >
            <pre>
              <code>{content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
