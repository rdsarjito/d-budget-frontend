import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCategory } from '../../actions';
import FormCategory from '../../components/FormCategory';
import ListData from '../../components/ListData';

const API = process.env.REACT_APP_API_URL;

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch]);

  return (
    <main>
      <FormCategory type="category" />
      <ListData type="category" API={API} />
    </main>
  );
};

export default Category;