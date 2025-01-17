import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axiosInstance.get('/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
