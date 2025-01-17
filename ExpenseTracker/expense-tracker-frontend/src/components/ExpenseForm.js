import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const ExpenseForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/expenses', { name, amount })
      .then(() => {
        onSave();
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Expense Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default ExpenseForm;
