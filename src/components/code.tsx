import {useStore} from 'effector-react';
import React from 'react';

const Code = ({source, title}) => {
  const data = useStore(source);
  const code = JSON.stringify(data, null, 2);
  return (
    <div className="code">
      <h1 className="code-title">
        {title}
        <a className="state-info-icon" href="/some-url">?</a>
      </h1>
      <pre>{code}</pre>
    </div>
  );
}

export default Code;
