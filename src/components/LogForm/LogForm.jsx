import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LogForm({ grantId }) {
  const userId = useSelector((store) => store.user.id);
  

  const [details, setDetails] = useState('');
  const [logType, setLogType] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'NEW_LOG',
      payload: { details: details, log_type: logType, expenditure_amount: Number(amount), grant_id: grantId, user_id: userId },
    });
    setDetails('');
    setLogType('');
    setAmount('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Log Type' value={logType} onChange={(event) => setLogType(event.target.value)} />
        <input placeholder='Log Details' value={details} onChange={(event) => setDetails(event.target.value)} />
        <input placeholder='Expense Amount' value={amount} onChange={(event) => setAmount(event.target.value)} />
        <button>Add Log</button>
      </form>
    </div>
  );
}
