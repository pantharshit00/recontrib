import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@reach/tooltip/styles.css';
import { Recontrib } from '../.';
import { data } from './data';

const App = () => {
  return (
    <div>
      <Recontrib data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
