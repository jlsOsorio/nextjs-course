import classes from './event-summary.module.css';

interface IEventSummary {
  title: string;
}

const EventSummary = ({ title }: IEventSummary) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
