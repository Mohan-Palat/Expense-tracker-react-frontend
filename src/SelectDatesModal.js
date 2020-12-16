import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class SelectDatesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',

            }
    }
   

    handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
        console.log('startDate', this.state.startDate)
        console.log('endDate', this.state.endDate)
      }

    render(){
      return (
    <Modal open={this.props.open}>
      <Header>Select Dates</Header>
      <Modal.Content>
        <Form onSubmit={(e) => this.props.closeDatesModalGetExpenses(e, this.state)}>
        <Label>Start Date:</Label>
          <Form.Input
            type="date"
            name="startDate"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
          <Label>End Date:</Label>
          <Form.Input
            type="date"
            name="endDate"
            value={this.state.endDate}
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

export default SelectDatesModal;