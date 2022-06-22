import { useReducer } from 'react';
import request from '../utils/request';

const initData = {
  list: [],
  loaded: false
};

export const ACT = {
  LOAD: Symbol('load list'),
  ADD: Symbol('add new item'),
  DELETE: Symbol('remove an item'),
  COPY: Symbol('copy to clipboard')
}

const reducer = (state, action) => {
  const oldList =[...state.list];
  switch (action.oper) {
    case ACT.LOAD:
      return {
        list: action.list,
        loaded: true
      };
    case ACT.ADD:
      oldList.push(action.item);
      return {
        list: oldList,
        loaded: true
      };
    case ACT.DELETE:
      oldList.splice(oldList.findIndex(x => x.shorten === action.shorten), 1);
      return {
        list: oldList,
        loaded: true
      };
  }
}

const useData = () => {
  const [urlList, dispatch] = useReducer(reducer, initData);
  const loadList = async () => {
    let list = await request(`${baseURL}/list`);
    dispatch({
      oper: ACT.LOAD,
      list
    });
  }
  const newShorten = async (origin) => {
    let data = await request(`${baseURL}/add?origin=${origin}`);
    dispatch({
      oper: ACT.ADD,
      item: data
    });
  }
  const removeShorten = async (shorten) => {
    await request(`${baseURL}/delete`, {method:'POST', body:JSON.stringify(shorten)});
    dispatch({
      oper: ACT.DELETE,
      shorten
    })
  }
  return {
    urlList,
    loadList,
    newShorten,
    removeShorten
  }
}

export default useData;
