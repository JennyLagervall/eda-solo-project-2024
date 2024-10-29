import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

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
      payload: {
        details: details,
        log_type: logType,
        expenditure_amount: Number(amount),
        grant_id: grantId,
        user_id: userId,
      },
    });
    setDetails('');
    setLogType('');
    setAmount('');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title
          style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          Submit Grant Activity
        </Card.Title>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col sm={5} className='my-1'>
              <Form.Label style={{ fontSize: '19px' }} className='fw-semibold'>
                Type of Log:
              </Form.Label>
              <InputGroup size='lg' className='mb-3'>
                <Form.Control
                  as='select'
                  name='LogType'
                  value={logType}
                  onChange={(event) => setLogType(event.target.value)}
                >
                  <option value='' disabled>
                    - Select -
                  </option>
                  <option value='Informational'>Informational</option>
                  <option value='Expenditure'>Expenditure</option>
                </Form.Control>
              </InputGroup>
            </Col>
          </Row>

          <Row >
            {logType === 'Expenditure' && (
              <Col md={4}>
                <Form.Group controlId='grantLead'>
                  <Form.Label style={{ fontSize: '19px', marginBottom: '5px' }} className='fw-semibold'>
                    Expense Amount
                  </Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      className='small-input'
                      placeholder='$ Expense Amount'
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            )}
          </Row>

          <div>
            <Form.Group controlId='description'>
              <Form.Label style={{ fontSize: '19px' }} className='fw-semibold'>
                Add Details (like expense type or report updates){' '}
              </Form.Label>
              <InputGroup size='lg' className='mb-3'>
                <Form.Control
                  as='textarea'
                  style={{ width: '1650px', height: '150px' }}
                  rows={4}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  className='small-input'
                  placeholder='Enter log details here...'
                />
              </InputGroup>
            </Form.Group>
          </div>

          <Button
            className='action-button'
            style={{
              fontSize: '22px',
              color: 'black',
              backgroundColor: '#ffd700',
              border: '2px solid #637dbd',
              width: '150px',
              height: '70px',

              marginLeft: '550px',
              marginBottom: '20px',
            }}
            type='submit'
          >
            Add Log
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}
