import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import BillForm from './index';


describe('BillForm', () => {
  let billForm;


  beforeEach(() => {
    billForm = createTestComponent(BillForm, {
      createBill: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.serial with an empty string', () => {
      expect(billForm.state.serial).toEqual('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.serial with an empty string', () => {
        billForm.state.serial = 'foo';
        expect(billForm.state.serial).toEqual('foo');

        billForm.clearInput();
        expect(billForm.state.serial).toEqual('');
      });
    });


    describe('#onChange', () => {
      it('should set #state.serial with event.target.value', () => {
        const event = {target: {value: 'value'}};
        billForm.onChange(event);
        expect(billForm.state.serial).toEqual(event.target.value);
      });
    });


    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.serial with an empty string', () => {
          billForm.state.serial = 'foo';
          billForm.onKeyUp({keyCode: 27});
          expect(billForm.state.serial).toEqual('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        billForm.onSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call billActions#createBill with #state.serial', () => {
        const event = {preventDefault: sinon.spy()};

        billForm.state.serial = '123';
        billForm.onSubmit(event);

        expect(billForm.props.createBill.callCount).toEqual(1);
        expect(billForm.props.createBill.calledWith('123')).toEqual(true);
      });

      it('should set #state.serial with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        billForm.state.serial = '123';
        billForm.onSubmit(event);

        expect(billForm.state.serial).toEqual('');
      });

      it('should not save if serial evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        billForm.state.serial = '';
        billForm.onSubmit(event);

        expect(billForm.props.createBill.callCount).toBe(0);

        billForm.state.serial = '    ';
        billForm.onSubmit(event);

        expect(billForm.props.createBill.callCount).toBe(0);
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.serial with an empty string', () => {
        billForm.setState({serial: '123'});
        Simulate.keyUp(billForm.serialInput, {keyCode: 27});
        expect(billForm.state.serial).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        billForm.setState({serial: '123'});
        Simulate.keyUp(billForm.serialInput, {keyCode: 27});
        expect(billForm.serialInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.serial with the value from the text field', () => {
        billForm.serialInput.value = '123';
        expect(billForm.state.serial).toEqual('');
        Simulate.change(billForm.serialInput);
        expect(billForm.state.serial).toEqual('123');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(billForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        billForm.setState({serial: 'foo'});
        Simulate.submit(findDOMNode(billForm), event);
        expect(billForm.serialInput.value).toEqual('');
      });
    });
  });
});
