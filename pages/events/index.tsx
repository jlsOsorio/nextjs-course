import { getAllEvents } from '@/dummy-data';
import React from 'react';
import EventsSearch from '@/components/events/events-search';
import EventList from '@/components/events/event-list';
import { useRouter } from 'next/router';

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year: string, month: string): void {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  // function submitHandler(event: FormEvent<HTMLFormElement>): void {
  //   event.preventDefault();

  //   if (dateInputStart.current?.value && dateInputEnd.current?.value) {
  //     const [yearStart, monthStart] = dateInputStart.current.value
  //       .split('-')
  //       .slice(0, 2);
  //     const [yearEnd, monthEnd] = dateInputEnd.current.value
  //       .split('-')
  //       .slice(0, 2);

  //     router.push({
  //       pathname: '/events/[...slug]',
  //       query: {
  //         // slug: `${yearStart}\/${monthStart}\/${yearEnd}\/${monthEnd}`,
  //         slug: [yearStart, monthStart, yearEnd, monthEnd],
  //       },
  //     });
  //   } else {
  //     alert('Please insert beginning and ending date.');
  //   }
  // }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default EventsPage;
