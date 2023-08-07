import React from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '@/dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';

const EventDetailsPage = () => {
  const router = useRouter();
  const eventId = router.query.eventid;

  if (eventId) {
    const event = getEventById(eventId as string);

    return event ? (
      <>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </>
    ) : (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  } else {
    return null;
  }
};

export default EventDetailsPage;
