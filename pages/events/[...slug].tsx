import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/helpers/api-util';
import IEvent from '@/interfaces/i-event';
import { transformAllData } from '@/utils/events-utils';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const FilteredEventsPage = () => {
  // if (!year && !month) {
  //   return <p className="center">Loading...</p>;
  // }

  // const numYear = +year;
  // const numMonth = +month;

  //CLIENT SIDE FETCHING
  const [loadedEvents, setLoadedEvents] = React.useState<IEvent[] | null>();
  const router = useRouter();
  const filterData = router.query.slug as string[];

  async function fetcherHandler(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  const { data, error } = useSWR(
    'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcherHandler
  );

  React.useEffect(() => {
    if (data) {
      const events = transformAllData(data);

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const propsDate = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={propsDate} />
      <EventList items={filteredEvents} />
    </>
  );

  //SERVER SIDE FETCHING
  // const FilteredEventsPage = ({
  //   events,
  //   date,
  //   hasError,
  // }: {
  //   events: IEvent[];
  //   date: { year: number; month: number };
  //   hasError?: boolean;
  // }) => {
  // if (hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  // const filteredEvents = events;
  // // if (!events || events.length === 0) {
  // //   return <p>Loading....</p>;
  // // }

  // // const filteredEvents = events.filter((event) => {
  // //   const eventDate = new Date(event.date);
  // //   return (
  // //     eventDate.getFullYear() === numYear &&
  // //     eventDate.getMonth() === numMonth - 1
  // //   );
  // // });

  // if (!filteredEvents || filteredEvents.length === 0) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>No events found for the chosen filter!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  // const propsDate = new Date(date.year, date.month - 1);

  // return (
  //   <>
  //     <ResultsTitle date={propsDate} />
  //     <EventList items={filteredEvents} />
  //   </>
  // );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { params } = context;
//   // const [year, month] = params?.slug as string[];

//   // const events = await getAllEvents();
//   const filterData = params?.slug as string[];

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
