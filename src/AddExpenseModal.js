import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class AddExpenseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exp_date: '',
            exp_descr: '',
            exp_amt: '',
            exp_comment: '',
          }
    }
   

    handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
      }
      
    render(){
      return (
    <Modal open={this.props.open}>
      <Header>Add Expense</Header>
      <Modal.Content>
        <Form onSubmit={(e) => this.props.closeAndAdd(e, this.state)}>
        <Label>Date:</Label>
          <Form.Input
            type="date"
            name="exp_date"
            value={this.state.exp_date}
            onChange={this.handleChange}
          />
          <Label>Description:</Label>
          <Form.Input
            type="text"
            name="exp_descr"
            value={this.state.exp_descr}
            onChange={this.handleChange}
          />
          <Label>Amount:</Label>
          <Form.Input
            type="number"
            name="exp_amt"
            value={this.state.exp_amt}
            onChange={this.handleChange}
          />
          <Label>Comment:</Label>
          <Form.Input
            type="text"
            name="exp_comment"
            value={this.state.exp_comment}
            onChange={this.handleChange}
          />
          <Modal.Actions>
            <Button color="green" type="submit">
              Submit
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
}

export default AddExpenseModal;