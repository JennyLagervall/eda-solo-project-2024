import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { totalExpenditures } from '../../utils/utils';

export default function GrantFunds({ grantId }) {
  const gd = useSelector((store) => store.grantDetails);
  const logs = useSelector((store) => store.log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GRANT_DETAILS', payload: grantId });
    dispatch({ type: 'FETCH_LOG' });
  }, []);

  return (
    <>
      <h2> Starting funds: {gd.award_sum}</h2>
      <h2> Utilized funds: {totalExpenditures(logs, grantId)}</h2>
      <h2> Remaining funds: {totalExpenditures(logs, grantId) > 0 ? 0 : totalExpenditures(logs, grantId)}</h2>
    </>
  );
}
