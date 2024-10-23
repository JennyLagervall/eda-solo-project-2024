import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogForm from '../LogForm/LogForm';
import moment from 'moment-timezone';
import GrantFunds from '../GrantFunds/GrantFunds';

export default function Logs({ grantId }) {
  const logs = useSelector((store) => store.log);
  console.log('log store', logs);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LOG' });
  }, []);

  return (
    <>
      <h3> Grant Logs</h3>
      <div>
        <h4> Add Log </h4>
        <LogForm grantId={grantId} />
      </div>
      <div>
        <ul>
          {logs
            .filter((l) => Number(l.grant_id) === Number(grantId))
            .map((log) => {
              return (
                <li key={log.id}>
                  Submitted on: {moment(log.submit_date).calendar()} <br />
                  Submitted by: {log.first_name} {log.last_name}
                  <br />
                  Log type: {log.log_type} <br />
                  {log.expenditure_amount > 0 && (
                    <>
                      Expenditure amount: $
                      {log.expenditure_amount ? Number(log.expenditure_amount).toLocaleString('en-US') : 'N/A'} <br />
                    </>
                  )}
                  Details: {log.details} <br />
                  <button
                    onClick={() => {
                      console.log('deleting log by id:', log.id);
                      dispatch({ type: 'DELETE_LOG', payload: log.id });
                    }}
                  >
                    Delete Log
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <GrantFunds grantId={id} />
    </>
  );
}
