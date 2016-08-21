import { Record } from 'immutable';
import { DELETE_BILL_SUCCESS } from 'src/core/bills';
import { DISMISS_NOTIFICATION } from './action-types';


export const NotificationState = new Record({
  actionLabel: '',
  display: false,
  message: ''
});


export function notificationReducer(state = new NotificationState(), action) {
  switch (action.type) {
    case DELETE_BILL_SUCCESS:
      return state.merge({
        actionLabel: 'Undo',
        display: true,
        message: 'Bill deleted'
      });

    case DISMISS_NOTIFICATION:
      return new NotificationState();

    default:
      return new NotificationState();
  }
}
