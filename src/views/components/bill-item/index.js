import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Bill } from 'src/core/bills';


class BillItem extends Component {
  static propTypes = {
    deleteBill: PropTypes.func.isRequired,
    bill: PropTypes.instanceOf(Bill).isRequired,
    updateBill: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {editing: false};

    this.delete = ::this.delete;
    this.editSerial = ::this.editSerial;
    this.saveSerial = ::this.saveSerial;
    this.stopEditing = ::this.stopEditing;
    this.onKeyUp = ::this.onKeyUp;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.bill !== this.props.bill ||
           nextState.editing !== this.state.editing;
  }

  delete() {
    this.props.deleteBill(this.props.bill);
  }

  editSerial() {
    this.setState({editing: true});
  }

  saveSerial(event) {
    if (this.state.editing) {
      const { bill } = this.props;
      const serial = event.target.value.trim();

      if (serial.length && serial !== bill.serial) {
        this.props.updateBill(bill, {serial});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.saveTitle(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  renderSerial(bill) {
    return (
      <div
        className="task-item__title"
        ref={c => this.serialText = c}
        tabIndex="0">{bill.serial}
      </div>
    );
  }

  renderSerialInput(bill) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="task-item__input"
        defaultValue={bill.serial}
        maxLength="64"
        onBlur={this.saveSerial}
        onKeyUp={this.onKeyUp}
        ref={c => this.serialInput = c}
        type="text"
      />
    );
  }

  render() {
    const { editing } = this.state;
    const { bill } = this.props;

    return (
      <div className={classNames('task-item', {'task-item--editing': editing})} tabIndex="0">

        <div className="cell">
          {editing ? this.renderSerialInput(bill) : this.renderSerial(bill)}
        </div>

        <div className="cell">
          <button
            aria-hidden={!editing}
            aria-label="Cancel editing"
            className={classNames('btn task-item__button', {'hide': !editing})}
            onClick={this.stopEditing}
            ref={c => this.cancelEditButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Edit bill"
            className={classNames('btn task-item__button', {'hide': editing})}
            onClick={this.editSerial}
            ref={c => this.editButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Delete bill"
            className={classNames('btn task-item__button', {'hide': editing})}
            onClick={this.delete}
            ref={c => this.deleteButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default BillItem;
