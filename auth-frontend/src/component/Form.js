import React,{useState} from 'react'

function Form({addTransactions}) {
    const handleSubmit=(e)=>{
        e.preventDefault();

        addTransactions({text,amount:parseFloat(amount)})
        setText('');
        setAmount('');
    }
    const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Transaction description" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn">Add Transaction</button>
    </form>
  )
}

export default Form