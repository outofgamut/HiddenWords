import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_BILL_SUCCESS,
  DELETE_BILL_SUCCESS,
  FILTER_BILLS,
  LOAD_BILLS_SUCCESS,
  UPDATE_BILL_SUCCESS
} from './action-types';


export const BillsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function billsReducer(state = new BillsState(), {payload, type}) {
  switch (type) {
    case CREATE_BILL_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case DELETE_BILL_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(bill => bill.key !== payload.key)
      });

    case FILTER_BILLS:
      return state.set('filter', payload.filterType || '');

    case LOAD_BILLS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_BILL_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(bill => {
          return bill.key === payload.key ? payload : bill;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new BillsState();

    default:
      return state;
  }
}
