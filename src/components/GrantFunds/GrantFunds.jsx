import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { totalExpenditures } from '../../utils/utils';
import { Card } from 'react-bootstrap';
import '../GrantList/grantList.css';

export default function GrantFunds({ grantId }) {
  const gd = useSelector((store) => store.grantDetails);
  const logs = useSelector((store) => store.log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: grantId });
    dispatch({ type: 'FETCH_LOG' });
  }, []);

  return (
    <Card style={{ boxShadow: 'none', border: 'none', textAlign: 'center', fontSize: '25px', marginBottom:'20px' }}>
      <Card.Body style={{ backgroundColor: '#fbf7ed' }}>
        <p
        style=
        {{
          fontSize:'29px',
          borderBottom: '3px solid #637dbd',
          display: 'inline-block',
          fontWeight: 'bold',
          paddingBottom: '2px', // Adjusts the space between text and border
          lineHeight: '1',
        }}
        >Grant Funds</p>
        <p>
          <strong>Starting funds:</strong> ${gd.award_sum.toLocaleString('en-US')}
        </p>
        <p>
          <strong> Utilized funds:</strong> ${totalExpenditures(logs, grantId).toLocaleString('en-US')}
        </p>
        <p style={{ textShadow: '2px 2px 4px rgba(255, 215, 0, 0.8)', color: '#304c54', fontWeight: 'bold' }}>
          <strong>Remaining funds:</strong> ${(gd.award_sum - totalExpenditures(logs, grantId)).toLocaleString('en-US')}
        </p>
      </Card.Body>
    </Card>
  );
}

{
  /* <p style={{ textShadow: '2px 2px 4px rgba(255, 215, 0, 0.8)', color: '#304c54', fontWeight: 'bold' }}>
  <strong>Remaining funds:</strong> ${remainingFunds}
</p>; */
}
