import React from "react";
import FilterTickets from "../FilterTickets/FilterTickets";
import MainTickets from "../MainTickets/MainTickets";
import './Main.css';

const Main = () => {
    return (
        <main>
            <FilterTickets />
            <MainTickets />
        </main>
    )
}

export default Main;