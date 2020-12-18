import React, { Component } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import SelectDatesModal from './SelectDatesModal';
import AppHeader from './AppHeader';
import AppCharts from './AppCharts';
// import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';
import { Modal, Form, Button, Label, Header, Table, Input, Dropdown, Content } from 'semantic-ui-react';



class ExpenseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      expensesBkup: [],
      categories:['Rent','Dining'],
      expenseToEdit: {
        exp_date: '',
        exp_descr: '',
        exp_amt: '',
        exp_category: '',
        id: '',
      },
      showEditModal: false,
      showAddModal: false,
      showDatesModal: false,
      datasets: [
        {
          data: [],
          backgroundColor: ['red', 'purple','green', 'yellow', 'blue', 'orange'],
        },
      ],
      labels: [],
    };
  }
  // expensesByDate = (expenses) => {
  //   this.setState({ expenses: expenses });
  // };
  componentDidMount() {
    console.log('in did mount')
    this.getExpenses();
    this.getCategories();
    console.log(this.state)
  }

  getExpenses = async () => {
    try {
      const parsedExpenses = await axios(
        process.env.REACT_APP_FLASK_API_URL + '/api/v1/expenses/'
      );
      console.log(parsedExpenses.data.data);
      await this.setState({expenses: parsedExpenses.data.data}); //added 
      await this.setState({expensesBkup: parsedExpenses.data.data}); //added 
      const exp = await this.parseExpenses(parsedExpenses.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  getCategories = async () => {
    console.log('in get categories')
    try {
      const allCategories = await axios(
        process.env.REACT_APP_FLASK_API_URL + '/api/v1/categories/'
      );
      
      // this.setState({categories: allCategories.data.data}); 
      console.log(allCategories.data.data);
      console.log(this.state.categories);

    } catch (err) {
      console.log(err);
    }
  };

  parseExpenses = (exp) => {
    let expenseObj = {};
    exp.forEach((obj) => {
      let key = obj['exp_category'];
      if (expenseObj[key]) {
        expenseObj[key] += obj['exp_amt'];
      } else {
        expenseObj[key] = obj['exp_amt'];
      }
    });
    const expenseKeys = Object.keys(expenseObj);
    const expenseValues = Object.values(expenseObj);
    let tempState = [...this.state.datasets];
    tempState[0].data = expenseValues;
    this.setState(() => ({
      reload: true,
      labels: expenseKeys,
      datasets: tempState,
      // expenses: exp, //removed
      // expensesBkup: exp, //removed
    }));

  };
  
  
  closeDatesModalGetExpenses = async (e, dates) => {
    e.preventDefault();

    await this.getExpenses()

    this.setState({showDatesModal: false})
    console.log('dates being received', dates)
    
    let startDate = dates.startDate.slice(0,4) +
                    dates.startDate.slice(5,7) +
                    dates.startDate.slice(8,10)

    let endDate =   dates.endDate.slice(0,4) +
                    dates.endDate.slice(5,7) +
                    dates.endDate.slice(8,10)


    console.log('endDate', endDate)
    console.log('startDate', startDate)


    //format dates
    let ExpensesByDate = this.state.expensesBkup
    let newExpArrayByDate = []

    ExpensesByDate.forEach((expense) => {
      let expDD   = expense['exp_date'].slice(5,7)
      let expMM = ''
      let expMonth  = expense['exp_date'].slice(8,11).toLowerCase()
      let expYYYY = expense['exp_date'].slice(12,16)

      if (expMonth == 'jan'){expMM = '01'}
      if (expMonth == 'feb'){expMM = '02'}
      if (expMonth == 'mar'){expMM = '03'}
      if (expMonth == 'apr'){expMM = '04'}
      if (expMonth == 'may'){expMM = '05'}
      if (expMonth == 'jun'){expMM = '06'}
      if (expMonth == 'jul'){expMM = '07'}
      if (expMonth == 'aug'){expMM = '08'}
      if (expMonth == 'sep'){expMM = '09'}
      if (expMonth == 'act'){expMM = '10'}
      if (expMonth == 'nov'){expMM = '11'}
      if (expMonth == 'dec'){expMM = '12'}

      let expDate = expYYYY + expMM + expDD
      console.log('expDate', expDate)
      if (expDate >= startDate && expDate <= endDate){
        newExpArrayByDate.push(expense)
      }

      console.log(newExpArrayByDate)


    });
    await this.setState({ expenses: newExpArrayByDate });
    this.parseExpenses(newExpArrayByDate)
    console.log('expenses from 135', this.state.expenses)
    console.log('expenses from 136', this.state.expensesBkup)
    console.log('expenses from 137', newExpArrayByDate)
    
  };

  deleteExpense = async (id) => {
    console.log(id);
    const deleteExpenseResponse = await axios.delete(
      `${process.env.REACT_APP_FLASK_API_URL}/api/v1/expenses/${id}`
    );
    console.log(deleteExpenseResponse);
    this.setState({
      expenses: this.state.expenses.filter((expense) => expense.id !== id),
    });
    console.log(deleteExpenseResponse, ' response from Flask server');
    this.parseExpenses(this.state.expenses)
  };

  openAndEdit = (expenseFromTheList) => {
    console.log('in open and edit');
    console.log(expenseFromTheList, ' expenseToEdit  ');
    this.setState({
      showEditModal: true,
      expenseToEdit: {
        ...expenseFromTheList,
      },
    });
  };

  openAndAdd = () => {
    console.log('in open and add');
    this.setState({
      showAddModal: true,
    });
  };
  openDates = () => {
    console.log('in open Dates');
    this.setState({
      showDatesModal: true,
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
  handleEditCancel = () => {
    this.setState({
      showEditModal: false,
    });
    // this.setState({
    //   expenseToEdit: {
    //     ...this.state.expenseToEdit,
    //     [e.currentTarget.name]: e.currentTarget.value,
    //   },
    // });
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
        console.log(expense)
        return expense;
      });
      this.setState({
        showEditModal: false,
        expenses: newExpenseArrayWithEdit,
      });
    } catch (err) {
      console.log(err);
    }
    this.parseExpenses(this.state.expenses)
  };
  closeAndAdd = async (e, expense) => {
    e.preventDefault();
    console.log(expense);
    try {
      const addExpenseResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/api/v1/expenses/',
        expense,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(addExpenseResponse.data.data, ' this is response');
      this.setState({
        expenses: [...this.state.expenses, addExpenseResponse.data.data],
      });
      console.log('expense array after add', this.state.expenses)
      this.setState({
        showAddModal: false,
      });
    } catch (err) {
      console.log('error', err);
    }
    this.getExpenses()
    this.parseExpenses(this.state.expenses);
  };

  render() {
    console.log(this.state);
    return (
      <>
        
        <AppHeader />
        <AppCharts
          expenses={this.state.expenses}
          datasets={this.state.datasets}
          labels={this.state.labels}
          openDates={this.openDates}
          openAndAdd={this.openAndAdd}
          categories={this.state.categories}
        />
        <ExpenseList
          expenses={this.state.expenses}
          deleteExpense={this.deleteExpense}
          openAndEdit={this.openAndEdit}
          //  open={this.state.showAddModal}
          openAndAdd={this.openAndAdd}
          //  handleAdd={this.handleAdd}
          categories={this.state.categories}
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
          categories={this.state.categories}
        />
        <SelectDatesModal
          open={this.state.showDatesModal}
          handleAdd={this.handleDates}
          closeDatesModalGetExpenses={this.closeDatesModalGetExpenses}
          openDates={this.openDates}

        />
      </>
    );
  }
}
export default ExpenseContainer;
