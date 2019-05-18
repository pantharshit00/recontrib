import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@reach/tooltip/styles.css';
import { Recontrib } from '../.';
import { data } from './data';
import { Container, Table } from 'reactstrap';
import 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const INSTALL_CODE = `npm install recontrib @reach/tooltip
# or yarn add recontrib @reach/tooltip
`;

const CSS_CODE = `import '@reach/tooltip/style.css`;

const APP_CODE = `import React, { useEffect, useState } from 'react';
import { Recontrib } from 'recontrib';

const App = () => {
 let [data, setData] = useState([]);
 useEffect(() => {
   fetch('https://api.github.com/repos/zeit/next.js/commit_history')
        .then(res => res.json())
        .then(res => { setData(data) })
 },[]);

 return (
   <div>
    <Recontrib data={data} />
   </div>
 )
}
`;

const WEEK_DATA = `interface WeekData {
  days: number[];
  total: number;
  week: number;
}`;

const App = () => {
  return (
    <Container>
      <Container fluid>
        <h1 className="mt-4 p-2">Recontrib</h1>
        <p>React Component that implements GitHub Commit Graph</p>
      </Container>
      <Recontrib data={data} />
      <hr />
      <Container fluid className="mt-4">
        <h3>Usuage</h3>
        <h5 className="mt-4">1. Install the dependencies</h5>
        <pre className="language-bash line-numbers">
          <code>{INSTALL_CODE}</code>
        </pre>
        <h5 className="mt-4">2. Add the React UI tooltip CSS</h5>
        <p>
          This component use React UI's Tooltip component. Install it as a peer
          dependency
        </p>
        <pre className="language-javascript line-numbers">
          <code>{CSS_CODE}</code>
        </pre>
        <h5 className="mt-4">2. Use the component in your code</h5>
        <pre className="language-javascript line-numbers">
          <code>{APP_CODE}</code>
        </pre>
      </Container>
      <hr />
      <Container fluid>
        <h3 className="mb-4">API</h3>
        <Table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>optional</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>data</th>
              <td>
                <code>WeekData</code>
              </td>
              <td>no</td>
            </tr>
          </tbody>
          <h5 className="mt-4 mb-4">Interfaces</h5>
          <h6>WeekData</h6>
          <pre className="language-typescript line-numbers">
            <code>{WEEK_DATA}</code>
          </pre>
        </Table>
        <hr />
        <p>MIT ©️ Harshit Pant 2019</p>
      </Container>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
