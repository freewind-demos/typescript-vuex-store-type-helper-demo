import Vuex, {ActionContext, Store} from 'vuex'
import Vue from 'vue'
import {createActions, createGetters, createMutations} from './vuex-type-helpers';

Vue.use(Vuex);

export type State = {
  todos: string[]
}


const state = {
  todos: []
};

export const mutations = {
  init(state: State) {
    state.todos = ['task1', 'task2']
  },
  addTodo(state: State, task: string) {
    state.todos.push(task)
  }
};

const getters = {
  count(state: State) {
    return state.todos.length;
  }
};

const actions = {
  addTodos: async (context: ActionContext<State, any>, todos: string[]) => {
    setTimeout(() => {
      todos.forEach(todo => {
        mutations.addTodo(state, todo)
      })
    }, 1000);
  }
};

const store = new Store<State>({
  strict: true,
  state,
  getters,
  mutations,
  actions
});

export default store;

export function typedStore(store: Store<State>) {
  return {
    commit: createMutations<State, typeof mutations>(store, mutations),
    getters: createGetters<State, typeof getters>(store, getters),
    dispatch: createActions<State, typeof actions>(store, actions),
  };
}


