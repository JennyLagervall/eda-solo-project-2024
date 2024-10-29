import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { totalExpenditures } from '../../utils/utils';

export default function ProgressBarComponent({ grantId, grantSum }) {
  const logs = useSelector((store) => store.log);

  function expendPct() {
    // console.log('award sum', grantSum);
    // console.log('totalExpenditures', totalExpenditures(logs, grantId));
    let tExp = totalExpenditures(logs, grantId);
    // console.log('exp calc', Math.round((tExp / grantSum) * 100));
    let expenditurePercent = Math.round((tExp / grantSum) * 100) || 0;
    //console.log('expenditure Percent', expenditurePercent);
    return expenditurePercent;
  }

  return (
    <div>
      <ProgressBar
        now={expendPct()}
        label={`${expendPct()}%`}
        variant='warning'
        style={{ paddingTop: '2px', height: '1.75rem', fontSize: '1.25rem' }}
      />
    </div>
  );
}
