import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Logs from '../Log/Log';

export default function GrantDetails() {
  const gd = useSelector((store) => store.grantDetails);
  console.log('grant details store', gd);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: id });
  }, []);

  return (
    <>
      <h2>This is the grant details page!</h2>
      <h3>
        {gd.grant_name}({gd.grant_abbreviation})
      </h3>
      <div>
        <ul>
          <li>Grant was last updated on: {String(gd.last_edit_date).substring(0, 10)}</li>
          <li>Updates were made by: {gd.last_edit_by}</li>
          <li>Grant Type: {gd.grant_type}</li>
          <li>Funding Source: {gd.funding_src}</li>
          <li>Description & Purpose: {gd.description}</li>
          <li>Grant Lead: {gd.grant_lead}</li>
          <li>Funds Awarded: ${gd.award_sum ? Number(gd.award_sum).toLocaleString('en-US') : 'N/A'}</li>
          <li>Start Date: {String(gd.start_date).substring(0, 10)}</li>
          <li>End Date: {String(gd.end_date).substring(0, 10)}</li>
          <li>Notes: {gd.notes}</li>

          <h4>Important Dates</h4>

          <li> First Quarterly Report due: {String(gd.q1_report_date).substring(0, 10)}</li>
          <li> Second Quarterly Report due: {String(gd.q2_report_date).substring(0, 10)}</li>
          <li>Third Quarterly Report due: {String(gd.q3_report_date).substring(0, 10)}</li>
          <li>Fourth Quarterly Report due: {String(gd.q4_report_date).substring(0, 10)}</li>
          <li>Audit date: {String(gd.audit_date).substring(0, 10)}</li>
        </ul>
        <button onClick={() => history.push(`/edit/${id}`)}>Edit Grant</button>
        <div>
          <Logs grantId={id} />
        </div>
      </div>
    </>
  );
}
