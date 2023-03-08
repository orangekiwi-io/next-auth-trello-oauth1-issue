'use client';
import { signIn } from 'next-auth/react';

const Signin = () => {
  return (
    <>
      <h2>Sign in component</h2>

      <button onClick={() => signIn('trello')}>Sign in</button>
    </>
  );
};

export default Signin;
