import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogForm from '../LogForm/LogForm';
import moment from 'moment-timezone';
import GrantFunds from '../GrantFunds/GrantFunds';
import { Card, Button, Container } from 'react-bootstrap';

export default function Logs({ grantId }) {
  const logs = useSelector((store) => store.log);
  console.log('log store', logs);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LOG' });
  }, []);

  return (
    <Container>
      <GrantFunds grantId={id} />
      {/* <h3
        style={{
          paddingTop: '20px',
          paddingBottom: '10px',
          
          
          fontSize: '30px',
          
        }}
      >
        Submit Grant Activity
      </h3> */}
      <div>
        <LogForm grantId={grantId} />
      </div>
      <Container>
        {logs
          .filter((l) => Number(l.grant_id) === Number(grantId))
          .map((log) => (
            <Card key={log.id} style={{ marginBottom: '1.5rem', padding: '3rem' }}>
              <Card.Body>
                <Card.Title>Grant Activity Log</Card.Title>
                <div style={{ textAlign: 'right' }}>
                  <Card.Subtitle className='mb-2 text-muted'>
                    <strong>Submitted on: </strong> {moment(log.submit_date).calendar()}
                  </Card.Subtitle>
                  <Card.Subtitle className='mb-2 text-muted'>
                    <strong> Submitted by:</strong> {log.first_name} {log.last_name}
                  </Card.Subtitle>
                </div>
                <Card.Text>
                  <strong>Log type: </strong> {log.log_type}
                </Card.Text>
                {log.expenditure_amount > 0 && (
                  <Card.Text>
                    <strong> Expenditure amount: $ </strong>
                    {log.expenditure_amount ? Number(log.expenditure_amount).toLocaleString('en-US') : 'N/A'}
                  </Card.Text>
                )}
                <Card.Text>
                  <strong> Details: </strong>
                  {log.details}
                </Card.Text>
                <Button
                  className='deleteBtn'
                  onClick={() => {
                    console.log('deleting log by id:', log.id);
                    dispatch({ type: 'DELETE_LOG', payload: log.id });
                  }}
                >
                  Delete Log
                </Button>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </Container>
  );
}
