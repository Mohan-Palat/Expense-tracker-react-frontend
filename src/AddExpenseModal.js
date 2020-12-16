import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class AddExpenseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exp_date: '',
            exp_descr: '',
            exp_amt: '',
            exp_category: '',
            options: [
              {value:'Car', text:'Car'},
              {value:'Phone', text:'Phone'},
              {value:'Dining', text:'Dining'},
            ],
            selected: ''
            }
    }
   

    handleChange = (e) => {
        console.log('in handle change Add Exp')
        console.log(e) 
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
        console.log(this.state)
      }
      
      selectOption = (event, data) => {
        this.setState({
          exp_category: data.value,
        });
      };
      
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
          <Label>Category:</Label>
          <Form.Dropdown
              placeholder="Select Category"
              fluid
              selection
              options={this.state.options}
              name="exp_category"
              onChange={this.selectOption}
            />
          {/* <Form.Input
            placeholder="Select Category"
            // fluid selection
            // options={this.state.options}
            type="text"
            name="exp_category"
            value={this.state.exp_category}
            // value={this.state.options}
            onChange={this.handleChange}
          /> */}
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