import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getBillFilter, getVisibleBills, billsActions } from 'src/core/bills';
import Notification from '../../components/notification';
import BillFilters from '../../components/bill-filters';
import BillForm from '../../components/bill-form';
import BillList from '../../components/bill-list';


export class Bills extends Component {
  static propTypes = {
    createBill: PropTypes.func.isRequired,
    deleteBill: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterBills: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadBills: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    bills: PropTypes.instanceOf(List).isRequired,
    undeleteBill: PropTypes.func.isRequired,
    unloadBills: PropTypes.func.isRequired,
    updateBill: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadBills();
    this.props.filterBills(this.props.location.query.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.filter !== this.props.location.query.filter) {
      this.props.filterBills(nextProps.location.query.filter);
    }
  }

  componentWillUnmount() {
    this.props.unloadBills();
  }

  renderNotification() {
    const { notification } = this.props;
    return (
      <Notification
        action={this.props.undeleteBill}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <BillForm createBill={this.props.createBill} />
        </div>

        <div className="g-col">
          <BillFilters filter={this.props.filterType} />
          <BillList
            deleteBill={this.props.deleteBill}
            bills={this.props.bills}
            updateBill={this.props.updateBill}
          />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getBillFilter,
  getVisibleBills,
  (notification, filterType, bills) => ({
    notification,
    filterType,
    bills
  })
);

const mapDispatchToProps = Object.assign(
  {},
  billsActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bills);
