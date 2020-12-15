import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
// import SearchExpensesByDate from './SearchExpensesByDate';

class AppCharts extends Component {
    constructor(props){
      super(props);
        this.state = {
            reload: false,
            labels: [],
            datasets: [{
                data: [], 
                backgroundColor: ['red','green','yellow','blue','orange']
            }],
            data2: [],
            expenseReload: this.props.expenseReload,
        }
    }

    componentDidMount() {
        this.parseExpenses()
    }
    parseExpenses  = () => {
        console.log(this.props)
    let expenseObj = {};
    this.props.expenses.forEach(obj => {
        let key = obj["exp_category"]
        if (expenseObj[key]) {
          expenseObj[key] += obj["exp_amt"]
        } else {
          expenseObj[key] = obj["exp_amt"]
        }
      })

    const expenseKeys = Object.keys(expenseObj);

    const expenseValues = Object.values(expenseObj);

    let tempState = [...this.state.datasets]
    tempState[0].data = expenseValues

    this.setState(() => ({

        reload: true,
        labels: expenseKeys,
        datasets: tempState,
        data2: expenseValues,
        expenseReload: true,
    }))

 }
    render(){
        console.log(this.state)
        return (
           <div className='chart-div'> 
           <div>
               <h1>Spending Chart</h1>
            <Pie
                data={{
                    labels: this.state.labels,
                    datasets: this.state.datasets
                }}
                // height='50%'
                    />
          </div>
          <div>
              {/* <SearchExpensesByDate/> */}
          </div>
          </div>
          )
      }    


}


export default AppCharts