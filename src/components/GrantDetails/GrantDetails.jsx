import { useParams } from 'react-router-dom';
export default function GrantDetails() {
  const { id } = useParams();
  
  return (
    <>
      <h2>This is the grant details page! {id}</h2>
      <p>This is the page for more grant details!</p>
    </>
  );
}
