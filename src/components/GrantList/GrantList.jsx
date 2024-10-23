import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import ProgressBarComponent from '../ProgressBar/ProgressBar';
import { totalExpenditures } from '../../utils/utils';

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
      <h2>This is the grant List page!</h2>
      <Container>
        <Row className='gx-4'>
          {grantList
            .filter((grant) => grant.archived === false)
            .map((grant) => {
              return (
                <Col md={4} key={grant.id} className='mb-4'>
                  <Card className='h-100 mb-4'>
                    <Card.Header className='bg-dark text-white'>Grant</Card.Header>
                    <ProgressBarComponent grantId={grant.id} grantSum={grant.award_sum} />
                    <Card.Body key={grant.id}>
                      <Row>
                        <Col md={8}>
                          <Card.Title className='fw-bold mb-8 fs-6'>{grant.grant_name} </Card.Title>
                        </Col>
                        <Col md={4} className='text-end'>
                          <span className='badge bg-secondary'>{grant.grant_abbreviation}</span>
                        </Col>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <div className='fw-semibold'> Award Sum:</div>
                          <div> ${grant.award_sum.toLocaleString('en-US')} </div>
                        </Col>
                        <Col>
                          <div className='fw-semibold'> Funds Utilized:</div>
                          <div> ${totalExpenditures(logs, grant.id).toLocaleString('en-US')} </div>
                        </Col>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <div className='fw-semibold'>Start Date:</div>
                          <div>{moment(grant.start_date).calendar()}</div>
                        </Col>
                        <Col>
                          <div className='fw-semibold'>End Date:</div>
                          <div>{moment(grant.end_date).calendar()}</div>
                        </Col>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <div className='fw-semibold'>Funding Agency:</div>
                          <div> {grant.funding_src}</div>
                        </Col>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <div className='fw-semibold'> Lead:</div>
                          <div> {grant.grant_lead} </div>
                        </Col>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <div className='fw-semibold'> Award Sum:</div>
                          <div> ${grant.award_sum.toLocaleString('en-US')} </div>
                        </Col>
                      </Row>
                      <button onClick={() => history.push(`/grantlist/${grant.id}`)}>Grant Details</button>
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
