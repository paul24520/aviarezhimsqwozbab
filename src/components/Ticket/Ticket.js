import React from "react";
import './Ticket.css'
import { format, add } from 'date-fns'
import PropTypes from 'prop-types';



const Ticket = ({ carrier, price, originTo, originFrom, destinationTo, destinationFrom, durationTo, durationFrom, stopsTo, stopsFrom, dataTo, dataFrom }) => {
    const urlImage = `https://pics.avs.io/99/36/${carrier}.png`;
    const formatClock = (duration) => {
        const hour = Math.floor(duration / 60);
        const minut = duration % 60;
        return `${hour}ч ${minut}м`
    }

    const timeTo = () => {
    const depactureDate = new Date(dataTo);
    const arrivalDate = add(depactureDate, {
      minutes: durationTo,
    });
    const timeFormatDepacture = format(depactureDate, 'HH:mm');
    const timeFormatArrival = format(arrivalDate, 'HH:mm');
    return `${timeFormatDepacture} - ${timeFormatArrival}`;
  };

  const timeFrom = () => {
    const depactureDate = new Date(dataFrom);
    const arrivalDate = add(depactureDate, {
      minutes: durationFrom,
    });
    const timeFormatDepacture = format(depactureDate, 'HH:mm');
    const timeFormatArrival = format(arrivalDate, 'HH:mm');
    return `${timeFormatDepacture} - ${timeFormatArrival}`;
  };

    return (
        <li className="ticket">
            <div className="pricelogo">
                <div className="price">{price} ₽</div>
                <div className="aviaLogo"><img src={urlImage} alt="avia" /></div>
            </div>
            <div className="pathTo">
                <div className='pathFragment'>
                    <span>{originTo} – {destinationTo}</span>
                    <span>{timeTo()}</span>
                </div>
                <div className='pathFragment'>
                    <span>В пути</span>
                    <span>{formatClock(durationTo)}</span>
                </div>
                <div className='pathFragment'>
                    <span>{stopsTo.length === 0
                    ? 'Без пересадок'
                    : `${stopsTo.length} пересадк${stopsTo.length === 1
                        ? 'а'
                        : (stopsTo.length === 2 || stopsTo.length === 3)
                            ? 'и'
                            : ''
                    }`}</span>
                    <span>
                        {stopsTo.join(', ')}
                    </span>
                </div>
            </div>
            <div className="pathFrom">
                <div className='pathFragment'>
                    <span>{originFrom} – {destinationFrom}</span>
                    <span>{timeFrom()}</span>
                </div>
                <div className='pathFragment'>
                    <span>В пути</span>
                    <span>{formatClock(durationFrom)}</span>
                </div>
                <div className='pathFragment'><span> {stopsFrom.length === 0
                    ? 'Без пересадок'
                    : `${stopsFrom.length} пересадк${stopsFrom.length === 1
                        ? 'а'
                        : (stopsFrom.length === 2 || stopsFrom.length === 3)
                            ? 'и'
                            : ''
                    }`}</span>
                    <span> {stopsFrom.join(', ')}</span>
                </div>
            </div>
        </li>
    )
}

Ticket.propTypes = {
    carrier: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originTo: PropTypes.string.isRequired,
    originFrom: PropTypes.string.isRequired,
    destinationTo: PropTypes.string.isRequired,
    destinationFrom: PropTypes.string.isRequired,
    durationTo: PropTypes.number.isRequired,
    durationFrom: PropTypes.number.isRequired,
    stopsTo: PropTypes.arrayOf(PropTypes.string).isRequired,
    stopsFrom: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataTo: PropTypes.string.isRequired,
    dataFrom: PropTypes.string.isRequired,
  };

export default Ticket;