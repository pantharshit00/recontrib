import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@reach/tooltip/styles.css';
import { Recontrib } from '../.';
import { Container, Table, Input, Form, FormGroup } from 'reactstrap';
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
   fetch('https://api.github.com/repos/zeit/next.js/stats/commit_activity')
        .then(res => res.json())
        .then(res => { setData(res) })
 },[]);

 return (
   <div>
    <Recontrib 
      data={data}
      gridSize={15}
      fontSize="12px" 
    />
   </div>
 )
}
`;

const WEEK_DATA = `interface WeekData {
  days: number[]; // commits in individual days in the week
  total: number; // total number commits in the week
  week: number; // Timestamp in seconds of the seconds of the starting of the week
}`;

const PROP = `interface Props {
  data: Array<WeekData>;
  gridSize?: number;
  fontSize?: string;
}`;

const App = () => {
  let [repoData, setData] = React.useState({ error: null, data: [] });
  const [{ repo, owner }, setForm] = React.useState({
    repo: 'prisma',
    owner: 'prisma',
  });
  let [url, setUrl] = React.useState(
    `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
  );
  React.useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 404) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then(res => {
        setData({ error: null, data: res });
      })
      .catch(err => {
        setData({ error: err.message, data: [] });
      });
  }, [url]);
  return (
    <Container>
      <Container fluid>
        <h1 className="mt-4 py-2">Recontrib</h1>
        <p>React Component that implements GitHub Commit Graph</p>
      </Container>
      <Container fluid>
        <Form
          onSubmit={e => {
            e.preventDefault();
            setUrl(
              `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
            );
          }}
          inline
        >
          <Input
            onChange={e => {
              setForm({ repo, owner: e.currentTarget.value });
            }}
            value={owner}
            className="mr-2"
            type="text"
            id="repo"
            placeholder="owner"
          />{' '}
          /
          <Input
            id="owner"
            value={repo}
            onChange={e => {
              setForm({ owner, repo: e.currentTarget.value });
            }}
            className="ml-2"
            type="text"
            placeholder="repo"
          />
          <Input type="submit" hidden={true} />
        </Form>
        {repoData.data && repoData.data.length ? (
          <Recontrib data={repoData.data} gridSize={15} fontSize="12px" />
        ) : repoData.error ? (
          <p>{repoData.error}</p>
        ) : (
          'Loading....'
        )}
      </Container>
      <hr />
      <Container fluid className="mt-4">
        <h3>Usuage</h3>
        <h5 className="mt-4">1. Install the dependencies</h5>
        <pre className="language-bash line-numbers">
          <code>{INSTALL_CODE}</code>
        </pre>
        <h5 className="mt-4">2. Add the Reach UI tooltip CSS</h5>
        <p>
          This component use Reach UI's Tooltip component. Install it as a peer
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
            <tr>
              <th>gridSize</th>
              <td>
                <code>number</code>
              </td>
              <td>yes - default 10</td>
            </tr>
            <tr>
              <th>fontSize</th>
              <td>
                <code>string</code>
              </td>
              <td>yes - default 9px</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container fluid>
        <h5 className="mt-4 mb-4">Interfaces</h5>
        <h6>WeekData</h6>
        <pre className="language-typescript line-numbers">
          <code>{WEEK_DATA}</code>
        </pre>
        <h6>Prop</h6>
        <pre className="language-typescript line-numbers">
          <code>{PROP}</code>
        </pre>
        <hr />
        <p>
          MIT ©️ <a href="https://twitter.com/pantharshit00">Harshit Pant</a>{' '}
          2019
        </p>
      </Container>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
