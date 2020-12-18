import React from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

function ExpenseList(props){

  const expenses = props.expenses.map((expense) => {
    return (

        <Table.Row key={expense.id}>
        <Table.Cell collapsing>
        </Table.Cell>
        <Table.Cell>{expense.exp_descr}</Table.Cell>
        <Table.Cell>{expense.exp_date}</Table.Cell>
        <Table.Cell>${expense.exp_amt}</Table.Cell>
        <Table.Cell>{expense.exp_category}</Table.Cell>
        <Table.Cell>
          <div class="ui buttons">
            <Button class="ui button" size='mini' onClick={() => props.openAndEdit(expense)}>Edit</Button>
            <div class="or"></div>
            <Button class="ui button" size='mini' color='orange' onClick={() => props.deleteExpense(expense.id)}>Delete</Button>
          </div>  
        </Table.Cell>
        </Table.Row>
      
        )
  })

  return (
      <>  
      <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Update Entry</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { expenses }
        </Table.Body>
      </Table>
   

     </>
    )
}

export default ExpenseList