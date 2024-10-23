import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function GrantForm() {
  const userId = useSelector((store) => store.user.id);

  const [grantName, setGrantName] = useState('');
  const [funding, setFunding] = useState('');
  const [abbreviaton, setAbbreviaton] = useState('');
  const [grantLead, setGrantLead] = useState('');
  const [grantType, setGrantType] = useState('');
  const [description, setDescription] = useState('');
  const [awardSum, setAwardSum] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [q1Date, setQ1Date] = useState('');
  const [q2Date, setQ2Date] = useState('');
  const [q3Date, setQ3Date] = useState('');
  const [q4Date, setQ4Date] = useState('');
  const [auditDate, setAuditDate] = useState('');
  const [notes, setnotes] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'ADD_GRANT',
      payload: {
        grant_name: grantName,
        funding_src: funding,
        grant_abbreviation: abbreviaton,
        grant_lead: grantLead,
        grant_type: grantType,
        description: description,
        award_sum: awardSum,
        start_date: startDate,
        end_date: endDate,
        q1_report_date: q1Date,
        q2_report_date: q2Date,
        q3_report_date: q3Date,
        q4_report_date: q4Date,
        audit_date: auditDate,
        notes: notes,
      },
    });
    setGrantName('');
    setFunding('');
    setAbbreviaton('');
    setGrantLead('');
    setGrantType('');
    setDescription('');
    setAwardSum('');
    setStartDate('');
    setEndDate('');
    setQ1Date('');
    setQ2Date('');
    setQ3Date('');
    setQ4Date('');
    setAuditDate('');
    setnotes('');
  };

  return (
    <>
      <h2>ADD A GRANT!</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder='Grant Name' value={grantName} onChange={(event) => setGrantName(event.target.value)} />
          <input placeholder='Funding Source' value={funding} onChange={(event) => setFunding(event.target.value)} />
          <input
            placeholder='Abbreviation'
            value={abbreviaton}
            onChange={(event) => setAbbreviaton(event.target.value)}
          />
          <input placeholder='Grant Lead' value={grantLead} onChange={(event) => setGrantLead(event.target.value)} />
          <input placeholder='Grant Type' value={grantType} onChange={(event) => setGrantType(event.target.value)} />
          <input
            placeholder='Description & Purpose'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input placeholder='Funds Awarded' value={awardSum} onChange={(event) => setAwardSum(event.target.value)} />
          <input
            placeholder='Start Date'
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input placeholder='End Date' value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          <input
            placeholder='1st Quart Report due'
            value={q1Date}
            onChange={(event) => setQ1Date(event.target.value)}
          />
          <input
            placeholder='2nd Quart Report due'
            value={q2Date}
            onChange={(event) => setQ2Date(event.target.value)}
          />
          <input
            placeholder='3rd Quart Report due'
            value={q3Date}
            onChange={(event) => setQ3Date(event.target.value)}
          />
          <input
            placeholder='4th Quart Report due'
            value={q4Date}
            onChange={(event) => setQ4Date(event.target.value)}
          />
          <input placeholder='Audit Date' value={auditDate} onChange={(event) => setAuditDate(event.target.value)} />
          <input placeholder='Notes' value={notes} onChange={(event) => setnotes(event.target.value)} />
          <button>Add Grant</button>
        </form>
      </div>
    </>
  );
}
