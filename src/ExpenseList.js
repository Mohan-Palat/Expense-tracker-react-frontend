import React from 'react';
// import { Table, Button} from 'semantic-ui-react';
// import { Table } from 'semantic-ui-react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
// import Table from '@bit/semantic-org.semantic-ui-react.table'
import EditExpenseModal from './EditExpenseModal';

function ExpenseList(props){

  const expenses = props.expenses.map((expense) => {
    return (

        <Table.Row key={expense.id}>
        <Table.Cell collapsing>
        </Table.Cell>
        <Table.Cell>{expense.exp_descr}</Table.Cell>
        <Table.Cell>{expense.exp_date}</Table.Cell>
        <Table.Cell>{expense.exp_amt}</Table.Cell>
        <Table.Cell>{expense.exp_comment}</Table.Cell>
        <Table.Cell>
            <Button size='small' onClick={() => props.openAndEdit(expense)}>Edit
            </Button>
        </Table.Cell>
        <Table.Cell><Button size='small' onClick={() => props.deleteExpense(expense.id)}>Delete</Button></Table.Cell>
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
          <Table.HeaderCell>Comment</Table.HeaderCell>
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { expenses }
        </Table.Body>
        {/* </Table> */}
      </Table>
     </>
    )
}

export default ExpenseList