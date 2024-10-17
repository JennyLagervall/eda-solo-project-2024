import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Logs from '../Log/Log';
// , useHistory
export default function GrantDetails() {
  const gd = useSelector((store) => store.grantDetails);
  console.log('grant details store', gd);

  const { id } = useParams();
  const dispatch = useDispatch();
  //const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: id });
  }, []);

  return (
    <>
      <h2>This is the grant details page!</h2>
      <h3>{gd.grant_name}</h3>
      <div>
        <ul>
          <li>
            Funding Source:{gd.funding_src} ({gd.grant_abbreviation})
          </li>
          <li>Purpose: {gd.description}</li>
          <li>Grant was last updated on: {gd.last_edit_date}</li>
          <li>Updates were made by: {gd.last_edit_by}</li>
          <li>Funds Awarded: ${gd.award_sum}</li>
          <li>Start Date{gd.start_date}</li>
          <li>End Date: {gd.end_date}</li>
          <h4>Important Dates</h4>

          <li> First Quarterly Report due: {gd.q1_report_date}</li>
          <li> Second Quarterly Report due:{gd.q2_report_date}</li>
          <li>Third Quarterly Report due:{gd.q3_report_date}</li>
          <li>Fourth Quarterly Report due:{gd.q4_report_date}</li>
          <li>Audit date: {gd.audit_date}</li>
        </ul>
        \
        <div>
          <Logs grantId={id} />
        </div>
      </div>
    </>
  );
}
