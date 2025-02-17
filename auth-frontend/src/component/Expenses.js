import React from 'react'
import Delete from '../asset/delete.svg'

function Expenses({transactions,handleDelete}) {
    const handleClick=(id)=>{
        console.log(id)
    }
  return (
    <ul className="expense-list">
    {transactions.map((transaction) => (
      <li 
        key={transaction._id} 
        className={transaction.amount >= 0 ? 'positive' : 'negative'}
      >
        <div className='expenses'>
        <span className="transaction-text">{transaction.text}</span>
        <span className="transaction-amount">{transaction.amount}</span>
        </div>
        <span className="transaction-delete"><img className='delete-img' src={Delete} onClick={()=>handleDelete(transaction._id)}/></span>
      </li>
    ))}
  </ul>
  )
}

export default Expenses