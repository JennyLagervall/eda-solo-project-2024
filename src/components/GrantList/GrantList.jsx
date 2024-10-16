import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function GrantList() {
  const dispatch = useDispatch();
  const grantList = useSelector((store) => store.grantList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_LIST' });
  }, []);

  return (
    <div>
      <h2>This is the grant List page!</h2>
      <ul>
        {grantList.map((grant) => (
          <li key={grant.id}>{grant.grant_name}</li>
        ))}
      </ul>
    </div>
  );
}
