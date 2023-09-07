import { GetServerSidePropsContext } from 'next';
import React from 'react';

const UserProfilePage = ({ username }: { username: string }) => {
  return <h1>{username}</h1>;
};

export default UserProfilePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'João',
    },
  };
}
