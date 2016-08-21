import React, { PropTypes } from 'react';
import { List } from 'immutable';
import BillItem from '../bill-item';


function BillList({deleteBill, bills, updateBill}) {
  let billItems = bills.map((bill, index) => {
    return (
      <BillItem
        deleteBill={deleteBill}
        key={index}
        bill={bill}
        updateBill={updateBill}
      />
    );
  });

  return (
    <div className="task-list">
      {billItems}
    </div>
  );
}

BillList.propTypes = {
  deleteBill: PropTypes.func.isRequired,
  bills: PropTypes.instanceOf(List).isRequired,
  updateBill: PropTypes.func.isRequired
};

export default BillList;
