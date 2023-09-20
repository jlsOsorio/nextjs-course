import React from 'react';
import EventList from '@/components/events/event-list';
import IEvent from '@/interfaces/i-event';
import { getFeaturedEvents } from '@/helpers/api-util';

const HomePage = ({ events }: { events: IEvent[] }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
