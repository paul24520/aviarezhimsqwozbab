import React from "react";
import './ButtonMore.css';
import { addVisibleTickets } from "../../reducers/filtersReducer";
import { useDispatch } from "react-redux";

const ButtonMore = () => {
    const dispatch = useDispatch();
    return (
        <button className="more" onClick={() =>dispatch(addVisibleTickets())}>Показать еще 5 билетов!</button>
    )
} 

export default ButtonMore;