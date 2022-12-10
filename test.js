import {
  observable,
  observe,
} from './src/core/subscribe.js';

const state = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${state.a}`));
observe(() => console.log(`b = ${state.b}`));
observe(() => console.log(`a + b = ${state.a} + ${state.b}`));

console.log("new");
state.a = 100;
state.b = 200;
