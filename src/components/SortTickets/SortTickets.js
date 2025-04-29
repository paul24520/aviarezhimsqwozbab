import React from "react";
import './SortTickets.css'
import { setSortType } from "../../reducers/filtersReducer";
import { useSelector, useDispatch } from 'react-redux';

const SortTickets = () => {
    const dispatch = useDispatch();
    const sort = useSelector((state) => state.filters.sortType)
    return (
        <nav>
            <ul>
                <li className={`nav-item ${sort === 'Самый дешевый' ? 'nav-item-active' : ''}`} onClick={() => dispatch(setSortType('Самый дешевый'))}>Самый дешевый</li>
                <li className={`nav-item ${sort === 'Самый быстрый' ? 'nav-item-active' : ''}`} onClick={() => dispatch(setSortType('Самый быстрый'))}>Самый быстрый</li>
                <li className={`nav-item ${sort === 'Оптимальный' ? 'nav-item-active' : ''}`} onClick={() => dispatch(setSortType('Оптимальный'))}>Оптимальный</li>
            </ul>
        </nav>
    )
}

export default SortTickets;