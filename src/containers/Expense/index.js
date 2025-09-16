import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { getTransaction } from '../../actions';
import FormTransaction from '../../components/FormTransaction';
import ListData from '../../components/ListData';
import TotalCashFlow from '../../components/TotalCashFlow';

const API = process.env.REACT_APP_API_URL;

const Expense = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransaction('expense'))
  }, [dispatch]);

  return (
    <main>
      <FormTransaction type="expense" API={API} />
      <TotalCashFlow type="expense" />
      <ListData type="expense" API={API} />
    </main>
  );
};

export default Expense;