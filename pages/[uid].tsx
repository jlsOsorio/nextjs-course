import { GetServerSidePropsContext } from 'next';
import React from 'react';

const UserIdPage = ({ id }: { id: string }) => {
  return <div>{id}</div>;
};

export default UserIdPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const userId = params?.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
