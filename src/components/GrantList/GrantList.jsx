import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import ProgressBarComponent from '../ProgressBar/ProgressBar';
import { totalExpenditures } from '../../utils/utils';
import './grantList.css';

export default function GrantList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logs = useSelector((store) => store.log);
  const grantList = useSelector((store) => store.grantList);
  console.log('grant list store', grantList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_LIST' });
    dispatch({ type: 'FETCH_LOG' });
  }, []);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            paddingTop: '55px',
            paddingBottom: '20px',
            fontSize: '60px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            display: 'inline-block',
            borderBottom: '3px solid #637dbd',
            paddingBottom: '5px',
            marginBottom: '30px',
          }}
        >
          Active Grants
        </h1>
      </div>
      <Container>
        <Row className='gx-4'>
          {grantList
            .filter((grant) => grant.archived === false)
            .map((grant) => {
              return (
                <Col md={4} key={grant.id} className='mb-4'>
                  <Card className='h-100 mb-5 md={4} grantCard'>
                    <Card.Header
                      style={{ backgroundColor: '#304c54', fontSize: '25px', height: '80px' }}
                      className='text-white'
                    >
                      {grant.grant_name}
                    </Card.Header>
                    <ProgressBarComponent grantId={grant.id} grantSum={grant.award_sum} className='progressB' />
                    <Card.Body key={grant.id}>
                      <Row>
                        <Col md={9}>
                          <Card.Title className='fw-bold mb-8 fs-4 ' style={{ marginBottom: '15px' }}>
                            {grant.grant_name}
                          </Card.Title>
                        </Col>
                        <Col md={2} className='text-end'>
                          <span className='badge bg-success' style={{ fontSize: '13px', padding: '9px' }}>
                            {grant.grant_abbreviation}
                          </span>
                        </Col>
                      </Row>
                      <Row className='mb-2 fs-5'>
                        <Col>
                          <div className='fw-semibold fs-5'> Award Sum:</div>
                          <div> ${grant.award_sum.toLocaleString('en-US')} </div>
                        </Col>
                        <Col>
                          <div className='fw-semibold fs-5'> Funds Utilized:</div>
                          <div> ${totalExpenditures(logs, grant.id).toLocaleString('en-US')} </div>
                        </Col>
                      </Row>
                      <Row className='mb-2 fs-5'>
                        <Col>
                          <div className='fw-semibold fs-5'>Start Date:</div>
                          <div>{moment(grant.start_date).calendar()}</div>
                        </Col>
                        <Col>
                          <div className='fw-semibold fs-5'>End Date:</div>
                          <div>{moment(grant.end_date).calendar()}</div>
                        </Col>
                      </Row>
                      <Row className='mb-2 fs-5'>
                        <Col>
                          <div className='fw-semibold fs-5'>Funding Agency:</div>
                          <div> {grant.funding_src}</div>
                        </Col>
                      </Row>
                      <Row className='mb-2 fs-5'>
                        <Col>
                          <div className='fw-semibold fs-5'> Lead:</div>
                          <div> {grant.grant_lead} </div>
                        </Col>
                      </Row>
                      <button
                        style={{ marginTop: '15px', fontSize: '20px' }}
                        className='listButton'
                        onClick={() => history.push(`/grantlist/${grant.id}`)}
                      >
                        Grant Details
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}
