import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

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
    <>
      <h2>This is the grant edit page!</h2>
      {/* {grants?.length > 0 && ( */}
      <div>
        <form onSubmit={updateGrant}>
          <input
            type='text'
            placeholder='Grant Name'
            value={editedGrant.grant_name}
            onChange={(event) => handleGrantChange(event, 'grant_name')}
          />
          <input
            type='text'
            placeholder='Funding Source'
            value={editedGrant.funding_src}
            onChange={(event) => handleGrantChange(event, 'funding_src')}
          />
          <input
            type='text'
            placeholder='Grant Abbreviation'
            value={editedGrant.grant_abbreviation}
            onChange={(event) => handleGrantChange(event, 'grant_abbreviation')}
          />

          <input
            type='text'
            placeholder='Grant_Lead'
            value={editedGrant.grant_lead}
            onChange={(event) => handleGrantChange(event, 'grant_lead')}
          />

          <input
            type='text'
            placeholder='Grant Type'
            value={editedGrant.grant_type}
            onChange={(event) => handleGrantChange(event, 'grant_type')}
          />

          <input
            type='text'
            placeholder='Grant Description & Purpose'
            value={editedGrant.description}
            onChange={(event) => handleGrantChange(event, 'description')}
          />

          <input
            type='number'
            placeholder='Funds Awarded'
            value={editedGrant.award_sum}
            onChange={(event) => handleGrantChange(event, 'award_sum')}
          />

          <input
            type='text'
            placeholder='Start Date'
            value={editedGrant.start_date.substring(0, 10) || ''}
            onChange={(event) => handleGrantChange(event, 'start_date')}
          />
          <input
            type='text'
            placeholder='End Date'
            value={editedGrant.end_date.substring(0, 10) || ''}
            onChange={(event) => handleGrantChange(event, 'end_date')}
          />
          <input
            type='text'
            placeholder='First Quarterly Report due'
            value={editedGrant.q1_report_date.substring(0, 10)}
            onChange={(event) => handleGrantChange(event, 'q1_report_date')}
          />
          <input
            type='text'
            placeholder='Second Quarterly Report due'
            value={editedGrant.q2_report_date.substring(0, 10)}
            onChange={(event) => handleGrantChange(event, 'q2_report_date')}
          />
          <input
            type='text'
            placeholder='Third Quarterly Report due'
            value={editedGrant.q3_report_date.substring(0, 10)}
            onChange={(event) => handleGrantChange(event, 'q3_report_date')}
          />
          <input
            type='text'
            placeholder='Fourth Quarterly Report due'
            value={editedGrant.q4_report_date.substring(0, 10)}
            onChange={(event) => handleGrantChange(event, 'q4_report_date')}
          />
          <input
            type='text'
            placeholder='Audit Date'
            value={editedGrant.audit_date.substring(0, 10)}
            onChange={(event) => handleGrantChange(event, 'audit_date')}
          />
          <input
            type='text'
            placeholder='notes'
            value={editedGrant.notes}
            onChange={(event) => handleGrantChange(event, 'notes')}
          />
          <button onClick={() => history.push(`'/grantlist'`)} type='submit'>
            Update Grant
          </button>
        </form>
      </div>
    </>
  );
}
