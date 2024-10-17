import { useHistory } from 'react-router-dom';

export default function GrantSuccess() {
   const history = useHistory();
  return (
    <>
      <h2>Congrats! You added a new grant!</h2>
      <button onClick={() => history.push(`/grantlist`)}>Return to Grant List</button>
    </>
  );
}
