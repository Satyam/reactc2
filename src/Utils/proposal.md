Amazed by the way the Redux Toolkit made my life easier (thanks for that), I tried to simplify something that anoyed me in my application.
I had several on/off options, a few shared values and lesser bits and pieces that I needed sharing in between a few components and there was a lot of code that I kept repeating which I thought might be a good candidate for a sinple adapter like `createEntityAdapter` but for simple values instead of collections. So, this is what I wrote:

```js
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export default function createSetOptionAdapter(
  name,
  defaultValue,
  options = {}
) {
  const { sliceName = 'options' } = options;

  const selector = (state) => state[sliceName][name];
  const action = createAction(name);
  const reducer = (state, action) => {
    state[name] = action.payload;
  };
  const useState = () => {
    const dispatch = useDispatch();
    return [
      useSelector(selector),
      useCallback((value) => dispatch(action(value)), [dispatch]),
    ];
  };

  return {
    selector,
    action,
    reducer,
    useState,
    default: defaultValue,
    toString: () => name,
  };
}
```

It might better be called `createValueAdapter` but I use it mainly for configuration options, thus the name as well as the default for the `sliceName` option.  

Also, to make it similar to `createEntityAdapter` the slice would have to be provided by a function like it is done in `getSelectors`. This would allow the value to be located at any depth, instead of a shallow slicing of the global Redux state.

It should also be typescripted.

To create the actual adapter, I do: 

```js
export const showCoords = createSetOptionAdapter('showCoords', true);
```

Then, in the reducer:

```js
import { createReducer } from '@reduxjs/toolkit';

import {
  showCoords,
  // ... other adapters
} from './adapters';

export default createReducer(
  {
    [showCoords]: showCoords.default,
    // ... other initial values
  },
  {
    [showCoords]: showCoords.reducer,
    // ... other reducers
  }
);
```

The `useState` property can be used in components as it is, straight from the adapter:

```js
  const [showCoords, setShowCoords] = showCoords.useState();
```

Or re-exported as a standalone hook:

```js
export const useShowCoords = showCoords.useState;
```

and used in components:

```js
  const [showCoords, setShowCoords] = useShowCoords();
```

Basically, it is like a global `React.useState`.

Both the raw `selector` and the `action` creator are available as properties.  

```js
createSelector(
  showCoords.selector,
  // ...
```

or, in some other action creator

```js
export function doWhatever() {
  return async (dispatch, getState) => {
    if (!showCoords.selector(getState())) return;

// and elsewhere
     dispatch(showCoords.action(true));
```

Since it is meant for simple values, there seems to be no point in providing a `prepareAction` option for `createAction`. Whatever the value might be, it goes straight into the payload.