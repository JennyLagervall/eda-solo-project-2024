import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogForm from '../LogForm/LogForm';

export default function Logs({ grantId }) {
  const logs = useSelector((store) => store.log);
  console.log('log store', logs);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LOG', payload: id });
  }, []);

  return (
    <>
      <h3> Grant Logs</h3>
      <div>
        <LogForm grantId={grantId} />
      </div>
      <div>
        <ul>
          {logs
            .filter((l) => Number(l.grant_id) === Number(grantId))
            .map((log) => {
              return (
                
                  <li key={log.id}>
                    Submitted on: {log.submit_date} <br />
                    Log type: {log.log_type} <br />
                    Expenditure amount: ${log.expenditure_amount} <br />
                    Details: {log.details} <br />
                  </li>
                
              );
            })}
        </ul>
      </div>
    </>
  );
}
