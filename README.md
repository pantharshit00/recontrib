# Reconrib

React Component that implements GiHub's commit graph UI.

![image](https://user-images.githubusercontent.com/22195362/57941632-17990f80-78ed-11e9-86b3-939f7ac1209b.png)

## Usuage

1. Add the React UI tooltip CSS

```js
import '@react/tooltip/css';
```

2. Use the component and pass the data(from https://api.github.com/repos/:owner/:repo/stats/commit_activity)

```js
const App = () => {
  return (
    <div>
      <Recontrib data={data} />
    </div>
  );
};
```
