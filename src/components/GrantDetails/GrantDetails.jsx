import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Logs from '../Log/Log';
import moment from 'moment-timezone';
import { Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


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
      <h3>
        {gd.grant_name}({gd.grant_abbreviation})
      </h3>

      <div>
        <ul className='nav nav-tabs justify-content-start' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'Overview' ? 'show active' : ''}`}
              onClick={() => onTabClick('Overview')}
              type='button'
              role='tab'
              aria-selected={activeTab === 'Overview'}
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
            >
              Logs
            </button>
          </li>
        </ul>

        <div className='tab-content'>
          {activeTab === 'Overview' && (
            <div className='tab-pane fade show active'>
              <h2>Grant Overview</h2>
              <ul>
                <li>Grant was last updated on: {moment(gd.last_edit_date).format('MMMM Do, YYYY')}</li>
                <li>Updates were made by: {gd.last_edit_by}</li>
                <li>Grant Type: {gd.grant_type}</li>
                <li>Funding Source: {gd.funding_src}</li>
                <li>Description & Purpose: {gd.description}</li>
                <li>Grant Lead: {gd.grant_lead}</li>
                <li>Funds Awarded: ${gd.award_sum ? Number(gd.award_sum).toLocaleString('en-US') : 'N/A'}</li>
                <li>Start Date: {moment(gd.start_date).calendar()}</li>
                <li>End Date: {moment(gd.end_date).calendar()}</li>
                <li>Notes: {gd.notes}</li>
                <button onClick={() => history.push(`/edit/${id}`)}>Edit Grant</button>
              </ul>
            </div>
          )}
          {activeTab === 'ImportantDates' && (
            <div className='tab-pane fade show active'>
              <h2>Important Dates</h2>
              <ul>
                <h4>Important Dates</h4>
                <li> First Quarterly Report due: {moment(gd.q1_report_date).calendar()}</li>
                <li> Second Quarterly Report due: {moment(gd.q2_report_date).calendar()}</li>
                <li>Third Quarterly Report due: {moment(gd.q3_report_date).calendar()}</li>
                <li>Fourth Quarterly Report due: {moment(gd.q4_report_date).calendar()}</li>
                <li>Audit date: {moment(gd.audit_date).calendar()}</li>
              </ul>
            </div>
          )}
          {activeTab === 'Logs' && (
            <div className='tab-pane fade show active'>
              <h2>Grant Updates & Logs</h2>
              <Logs grantId={id} />
            </div>
          )}
        </div>
        <Tabs>
          <Tab title='Home'>Home</Tab>
          <Tab title='Home'>Home</Tab>
          <Tab title='Home'>Home</Tab>
        </Tabs>
      </div>
      
    </>
  );
}
