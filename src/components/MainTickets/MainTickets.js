import React from "react";
import './MainTickets.css'
import SortTickets from "../SortTickets/SortTickets";
import TicketList from "../TicketList/TicketList";
import ButtonMore from "../ButtonMore/ButtonMore";

const MainTickets = () => {
    return (
        <div className="MainTickets">
            <SortTickets />
            <TicketList />
            <ButtonMore />
        </div>

    )
}

export default MainTickets;