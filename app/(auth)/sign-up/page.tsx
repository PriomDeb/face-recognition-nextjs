// // import AuthForm from "@/components/AuthForm";
// // import React from "react";

// // const SignUp = () => {
// //   return <AuthForm type="sign-up" />;
// // };

// // export default SignUp;

// "use client";

// import AuthForm from "@/components/AuthForm";
// import React, { useEffect, useState } from "react";

// const SignUp = () => {
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     const secret = prompt("Enter the secret key:");
//     if (secret === "xyz") {
//       setAuthorized(true);
//     } else {
//       alert("Invalid secret key. Access denied!");
//       // Optionally redirect to another page
//       window.location.href = "/"; // redirect to home
//     }
//   }, []);

//   if (!authorized) return null;

//   return <AuthForm type="sign-up" />;
// };

// export default SignUp;

"use client";

import AuthForm from "@/components/AuthForm";
import React, { useEffect, useRef, useState } from "react";

const SignUp = () => {
  const [authorized, setAuthorized] = useState(false);
  const askedRef = useRef(false); // guard to prevent double prompt

  useEffect(() => {
    if (askedRef.current) return; // already asked once
    askedRef.current = true;

    const secret = prompt("Enter the admin key to create teacher account:");
    if (secret === "xyz") {
      setAuthorized(true);
    } else {
      alert("Invalid admin key. Access denied!");
      window.location.href = "/"; // redirect or block
    }
  }, []);

  if (!authorized) return null;

  return <AuthForm type="sign-up" />;
};

export default SignUp;
