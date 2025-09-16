import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getTransaction } from '../../actions';
import FormTransaction from '../../components/FormTransaction';
import ListData from '../../components/ListData';
import TotalCashFlow from '../../components/TotalCashFlow';

const API = process.env.REACT_APP_API_URL;

const Income = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransaction('income'))
  }, [dispatch]);

  return (
    <main>
      <FormTransaction type="income" API={API} />
      <TotalCashFlow type="income" />
      <ListData type="income" API={API} />
    </main>
  )
};

export default Income;