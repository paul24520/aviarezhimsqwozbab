import React from "react";
import './FilterTickets.css';
import { useSelector, useDispatch } from 'react-redux';  
import { toggleAll, toggleFilter } from '../../store/actions';  


const arrChekcbox = [
    { id: 'all', text: 'Все' },
    { id: 0, text: 'Без пересадок' },
    { id: 1, text: '1 пересадка' },
    { id: 2, text: '2 пересадки' },
    { id: 3, text: '3 пересадки' }
];

const FilterTickets = () => {
    const filters = useSelector(state => state.filters.filters);  
    const allSelected = useSelector(state => state.filters.all);  
    const dispatch = useDispatch(); 

    const handleToggleAll = () => {
        dispatch(toggleAll());  
    };

    const handleToggleFilter = (filterId) => {
        dispatch(toggleFilter(filterId));  
    };

    return (
        <div className="filter-tickets">
            <div className="filter-tickets__header">Количество пересадок</div>
            <ul className="filter-tickets__list">
                {arrChekcbox.map((el) => {
                    const isChecked = el.id === 'all' ? allSelected : filters[el.id];  
                    return (
                        <li className="filter-item" key={el.id}>
                            <label className="custom-checkbox">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={isChecked}  
                                    onChange={() => {
                                        if (el.id === 'all') {
                                            handleToggleAll(); 
                                        } else {
                                            handleToggleFilter(Number(el.id));  
                                        }
                                    }}
                                />
                                <span className="checkmark"></span>
                                <span className="check-text">{el.text}</span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default FilterTickets;