import IEvent from '@/interfaces/i-event';

export function transformAllData(data: any): IEvent[] {
  const transformedEvents: IEvent[] = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEvents;
}

export function transformData(key: string, data: any): IEvent {
  return {
    id: key,
    title: data[key].title,
    description: data[key].description,
    location: data[key].location,
    date: data[key].date,
    image: data[key].image,
    isFeatured: data[key].isFeatured,
  };
}
