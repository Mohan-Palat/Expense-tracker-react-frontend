import React, { Component } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import CreateExpenseForm from './CreateExpenseForm';
import EditExpenseModal from './EditExpenseModal';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';
// import { Grid } from 'semantic-ui-react';


class ExpenseContainer extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        expenses: [],
        expenseToEdit: {
            exp_date: '',
            exp_descr: '',
            exp_amt: '',
            exp_comment: '',
            id: '',
  
        },
        showEditModal: false
      }
    }

    componentDidMount(){
      this.getExpenses();
    }
    getExpenses = async () => {
      try {
        const parsedExpenses = await axios(
          process.env.REACT_APP_FLASK_API_URL + '/api/v1/expenses/'
        );
        console.log(parsedExpenses.data.data);
        await this.setState({
          expenses: parsedExpenses.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    deleteExpense = async (id) => {
        console.log(id);
        const deleteExpenseResponse = await axios.delete(
          `${process.env.REACT_APP_FLASK_API_URL}/api/v1/expenses/${id}`
        );
        console.log(deleteExpenseResponse);
        // Now that the db has deleted our item, we need to remove it from state
        // Then make the delete request, then remove the song from the state array using filter
        this.setState({ expenses: this.state.expenses.filter((expense) => expense.id !== id) });
    
        console.log(deleteExpenseResponse, ' response from Flask server');
      };

      openAndEdit = (expenseFromTheList) => {
          console.log("in open and edit")
        console.log(expenseFromTheList, ' expenseToEdit  ');
      
        this.setState({
          showEditModal: true,
          expenseToEdit: {
            ...expenseFromTheList,
          },
        });
      };
    
      handleEditChange = (e) => {
        this.setState({
          expenseToEdit: {
            ...this.state.expenseToEdit,
            [e.currentTarget.name]: e.currentTarget.value,
          },
        });
      };
    
      closeAndEdit = async (e) => {
        e.preventDefault();
        try {
            const editResponse = await axios.put(
            process.env.REACT_APP_FLASK_API_URL +
              '/api/v1/expenses/' +
              this.state.expenseToEdit.id,
            this.state.expenseToEdit
          );
      
          console.log(editResponse, ' parsed edit');
      
          const newExpenseArrayWithEdit = this.state.expenses.map((expense) => {
            if (expense.id === editResponse.data.data.id) {
              expense = editResponse.data.data;
            }
      
            return expense;
          });
      
          this.setState({
            showEditModal: false,
            expenses: newExpenseArrayWithEdit,
          });
        } catch (err) {
          console.log(err);
        }
      };

    render(){
      return (
         <> 
        <ExpenseList expenses={this.state.expenses}
                     deleteExpense={this.deleteExpense}
                     openAndEdit={this.openAndEdit}
                      />
        <EditExpenseModal
                    open={this.state.showEditModal}
                    handleEditChange={this.handleEditChange}
                    expenseToEdit={this.state.expenseToEdit}
                    closeAndEdit={this.closeAndEdit}
                  />
        </>
        )
    }
  }
  

export default ExpenseContainer