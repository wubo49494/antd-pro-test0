import { addFakeList, queryFakeList, removeFakeList, updateFakeList, getFakeData } from './service';

const Model = {
  namespace: 'listAndbasicList',
  state: {
    list: [],
    fakeData: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *getFakeData({ payload }, { call, put }) {
      const response = yield call(getFakeData, payload);
      console.log('wbo-response', response)
      yield put({
        type: 'save',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    save(state, payload) {
      return { ...state, ...payload };
    },


    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
