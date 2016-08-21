import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_BILL_SUCCESS,
  DELETE_BILL_SUCCESS,
  FILTER_BILLS,
  LOAD_BILLS_SUCCESS,
  UPDATE_BILL_SUCCESS
} from './action-types';

import { Bill } from './bill';
import { billsReducer, BillsState } from './reducer';


describe('bills', () => {
  describe('billsReducer', () => {
    let bill1;
    let bill2;

    beforeEach(() => {
      bill1 = new Bill({completed: false, key: '0', title: 'bill 1'});
      bill2 = new Bill({completed: false, key: '1', title: 'bill 2'});
    });


    describe('CREATE_BILL_SUCCESS', () => {
      it('should prepend new bill to list', () => {
        let state = new BillsState({list: new List([bill1])});

        let nextState = billsReducer(state, {
          type: CREATE_BILL_SUCCESS,
          payload: bill2
        });

        expect(nextState.list.get(0)).toBe(bill2);
        expect(nextState.list.get(1)).toBe(bill1);
      });
    });


    describe('DELETE_BILL_SUCCESS', () => {
      it('should remove bill from list', () => {
        let state = new BillsState({list: new List([bill1, bill2])});

        let nextState = billsReducer(state, {
          type: DELETE_BILL_SUCCESS,
          payload: bill2
        });

        expect(nextState.deleted).toBe(bill2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(bill1);
        expect(nextState.previous).toBe(state.list);
      });
    });


    describe('FILTER_BILLS', () => {
      it('should set filter with provided value', () => {
        let state = new BillsState();

        let nextState = billsReducer(state, {
          type: FILTER_BILLS,
          payload: {
            filterType: 'completed'
          }
        });

        expect(nextState.filter).toBe('completed');
      });
    });


    describe('LOAD_BILLS_SUCCESS', () => {
      it('should set bill list', () => {
        let state = new BillsState();

        let nextState = billsReducer(state, {
          type: LOAD_BILLS_SUCCESS,
          payload: [bill1, bill2]
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order bills newest first', () => {
        let state = new BillsState();

        let nextState = billsReducer(state, {
          type: LOAD_BILLS_SUCCESS,
          payload: [bill1, bill2]
        });

        expect(nextState.list.get(0)).toBe(bill2);
        expect(nextState.list.get(1)).toBe(bill1);
      });
    });


    describe('UPDATE_BILL_SUCCESS', () => {
      it('should update bill', () => {
        let state = new BillsState({list: new List([bill1, bill2])});
        let changedBill = bill2.set('title', 'changed');

        let nextState = billsReducer(state, {
          type: UPDATE_BILL_SUCCESS,
          payload: changedBill
        });

        expect(nextState.list.get(0)).toBe(bill1);
        expect(nextState.list.get(1)).toBe(changedBill);
      });
    });


    describe('SIGN_OUT_SUCCESS', () => {
      it('should reset state', () => {
        let state = new BillsState({
          delete: bill1,
          list: new List([bill1, bill2]),
          previous: new List()
        });

        let nextState = billsReducer(state, {
          type: SIGN_OUT_SUCCESS
        });

        expect(nextState.deleted).toBe(null);
        expect(nextState.list.size).toBe(0);
        expect(nextState.previous).toBe(null);
      });
    });
  });
});
