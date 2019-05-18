# Recontrib

React Component that implements GiHub's commit graph UI. https://pantharshit.github.io/recontrib

![image](https://user-images.githubusercontent.com/22195362/57941632-17990f80-78ed-11e9-86b3-939f7ac1209b.png)

## Usuage

1. Add the Reach UI tooltip CSS

```js
import '@reach/tooltip/style.css';
```

2. Use the component and pass the data

```js
const App = () => {
  return (
    <div>
      <Recontrib data={data} />
    </div>
  );
};
```

Data is structured as following. You can directly pass the data from the GitHub API(https://api.github.com/repos/:owner/:repo/commit_activity):

```ts
interface WeekData {
  days: number[]; // commits in individual days in the week
  total: number; // total number commits in the week
  week: number; // Timestamp in seconds of the seconds of the starting of the week
}
```

## Props

```ts
interface Props {
  data: Array<WeekData>; // data
  gridSize?: number; // size of the tile
  fontSize?: string; // fontSize of months and weekdays
}
```

---

MIT️ ©️ [Harshit Pant](https://twitter.com/pantharshit00) 2019
