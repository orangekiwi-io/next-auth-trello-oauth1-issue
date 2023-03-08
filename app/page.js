import Signin from './Signin';

// Static metadata
export const metadata = {
  title: 'Trello Sign in'
};

const Page = () => {
  const environment = process.env.NODE_ENV;

  return (
    <>
      <h1>{ environment }</h1>
      <Signin />
    </>
  );
};
export default Page;
