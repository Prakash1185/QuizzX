// import { useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

// const useAuth = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const checkAuth = () => {
//             const token = document.cookie.split(';').find(row => row.startsWith('token='));

//             if (!token) {
//                 setIsLoggedIn(false);
//                 return;
//             }
//         }

//         const decodedToken = jwtDecode(token.split('=')[1]);

//         if (decodedToken.exp * 1000 > Date.now()) {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }

//         checkAuth();
//     }, []);

//     return { isLoggedIn };
// }

// export default useAuth;

