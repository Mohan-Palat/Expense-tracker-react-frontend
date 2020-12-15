import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class SearchExpensesByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
          }
    }
   

    handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
      }
      
    render(){
      return (
        <Form onSubmit={(e) => this.props.updateExpensesList(e, this.state)}> 
          <Label>Start Date:</Label>
          <Form.Input type='date' name='name' value={this.state.startDate} onChange={this.handleChange}/>
          <Label>End Date:</Label>
          <Form.Input type='date' name='owner' value={this.state.endDate} onChange={this.handleChange}/>
          <Button type='Submit'>Submit</Button>
        </Form>

  );
};
}

export default SearchExpensesByDate;