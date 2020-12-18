import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
import AddExpenseModal from './AddExpenseModal'

class AppCharts extends Component {
    constructor(props) {
        super(props);
  this.state = {
    labels: this.props.labels,
    datasets: this.props.datasets,
  }};
  render() {
    let totalExpenses = 0;
    this.state.datasets[0].data.forEach((expAmt) => {
      totalExpenses += expAmt
    })
    console.log(totalExpenses)
    return (
      <>  
      <div className="chart-div">
        <div className="chart-div-left">
          <h1>Spending Chart</h1>
          <Pie
            data={{
              labels: this.props.labels,
              datasets: this.props.datasets,
            }}
          />
        </div>
        <div>
            <h3 className="totalExpHdr">Total Expenses by dates</h3>
            <h4>${totalExpenses}</h4>
        </div>
        <div className="chart-div-right">    
        <div className="transButton" >
        <Button className="transBtn1" size='small' color="orange" onClick={() => this.props.openDates()}>Select Transactions by Dates</Button>
        </div>
        <div className="addTransButton">
        <Button className="addTransBtn1" size='small' color="orange" onClick={() => this.props.openAndAdd()}>Add a New Transaction</Button>
        </div>
        </div>

      </div>
      </>
    );
  }

}
export default AppCharts;
