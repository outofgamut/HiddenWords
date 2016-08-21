import { createSelector } from 'reselect';


export function getBills(state) {
  return state.bills;
}

export function getBillList(state) {
  return getBills(state).list;
}

export function getBillFilter(state) {
  return getBills(state).filter;
}

export function getDeletedBill(state) {
  return getBills(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleBills = createSelector(
  getBillList,
  getBillFilter,
  (bills, filter) => {
    switch (filter) {
      case 'active':
        return bills.filter(bill => !bill.completed);

      default:
        return bills;
    }
  }
);
