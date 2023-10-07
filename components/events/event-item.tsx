import React from 'react';
import styles from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Image from 'next/image';

const EventItem = ({
  title,
  image,
  date,
  location,
  id,
}: {
  title: string;
  image: string;
  date: string;
  location: string;
  id: string;
}) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(',', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />{' '}
      {/* A componente Image tem como benefícios tornar a imagem mais "leve", formatando-a para uma imagem do tipo .webp e com a resolução ligeiramente inferior. Ainda, o fetch das imagens na página é feita de modo "lazy". Isto significa que o fetch pode não ser feito, à partida, para todas as imagens da página, mas quando necessário, i.e., quando elas aparecerem na tela, diminuindo a quantidade de pedidos à partida e a largura de banda que advém da página. */}
      {/* <img src={'/' + image} alt={title} /> */}
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
