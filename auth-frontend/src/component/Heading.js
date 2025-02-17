import React from 'react';

const Heading = ({ loggedInUser, handleLogout, totalPositive, totalNegative }) => {
  return (
    <div className="heading">
      <div className="user-info">
        <span className="user-name">Hello, {loggedInUser}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <h1>Expense Tracker</h1>
      <div className="totals">
        <div className="income">Income: ₹{totalPositive}</div>
        <div className="expense">Expense: ₹{totalNegative}</div>
      </div>
    </div>
  );
};

export default Heading;
