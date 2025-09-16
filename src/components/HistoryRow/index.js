import { Component } from 'react';
import { connect } from 'react-redux';

import { addMoneyDots, sortedDate, stringDate } from '../../helper';
import * as actions from '../../actions';

import '../../style/style.css';

const API = process.env.REACT_APP_API_URL;
class HistoryRow extends Component {
  constructor() {
    super();
    this.state = {
      income: [],
      expense: []
    };
  };

  componentDidMount = async() => {
    const token = localStorage.getItem('jwt_token');
    if(token === null) {
      return;
    };
    
    const GET = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt_token'))[0].accesToken
      }
    };

    const getIncome =  await fetch(`${API}/income`, GET);
    const getExpense = await fetch(`${API}/expense`, GET);
    
    const dataIncome = await getIncome.json();
    const dataExpense = await getExpense.json();
    this.setState({ income: dataIncome, expense: dataExpense });
  };

  render() {
    const mergeData = [...this.state.income, ...this.state.expense];
    const sortDate = sortedDate(mergeData);
    return sortDate.map((history) => {
      let color;
      if(history.typeBalance === 'income') {
        color = 'green'
      } else if(history.typeBalance === 'expense') {
        color = 'red'
      }
      const date = stringDate(history.date);
      return (
        <div key={history._id} className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8 transform even:bg-red-700">
          <div className="">
            {date}
          </div>
          <div className="history-content">
            <div className="history-description">
              {history.description}
            </div>
            <div className={`history-amount text-${color}-700`}>
              {addMoneyDots(history.amount)}
            </div>
          </div>
        </div>
      );
    });
  };
};
export default connect(({ transactions }) => ({ transactions }), actions)(HistoryRow);