import React from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';
import { GetStaticPropsContext } from 'next';
import IEvent from '@/interfaces/i-event';
import { getEventById, getFeaturedEvents } from '@/helpers/api-util';

const EventDetailsPage = ({ selectedEvent }: { selectedEvent: IEvent }) => {
  if (!selectedEvent) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  if (selectedEvent) {
    return (
      <>
        <EventSummary title={selectedEvent.title} />
        <EventLogistics
          date={selectedEvent.date}
          address={selectedEvent.location}
          image={selectedEvent.image}
          imageAlt={selectedEvent.title}
        />
        <EventContent>
          <p>{selectedEvent.description}</p>
        </EventContent>
      </>
    );
  }
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const eventId = params?.eventid;

  const event = await getEventById(eventId as string);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventid: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}
export default EventDetailsPage;
