import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import '../FormStyling/Forms.css'

import { Card, Container, Form, Row, Col, Button } from 'react-bootstrap';

// , useHistory
export default function EditGrant() {
  const { id } = useParams();
  const foundGrant = useSelector((store) => store.grantDetails);

  //const foundGrant = grants.find((grant) => Number(grant.id) === Number(id));
  //console.log('found grant', foundGrant);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editedGrant, setEditedGrant] = useState({
    grant_name: foundGrant.grant_name || '',
    funding_src: foundGrant.funding_src || '',
    grant_abbreviation: foundGrant.grant_abbreviation || '',
    grant_lead: foundGrant.grant_lead || '',
    grant_type: foundGrant.grant_type || '',
    description: foundGrant.description || '',
    last_edit_by: `${foundGrant.first_name || ''} ${foundGrant.last_name || ''}`,
    award_sum: foundGrant.award_sum || '',
    start_date: String(foundGrant.start_date) || '',
    end_date: String(foundGrant.end_date) || '',
    q1_report_date: String(foundGrant.q1_report_date) || '',
    q2_report_date: String(foundGrant.q2_report_date) || '',
    q3_report_date: String(foundGrant.q3_report_date) || '',
    q4_report_date: String(foundGrant.q4_report_date) || '',
    audit_date: String(foundGrant.audit_date) || '',
    notes: foundGrant.notes || '',
  });

  const handleGrantChange = (event, keyName) => {
    console.log('event.target and keyname', event.target, keyName);
    setEditedGrant({
      ...editedGrant,
      [keyName]: event.target.value,
    });
  };

  const updateGrant = (event) => {
    event.preventDefault();
    console.log('PUT to /api/grant/edit/{id}...');
    dispatch({ type: 'UPDATE_GRANT', payload: { id: id, data: editedGrant } });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: id });
    console.log('Console log of the found grant', foundGrant);
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
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
          {editedGrant.grant_name}
          <span
            className='badge bg-success'
            style={{ fontSize: '20px', float: 'right', marginRight: '80px', marginTop: '10px' }}
          >
            {editedGrant.grant_abbreviation}
          </span>
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
          Edit Grant Profile
        </Card.Title>

        <Card.Subtitle style={{ fontSize: '24px', paddingTop: '20px', paddingLeft: '40px' }} className='mb-2'>
          Please use the form below to edit and update grant information
        </Card.Subtitle>
        <Card.Body style={{ fontSize: '18px', paddingLeft: '40px', paddingRight: '40px' }}>
          <form onSubmit={updateGrant}>
            <Row className='align-items-center'>
              <Col sm={5} className='my-1'>
                <Form.Label className='fw-semibold'>Grant Name </Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Control
                    placeholder='Grant Name'
                    value={editedGrant.grant_name}
                    onChange={(event) => handleGrantChange(event, 'grant_name')}
                  />
                </InputGroup>
              </Col>
              <Col sm={2} className='my-1'>
                <Form.Label className='fw-semibold'>Abbreviation</Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Control
                    className='mini-input'
                    placeholder='Abbreviation'
                    value={editedGrant.grant_abbreviation}
                    onChange={(event) => handleGrantChange(event, 'grant_abbreviation')}
                  />
                </InputGroup>
              </Col>
              <Col sm={3} className='my-1'>
                <Form.Label className='fw-semibold'>Grant Type</Form.Label>
                <InputGroup size='lg' className='mb-3'>
                  <Form.Select
                    className='small-input'
                    value={editedGrant.grant_type}
                    onChange={(event) => handleGrantChange(event, 'grant_type')}
                  >
                    <option value='' disabled>
                      - Select -
                    </option>
                    <option value='Federal'>Federal</option>
                    <option value='State'>State</option>
                    <option value='Foundation'>Foundation</option>
                    <option value='Corporate'>Corporate</option>
                    <option value='Other'> Other</option>
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
                  value={editedGrant.description}
                  onChange={(event) => handleGrantChange(event, 'description')}
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
                      value={editedGrant.funding_src}
                      onChange={(event) => handleGrantChange(event, 'funding_src')}
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
                      value={editedGrant.award_sum}
                      onChange={(event) => handleGrantChange(event, 'award_sum')}
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
                      value={editedGrant.grant_lead}
                      onChange={(event) => handleGrantChange(event, 'grant_lead')}
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
                      value={editedGrant.start_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'start_date')}
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
                      value={editedGrant.end_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'end_date')}
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
                      value={editedGrant.q1_report_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'q1_report_date')}
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
                      value={editedGrant.q2_report_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'q2_report_date')}
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
                      value={editedGrant.q3_report_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'q3_report_date')}
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
                      value={editedGrant.q4_report_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'q4_report_date')}
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
                      value={editedGrant.audit_date.substring(0, 10)}
                      onChange={(event) => handleGrantChange(event, 'audit_date')}
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
                      value={editedGrant.notes}
                      onChange={(event) => handleGrantChange(event, 'notes')}
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
              onClick={() => history.goBack()}
            >
              Update Grant
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
