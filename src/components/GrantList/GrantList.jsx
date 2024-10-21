import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function GrantList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const grantList = useSelector((store) => store.grantList);
  console.log('grant list store', grantList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_LIST' });
  }, []);
  

  return (
    <div>
      <h2>This is the grant List page!</h2>
      <ul>
        {grantList
          .filter((grant) => grant.archived === false)
          .map((grant) => {
            return (
              <div key={grant.id}>
                <li>
                  Name: {grant.grant_name} ({grant.grant_abbreviation})
                  <br />
                  Funding Source: {grant.funding_src} <br />
                  Lead: {grant.grant_lead} <br />
                  Description: {grant.description} <br />
                  Award Sum: ${grant.award_sum.toLocaleString('en-US')} <br />
                  Start Date: {String(grant.start_date).substring(0, 10)} <br />
                  End Date: {String(grant.end_date).substring(0, 10)} <br />
                </li>
                <button onClick={() => history.push(`/grantlist/${grant.id}`)}>Grant Details</button>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
