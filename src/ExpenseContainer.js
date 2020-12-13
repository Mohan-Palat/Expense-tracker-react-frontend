import React, { Component } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


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

        showEditModal: false,
        showAddModal: false
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
    
      openAndAdd = () => {
          console.log("in open and add")

      
        this.setState({
          showAddModal: true,
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

      closeAndAdd = async (e, expense) => {
        e.preventDefault();
        console.log(expense);
    
        try {
            const addExpenseResponse = await axios.post(
            process.env.REACT_APP_FLASK_API_URL + '/api/v1/expenses/',
            expense,
            {headers: {
                 'Content-Type': 'application/json'
                  } 
            }
          );
    
          console.log(addExpenseResponse.data.data, ' this is response');
          this.setState({
            expenses: [...this.state.expenses, addExpenseResponse.data.data],
          });
          this.setState({
            showAddModal: false
          });
        } catch (err) {
          console.log('error', err);
        }
      };
      cancelAddAndClose = () => {
        
          this.setState({
            showAddModal: false
          });
        
      };

    render(){
      return (
         <> 
        <ExpenseList expenses={this.state.expenses}
                     deleteExpense={this.deleteExpense}
                     openAndEdit={this.openAndEdit}
                    //  open={this.state.showAddModal}
                     openAndAdd={this.openAndAdd}
                    //  handleAdd={this.handleAdd}
                      />
        <EditExpenseModal
                    open={this.state.showEditModal}
                    handleEditChange={this.handleEditChange}
                    expenseToEdit={this.state.expenseToEdit}
                    closeAndEdit={this.closeAndEdit}
                  />
        <AddExpenseModal
                    open={this.state.showAddModal}
                    handleAdd={this.handleAdd}
                    closeAndAdd={this.closeAndAdd}
                    // cancelAddAndClose={this.cancelAddAndClose}
                  />
        </>
        )
    }
  }
  

export default ExpenseContainer