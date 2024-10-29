import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Logs from '../Log/Log';
import moment from 'moment-timezone';
import '../GrantList/grantList.css';
import { Card, Button } from 'react-bootstrap';

export default function GrantDetails() {
  const gd = useSelector((store) => store.grantDetails);
  const [activeTab, setActiveTab] = useState('Overview');
  console.log('grant details store', gd);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: id });
  }, []);

  const onTabClick = (tab) => {
    setActiveTab(tab);
    console.log('Active tab:', tab);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            paddingTop: '60px',
            color: 'white',
            textAlign: 'center',
            fontSize: '52px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            display: 'inline-block',
            borderBottom: '3px solid #637dbd',
          }}
        >
          Grant Details
        </h3>
      </div>

      <div
        style={{
          maxWidth: '1600px', // text box width
          margin: '0 auto',
          padding: '0 20px',
          marginTop: '50px',
          // backgroundColor: '#fbf7ed',
        }}
      >
        <ul className='nav nav-tabs justify-content-start' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'Overview' ? 'show active' : ''}`}
              onClick={() => onTabClick('Overview')}
              type='button'
              role='tab'
              aria-selected={activeTab === 'Overview'}
              style={{
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: activeTab === 'Overview' ? '#506299' : '#637dbd',
                padding: '15px 25px',
                border: '3px solid #637dbd', // Thicker tab border
                borderRadius: '5px',
                marginRight: '5px', // Space tabs
              }}
            >
              Overview
            </button>
          </li>

          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'ImportantDates' ? 'show active' : ''}`}
              onClick={() => onTabClick('ImportantDates')}
              type='button'
              role='tab'
              aria-selected={activeTab === 'ImportantDates'}
              style={{
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: activeTab === 'ImportantDates' ? '#506299' : '#637dbd',
                padding: '15px 25px',
                border: '3px solid #637dbd',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              Important Dates
            </button>
          </li>

          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'Logs' ? 'show active' : ''}`}
              onClick={() => onTabClick('Logs')}
              type='button'
              role='tab'
              aria-selected={activeTab === 'Logs'}
              style={{
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: activeTab === 'Logs' ? '#506299' : '#637dbd',
                padding: '15px 25px',
                border: '3px solid #637dbd',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              Finances & Logs
            </button>
          </li>
        </ul>
        <div>
          {activeTab === 'Overview' && (
            <Card style={{ backgroundColor: '#fbf7ed' }}>
              <Card.Header
                style={{
                  backgroundColor: '#304c54',
                  fontSize: '35px',
                  height: '80px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  paddingTop: '20px',
                  paddingLeft: '40px',
                  paddingBottom: '20px',
                }}
                className='text-white'
              >
                {gd.grant_name}
                <span
                  className='badge bg-success'
                  style={{ fontSize: '20px', float: 'right', marginRight: '80px', marginTop: '10px' }}
                >
                  {gd.grant_abbreviation}
                </span>
              </Card.Header>
              <Card.Body style={{ paddingLeft: '80px' }}>
                <Card.Text>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingRight: '70px',
                      paddingTop: '15px',
                      fontSize: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '35px',
                        paddingBottom: '30px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      Grant Overview
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                      }}
                    >
                      <span>
                        <strong>Grant was last updated on:</strong> {moment(gd.last_edit_date).format('MMMM Do, YYYY')}
                      </span>
                      <span>
                        <strong>Updates were made by:</strong> {gd.last_edit_by}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '24px', paddingBottom: '5px' }}>
                    <p>
                      <strong>Grant Type:</strong> {gd.grant_type}
                    </p>
                    <p>
                      <strong> Funding Source: </strong>
                      {gd.funding_src}
                    </p>
                    <p>
                      <strong>Description & Purpose:</strong> {gd.description}
                    </p>
                    <p>
                      <strong>Grant Lead:</strong> {gd.grant_lead}
                    </p>
                    <p>
                      <strong>Funds Awarded: </strong>$
                      {gd.award_sum ? Number(gd.award_sum).toLocaleString('en-US') : 'N/A'}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {moment(gd.start_date).calendar()}
                    </p>
                    <p>
                      <strong>End Date:</strong> {moment(gd.end_date).calendar()}
                    </p>
                    <p>
                      <strong>Notes:</strong> {gd.notes}
                    </p>
                  </div>
                </Card.Text>
                <Button
                  className='action-button'
                  style={{
                    fontSize: '22px',
                    color: 'black',
                    backgroundColor: '#ffd700',
                    border: '2px solid #637dbd',
                    width: '150px',
                    height: '70px',

                    marginLeft: '650px',
                    marginBottom: '20px',
                  }}
                  onClick={() => history.push(`/edit/${id}`)}
                >
                  Edit Grant
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>

        <div>
          {activeTab === 'ImportantDates' && (
            <Card style={{ backgroundColor: '#fbf7ed' }}>
              <Card.Header
                style={{
                  backgroundColor: '#304c54',
                  fontSize: '35px',
                  height: '80px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  paddingTop: '20px',
                  paddingLeft: '40px',
                  paddingBottom: '20px',
                }}
                className='text-white'
              >
                {gd.grant_name}
                <span
                  className='badge bg-success'
                  style={{ fontSize: '20px', float: 'right', marginRight: '80px', marginTop: '10px' }}
                >
                  {gd.grant_abbreviation}
                </span>
              </Card.Header>
              <Card.Body style={{ paddingLeft: '80px' }}>
                <Card.Text>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingRight: '70px',
                      paddingTop: '15px',
                      fontSize: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '32px',
                        paddingBottom: '30px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      Important Dates and Deadlines
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                      }}
                    >
                      <span>
                        <strong>Grant was last updated on:</strong> {moment(gd.last_edit_date).format('MMMM Do, YYYY')}
                      </span>
                      <span>
                        <strong>Updates were made by:</strong> {gd.last_edit_by}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '24px', paddingBottom: '5px' }}>
                    <p>
                      <strong>First Quarterly Report due:</strong> {moment(gd.q1_report_date).calendar()}
                    </p>
                    <p>
                      <strong>Second Quarterly Report due:</strong> {moment(gd.q2_report_date).calendar()}
                    </p>
                    <p>
                      <strong>Third Quarterly Report due:</strong> {moment(gd.q3_report_date).calendar()}
                    </p>
                    <p>
                      <strong>Fourth Quarterly Report due:</strong> {moment(gd.q4_report_date).calendar()}
                    </p>
                    <p>
                      <strong>Audit date:</strong> {moment(gd.audit_date).calendar()}
                    </p>
                  </div>
                </Card.Text>
                <Button
                  style={{
                    fontSize: '22px',
                    color: 'black',
                    backgroundColor: '#ffd700',
                    border: '2px solid #637dbd',
                    width: '150px',
                    height: '70px',

                    marginLeft: '650px',
                    marginBottom: '20px',
                  }}
                  onClick={() => history.push(`/edit/${id}`)}
                >
                  Edit Grant
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>

        {activeTab === 'Logs' && (
          <div className='tab-pane fade show active'>
            <Card style={{ backgroundColor: '#fbf7ed' }}>
              <Card.Header
                style={{
                  backgroundColor: '#304c54',
                  fontSize: '35px',
                  height: '80px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  paddingTop: '20px',
                  paddingLeft: '40px',
                  paddingBottom: '20px',
                }}
                className='text-white'
              >
                {gd.grant_name}
                <span
                  className='badge bg-success'
                  style={{ fontSize: '20px', float: 'right', marginRight: '80px', marginTop: '10px' }}
                >
                  {gd.grant_abbreviation}
                </span>
              </Card.Header>
              <Card.Body style={{ paddingLeft: '80px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '70px',
                    paddingTop: '15px',
                    fontSize: '20px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '35px',
                      paddingBottom: '30px',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Financial Overview & Logs
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <span>
                      <strong>Grant was last updated on:</strong> {moment(gd.last_edit_date).format('MMMM Do, YYYY')}
                    </span>
                    <span>
                      <strong>Updates were made by:</strong> {gd.last_edit_by}
                    </span>
                  </div>
                </div>

                <Logs grantId={id} />
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
