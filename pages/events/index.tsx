import React from 'react';
import EventsSearch from '@/components/events/events-search';
import EventList from '@/components/events/event-list';
import { useRouter } from 'next/router';
import IEvent from '@/interfaces/i-event';
import { getAllEvents } from '@/helpers/api-util';

const EventsPage = ({ events }: { events: IEvent[] }) => {
  const router = useRouter();

  function findEventsHandler(year: string, month: string): void {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default EventsPage;
