import { getDeletedBill } from './selectors';
import { billList } from './bill-list';
import {
  CREATE_BILL_ERROR,
  CREATE_BILL_SUCCESS,
  DELETE_BILL_ERROR,
  DELETE_BILL_SUCCESS,
  FILTER_BILLS,
  LOAD_BILLS_SUCCESS,
  SEARCH_BILLS_SUCCESS,
  SEARCH_BILLS_ERROR,
  UNDELETE_BILL_ERROR,
  UNLOAD_BILLS_SUCCESS,
  UPDATE_BILL_ERROR,
  UPDATE_BILL_SUCCESS
} from './action-types';


export function createBill(serial) {
  return (dispatch, getState) => {
    const { auth } = getState();
    billList.push({amount: 20, serial: serial, creator: auth.id})
      .catch(error => dispatch(createBillError(error)));
  };
}

export function searchBills(serial) {
  return (dispatch, getState) => {
    const { auth } = getState();
    billList.push({amount: 20, serial: serial, creator: auth.id})
      .catch(error => dispatch(searchBillsError(error)));
  };
}

export function searchBillsError(error) {
  return {
    type: SEARCH_BILLS_ERROR,
    payload: error
  };
}

export function searchBillsSuccess(bill) {
  return {
    type: SEARCH_BILLS_SUCCESS,
    payload: bill
  };
}

export function createBillError(error) {
  return {
    type: CREATE_BILL_ERROR,
    payload: error
  };
}

export function createBillSuccess(bill) {
  return {
    type: CREATE_BILL_SUCCESS,
    payload: bill
  };
}

export function deleteBill(bill) {
  console.log(bill);
  alert('delete bill');
  return dispatch => {
    billList.remove(bill)
      .catch(error => dispatch(deleteBillError(error)));
  };
}

export function deleteBillError(error) {
  return {
    type: DELETE_BILL_ERROR,
    payload: error
  };
}

export function deleteBillSuccess(bill) {
  return {
    type: DELETE_BILL_SUCCESS,
    payload: bill
  };
}

export function undeleteBill() {
  return (dispatch, getState) => {
    const bill = getDeletedBill(getState());
    if (bill) {
      billList.set(bill.serial, {amount: bill.amount, creator: bill.creator})
        .catch(error => dispatch(undeleteBillError(error)));
    }
  };
}

export function undeleteBillError(error) {
  return {
    type: UNDELETE_BILL_ERROR,
    payload: error
  };
}

export function updateBillError(error) {
  return {
    type: UPDATE_BILL_ERROR,
    payload: error
  };
}

export function updateBill(bill, changes) {
  return dispatch => {
    billList.update(bill.serial, changes)
      .catch(error => dispatch(updateBillError(error)));
  };
}

export function updateBillSuccess(bill) {
  return {
    type: UPDATE_BILL_SUCCESS,
    payload: bill
  };
}

export function loadBillsSuccess(bills) {
  return {
    type: LOAD_BILLS_SUCCESS,
    payload: bills
  };
}

export function filterBills(filterType) {
  return {
    type: FILTER_BILLS,
    payload: {filterType}
  };
}

export function loadBills() {
  return dispatch => {
    billList.path = 'bills';
    billList.subscribe(dispatch);
  };
}

export function unloadBills() {
  billList.unsubscribe();
  return {
    type: UNLOAD_BILLS_SUCCESS
  };
}
