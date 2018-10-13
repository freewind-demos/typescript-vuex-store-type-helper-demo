import {Store} from 'vuex';

type SecondArg<T> = T extends (arg1: any) => any
    ? undefined
    : T extends (arg1: any, arg2: infer U, ...args: any[]) => any
        ? U
        : undefined

type ReturnType<T> = T extends (...args: any[]) => infer U ? U : undefined

// ----------- mutations ------------------

export type Mutations<T> = {
  [key in keyof T]: (payload: SecondArg<T[key]>) => ReturnType<T[key]>
}

export function createMutations<S, T>(store: Store<S>, mutations: T): Mutations<T> {
  const result: any = {};
  for (const key of Object.keys(mutations)) {
    result[key] = (payload: any) => {
      return store.commit(key, payload)
    }
  }
  return result;
}

// ------------- getters -----------------

type Getters<T> = {
  [key in keyof T]: ReturnType<T[key]>
}

export function createGetters<S, T>(store: Store<S>, getters: T): Getters<T> {
  const result: any = {};
  for (const key of Object.keys(getters)) {
    result[key] = store.getters[key]
  }
  return result;
}

// --------------- actions -----------------

type Actions<T> = {
  [key in keyof T]: (payload: SecondArg<T[key]>) => ReturnType<T[key]>
}

export function createActions<S, T>(store: Store<S>, mutations: T): Mutations<T> {
  const result: any = {};
  for (const key of Object.keys(mutations)) {
    result[key] = (payload: any) => {
      return store.dispatch(key, payload)
    }
  }
  return result;
}
