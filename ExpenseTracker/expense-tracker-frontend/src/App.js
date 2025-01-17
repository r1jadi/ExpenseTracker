import React from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

const App = () => {
  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default App;
