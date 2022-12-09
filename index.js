const store = new Store({
  a: 10,
  b: 20,
});

const componenet1 = new Component({ subscribe: [store] });
const componenet2 = new Component({ subscribe: [store] });

componenet1.subscribe(store);
componenet2.subscribe(store);

store.setState({
  a: 100,
  b: 200,
});

store.notify();

class Publish {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  updateState(newState) {
    this.#state = {
      ...this.#state,
      ...newState,
    };
    this.notify();
  }

  register(subscriber) {
    this.#observers.add(subscriber);
  }

  notify() {
    this.#observers.forEach((fn) => fn());
  }
}

class Subscriber {
  #fn;
  constructor(stateUpdated) {
    this.#fn = stateUpdated;
  }

  subscribe(publisher) {
    publisher.register(this.#fn);
  }
}
