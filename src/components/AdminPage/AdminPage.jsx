import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function AdminPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const grantList = useSelector((store) => store.grantList);
  console.log('grant list store', grantList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_LIST' });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      <ul>
        {grantList
          .filter((a) => a.archived === false)
          .map((grant) => {
            return (
              <div key={grant.id}>
                <li>
                  {grant.grant_name} <br />
                </li>
                <button onClick={() => history.push(`/edit/${grant.id}`)}>Edit Grant</button>
                <button
                  onClick={() => {
                    console.log('Archiving grant with id:', grant.id);
                    dispatch({ type: 'ARCHIVE_GRANT', payload: grant.id });
                  }}
                >
                  Archive Grant
                </button>
              </div>
            );
          })}
      </ul>
      <div>
        <h3>Archived Grants </h3>
        <ul>
          {grantList
            .filter((a) => a.archived === true)
            .map((grant) => {
              return (
                <div key={grant.id}>
                  <li>
                    {grant.grant_name} <br />
                  </li>
                  <button
                    onClick={() => {
                      console.log('Archiving grant with id:', grant.id);
                      dispatch({ type: 'ARCHIVE_GRANT', payload: grant.id });
                    }}
                  >
                    Restore
                  </button>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
