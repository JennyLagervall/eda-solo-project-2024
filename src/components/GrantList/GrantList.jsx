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
        {grantList.map((grant) => {
          return (
            <div key={grant.id}>
              <li>
                grant id:{grant.id} <br />
                Name:{grant.grant_name} <br />
                Funding Source: {grant.funding_src} <br />
                Lead: {grant.grant_lead} <br />
                Description: {grant.description} <br />
                Award Sum: ${grant.award_sum} <br />
                Start Date: <br />
                End Date: <br />
              </li>

              <button onClick={() => history.push(`/grantlist/${grant.id}`)}>Grant Details</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
