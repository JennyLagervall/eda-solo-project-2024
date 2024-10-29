import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Container, Button } from 'react-bootstrap';
import '../FormStyling/Forms.css';

export default function GrantForm() {
  const userId = useSelector((store) => store.user.id);

  const [grantName, setGrantName] = useState('');
  const [funding, setFunding] = useState('');
  const [abbreviaton, setAbbreviaton] = useState('');
  const [grantLead, setGrantLead] = useState('');
  const [grantType, setGrantType] = useState('');
  const [description, setDescription] = useState('');
  const [awardSum, setAwardSum] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [q1Date, setQ1Date] = useState('');
  const [q2Date, setQ2Date] = useState('');
  const [q3Date, setQ3Date] = useState('');
  const [q4Date, setQ4Date] = useState('');
  const [auditDate, setAuditDate] = useState('');
  const [notes, setnotes] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'ADD_GRANT',
      payload: {
        grant_name: grantName,
        funding_src: funding,
        grant_abbreviation: abbreviaton,
        grant_lead: grantLead,
        grant_type: grantType,
        description: description,
        award_sum: awardSum,
        start_date: startDate,
        end_date: endDate,
        q1_report_date: q1Date,
        q2_report_date: q2Date,
        q3_report_date: q3Date,
        q4_report_date: q4Date,
        audit_date: auditDate,
        notes: notes,
      },
    });
    setGrantName('');
    setFunding('');
    setAbbreviaton('');
    setGrantLead('');
    setGrantType('');
    setDescription('');
    setAwardSum('');
    setStartDate('');
    setEndDate('');
    setQ1Date('');
    setQ2Date('');
    setQ3Date('');
    setQ4Date('');
    setAuditDate('');
    setnotes('');
  };

  return (
    <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Card style={{ width: '100%', backgroundColor: '#fbf7ed' }}>
        <Card.Header
          style={{
            backgroundColor: '#304c54',
            fontSize: '35px',
            height: '90px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            paddingTop: '20px',
            paddingLeft: '40px',
            paddingBottom: '20px',
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          className='text-white'
        >
          Add New Grant
        </Card.Header>

        <Card.Title
          style={{
            fontSize: '35px',
            height: '80px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            paddingTop: '20px',
            paddingLeft: '40px',
            paddingBottom: '20px',
          }}
        >
          New Grant Profile
        </Card.Title>

        <Card.Subtitle style={{ fontSize: '24px', paddingTop: '20px', paddingLeft: '40px' }} className='mb-2'>
          Please use the form below to add a new grant
        </Card.Subtitle>

        <Card.Body style={{ fontSize: '18px', paddingLeft: '40px', paddingRight: '40px' }}>
          <form onSubmit={handleSubmit}>
            <Row className='align-items-center'>
              <Col sm={5} className='my-1'>
                <Form.Label className='fw-semibold'>Grant Name </Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Control
                    placeholder='Grant Name'
                    value={grantName}
                    onChange={(event) => setGrantName(event.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={2} className='my-1'>
                <Form.Label className='fw-semibold'> Abbreviation</Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Control
                    className='mini-input'
                    placeholder='Abbreviation'
                    value={abbreviaton}
                    onChange={(event) => setAbbreviaton(event.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={3} className='my-1'>
                <Form.Label className='fw-semibold'>Grant Type</Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Select
                    className='small-input'
                    value={grantType}
                    onChange={(event) => setGrantType(event.target.value)}
                  >
                    <option value='' disabled>
                      - Select -
                    </option>
                    <option value='Federal'>Federal</option>
                    <option value='State'>State</option>
                    <option value='Foundation'>Foundation</option>
                    <option value='Corporate'>Corporate</option>
                    <option value='Other'>Other</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>

            <Form.Group controlId='description'>
              <Form.Label className='fw-semibold'>Description & Purpose of Grant</Form.Label>
              <InputGroup size='lg' className='mb-3'>
                <Form.Control
                  as='textarea'
                  style={{ width: '1650px', height: '150px' }}
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className='small-input'
                  placeholder='Enter grant description or purpose here...'
                />
              </InputGroup>
            </Form.Group>

            <Row className='mb-3'>
              <Col md={6}>
                <Form.Group controlId='funding'>
                  <Form.Label className='fw-semibold'>Funding Source</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      className='small-input'
                      placeholder='Funding Source'
                      value={funding}
                      onChange={(event) => setFunding(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='fundsAwarded'>
                  <Form.Label className='fw-semibold'>Funds Awarded</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='number'
                      className='small-input'
                      placeholder='Funds Awarded'
                      value={awardSum}
                      onChange={(event) => setAwardSum(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-5'>
              <Col md={6}>
                <Form.Group controlId='grantLead'>
                  <Form.Label className='fw-semibold'>Name of Grant Lead</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      className='small-input'
                      placeholder='Grant Lead'
                      value={grantLead}
                      onChange={(event) => setGrantLead(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={6}>
                <Form.Group controlId='startDate'>
                  <Form.Label className='fw-semibold'>Start Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='Start Date'
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='endDate'>
                  <Form.Label className='fw-semibold'>End Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='End Date'
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={6}>
                <Form.Group controlId='q1Date'>
                  <Form.Label className='fw-semibold'>1st Quarterly Report Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='1st Quarterly Report'
                      value={q1Date}
                      onChange={(event) => setQ1Date(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='q2Date'>
                  <Form.Label className='fw-semibold'>2nd Quarterly Report Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='2nd Quarterly Report'
                      value={q2Date}
                      onChange={(event) => setQ2Date(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={6}>
                <Form.Group controlId='q3Date'>
                  <Form.Label className='fw-semibold'>3rd Quarterly Report Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='3rd Quarterly Report'
                      value={q3Date}
                      onChange={(event) => setQ3Date(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='q4Date'>
                  <Form.Label className='fw-semibold'>4th Quarterly Report Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='4th Quarterly Report'
                      value={q4Date}
                      onChange={(event) => setQ4Date(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={6}>
                <Form.Group controlId='auditDate'>
                  <Form.Label className='fw-semibold'>Audit Date</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      type='date'
                      className='date-input'
                      placeholder='Audit Date'
                      value={auditDate}
                      onChange={(event) => setAuditDate(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={12}>
                <Form.Group controlId='notes'>
                  <Form.Label className='fw-semibold'>Notes</Form.Label>
                  <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                      as='textarea'
                      rows={5}
                      className='form-control'
                      placeholder='Enter grant-related notes here...'
                      value={notes}
                      onChange={(event) => setnotes(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className='action-button'
              type='submit'
              style={{
                fontSize: '22px',
                color: 'black',
                backgroundColor: '#ffd700',
                border: '2px solid #637dbd',
                width: '175px',
                height: '85px',
                marginLeft: '475px',
                marginBottom: '20px',
              }}
            >
              Add Grant
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
