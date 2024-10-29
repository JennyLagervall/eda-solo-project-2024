import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';

function AdminPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const grantList = useSelector((store) => store.grantList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_LIST' });
  }, [dispatch]);

  return (
    <Container style={{ marginTop: '40px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2
          style={{
            paddingTop: '60px',
            color: 'white',
            fontSize: '52px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            display: 'inline-block',
            borderBottom: '3px solid #637dbd',
            marginBottom: '40px',
          }}
        >
          Admin Page
        </h2>
      </div>

      <h3
        style={{
          color: 'black',
          fontSize: '30px',
          marginTop: '40px',
          marginBottom: '20px',
          borderBottom: '2px solid #637dbd',
          paddingBottom: '10px',
        }}
      >
        Active Grants
      </h3>
      <Table striped bordered hover responsive className='table-sm' style={{ backgroundColor: '#fbf7ed' }}>
        <thead style={{ backgroundColor: '#304c54', color: 'white' }}>
          <tr>
            <th style={{ fontSize: '25px', fontWeight: 'normal' }}>Grant Name</th>
            <th style={{ fontSize: '25px', fontWeight: 'normal' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grantList
            .filter((grant) => !grant.archived)
            .map((grant) => (
              <tr key={grant.id}>
                <td style={{ fontSize: '22px'}}>{grant.grant_name}</td>
                <td>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={() => history.push(`/edit/${grant.id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => dispatch({ type: 'ARCHIVE_GRANT', payload: grant.id })}
                  >
                    Archive
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Archived Grants Section */}
      <h3
        style={{
          color: 'black',
          fontSize: '30px',
          marginTop: '40px',
          marginBottom: '20px',
          borderBottom: '2px solid #637dbd',
          paddingBottom: '10px',
        }}
      >
        Archived Grants
      </h3>

      <Table striped bordered hover responsive className='table-sm' style={{ backgroundColor: '#fbf7ed' }}>
        <thead style={{ backgroundColor: '#304c54', color: 'white' }}>
          <tr>
            <th style={{ fontSize: '25px', fontWeight: 'normal' }}>Grant Name</th>
            <th style={{ fontSize: '25px', fontWeight: 'normal' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grantList
            .filter((grant) => grant.archived)
            .map((grant) => (
              <tr key={grant.id}>
                <td style={{ fontSize: '22px' }}>{grant.grant_name}</td>
                <td>
                  <Button
                    variant='success'
                    size='sm'
                    onClick={() => dispatch({ type: 'ARCHIVE_GRANT', payload: grant.id })}
                  >
                    Restore
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPage;
