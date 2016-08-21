import React, { Component, PropTypes } from 'react';


class BillForm extends Component {
  static propTypes = {
    createBill: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {serial: ''};

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
  }

  clearInput() {
    this.setState({serial: ''});
  }

  onChange(event) {
    this.setState({serial: event.target.value});
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const serial = this.state.serial.trim();
    const serialRegEx = new RegExp("^[A-Za-z]{1,2}[0123456789]{8}[A-Za-z]{1}$");
    var OK = serialRegEx.exec(serial); 

    if (OK) {
      this.props.createBill(serial);
      this.clearInput();
    } else {
      alert('Not a valid serial number.');
    }
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="Enter a serial number for a dollar bill"
          ref={c => this.serialInput = c}
          type="text"
          value={this.state.serial}
        />
      </form>
    );
  }
}

export default BillForm;
