# Defining actions to update state

In order to update your state you need to define an [action](/docs/api/action) against your model.

```javascript
import { action } from 'easy-peasy';

const store = createStore({
  todos: {
    items: [],
    addTodo: action((state, payload) => {
      state.items.push(payload)
    })
  }
});
```

The [action](/docs/api/action) will receive as its first parameter the state that is local to it. In the example above our [action](/docs/api/action) would receive `{ items: [] }` as the value for its `state` argument. It will also receive any `payload` that may have been provided when the action was dispatched.

You will notice that we are mutating the state directly within the [action](/docs/api/action). Don't worry, we use the amazing [immer](https://github.com/immerjs/immer) library to convert these mutative updates into an immutable update against your store.

## Alternative syntax

You can alternatively use traditional methods of returning new instances, instead of the mutation-like form.

```javascript
addTodo: action((state, payload) => {
  return { ...state, items: [...state.items, payload] };
})
```

Some may find the above harder to read and error prone, however, we accept that this is a purely subjective matter.