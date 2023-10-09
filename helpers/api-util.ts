import { transformAllData } from '@/utils/events-utils';

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const events = transformAllData(data);

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
