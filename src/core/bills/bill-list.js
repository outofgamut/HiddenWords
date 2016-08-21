import { FirebaseList } from 'src/core/firebase';
import * as billActions from './actions';
import { Bill } from './bill';


export const billList = new FirebaseList({
  onAdd: billActions.createBillSuccess,
  onChange: billActions.updateBillSuccess,
  onLoad: billActions.loadBillsSuccess,
  onRemove: billActions.deleteBillSuccess
}, Bill);
