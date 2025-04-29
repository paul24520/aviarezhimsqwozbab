import React from "react";
import './TicketList.css'
import Ticket from "../Ticket/Ticket";
import { useSelector } from "react-redux";

const TicketList = () => {
    const tickets = useSelector((state) => state.filters.tickets || []);
    const numberVisibleTickets = useSelector((state) => state.filters.numberVisibleTickets)
    const visibleTickets = tickets.slice(0, numberVisibleTickets)
    return (
        <ul className="ticket-list">
            {visibleTickets?.map((el) => {
                return (
                    <Ticket
                        key={el.id}
                        price={el.price}
                        carrier={el.carrier}
                        originFrom={el.segments[1].origin}
                        originTo={el.segments[0].origin}
                        destinationTo={el.segments[0].destination}
                        destinationFrom={el.segments[1].destination}
                        durationTo={el.segments[0].duration}
                        durationFrom={el.segments[1].duration}
                        stopsTo={el.segments[0].stops}
                        stopsFrom={el.segments[1].stops}
                        dataTo={el.segments[0].date}
                        dataFrom={el.segments[1].date}
                    />
                )
            })}
        </ul>

    )
}

export default TicketList;