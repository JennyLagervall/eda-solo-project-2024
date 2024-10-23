import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className='navbar-nav'>
      <Link to='/home'>
        <h2 className='navbar-title'>EDA Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className='navbar-link' to='/login'>
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className='navbar-link' to='/home'>
              Home
            </Link>

            <Link className='navbar-link' to='/grantlist'>
              Grant List
            </Link>

            <Link className='navbar-link' to='/grantform'>
              Add Grant
            </Link>

            <Link className='navbar-link' to='/administrator'>
              Admin
            </Link>
            <LogOutButton className='navbar-link' />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
// import { useSelector } from 'react-redux';

// function Nav() {
//   const user = useSelector((store) => store.user);

//   return (
//     <div className='nav'>
//       <Link to='/home'>
//         <h2 className='nav-title'>EDA Solo Project</h2>
//       </Link>
//       <div>
//         {/* If no user is logged in, show these links */}
//         {!user.id && (
//           // If there's no user, show login/registration links
//           <Link className='navLink' to='/login'>
//             Login / Register
//           </Link>
//         )}

//         {/* If a user is logged in, show these links */}
//         {user.id && (
//           <>
//             <Link className='navLink' to='/home'>
//               Home
//             </Link>

//             <Link className='navLink' to='/grantlist'>
//               Grant List
//             </Link>

//             <Link className='navLink' to='/grantform'>
//               Add Grant
//             </Link>

//             <Link className='navLink' to='/administrator'>
//               Admin
//             </Link>
//             <LogOutButton className='navLink' />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Nav;

{
  /* <Link className='navLink' to='/about'>
  About
</Link>; */
}
