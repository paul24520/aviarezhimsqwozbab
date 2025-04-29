import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';  
import Header from '../Header/Header';
import Main from '../Main/Main';
import './App.css';
import { getSearchId } from '../../reducers/filtersReducer';
import { getTickets } from '../../reducers/filtersReducer';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getSearchId());
      dispatch(getTickets());
    })();
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
