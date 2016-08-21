import { List } from 'immutable';
import { BillsState } from './reducer';
import { getVisibleBills } from './selectors';
import { Bill } from './bill';


describe('bills', () => {
  describe('selectors', () => {
    let bills;

    beforeEach(() => {
      bills = new BillsState({
        list: new List([
          new Bill({completed: false, title: 'bill-1'}),
          new Bill({completed: true, title: 'bill-2'})
        ])
      });
    });


    describe('getVisibleBills()', () => {
      it('should return list of all bills', () => {
        let billList = getVisibleBills({bills});
        expect(billList.size).toBe(2);
      });

      it('should return list of active (incomplete) bills', () => {
        bills = bills.set('filter', 'active');
        let billList = getVisibleBills({bills});

        expect(billList.size).toBe(1);
        expect(billList.get(0).title).toBe('bill-1');
      });

      it('should return list of completed bills', () => {
        bills = bills.set('filter', 'completed');
        let billList = getVisibleBills({bills});

        expect(billList.size).toBe(1);
        expect(billList.get(0).title).toBe('bill-2');
      });
    });
  });
});
