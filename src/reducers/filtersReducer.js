import { TOGGLE_ALL, TOGGLE_FILTER } from '../store/actions';

const initialState = {
  allTickets: [],  // Массив для всех билетов (не изменяется)
  tickets: [],     // Массив для отфильтрованных и отсортированных билетов
  searchId: null,
  numberVisibleTickets: 5,
  all: true,
  filters: {
    0: true,
    1: true,
    2: true,
    3: true,
  },
  sortType: 'Самый дешевый',
};



const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ALL: {
      const value = !state.all;
      const newFilters = {
        0: value,
        1: value,
        2: value,
        3: value,
      };
      const sortedFiltered = filterAndSortTickets(state.allTickets, newFilters, state.sortType);
      return {
        ...state,
        all: value,
        filters: newFilters,
        tickets: sortedFiltered,
      };
    }
    

    case TOGGLE_FILTER: {
      const { filterId } = action.payload;
      const newFilters = {
        ...state.filters,
        [filterId]: !state.filters[filterId],
      };
      const allFiltersSelected = Object.values(newFilters).every(Boolean);
      const sortedFiltered = filterAndSortTickets(state.allTickets, newFilters, state.sortType);
    
      return {
        ...state,
        filters: newFilters,
        all: allFiltersSelected,
        tickets: sortedFiltered,
      };
    }

    case 'SET_SEARCH_ID': {
      return { ...state, searchId: action.payload };
    }

    case 'ADD_TICKETS': {
      const allTickets = [...state.allTickets, ...action.payload];
      const sortedFiltered = filterAndSortTickets(allTickets, state.filters, state.sortType);
      return { ...state, allTickets, tickets: sortedFiltered };
    }
    case 'SET_SORT_TYPE': {
      const sortedFiltered = filterAndSortTickets(state.allTickets, state.filters, action.payload);
      return {
        ...state,
        sortType: action.payload,
        tickets: sortedFiltered,
      };
    }

    case 'ADD_5_TICKETS': {
      return {...state, numberVisibleTickets: state.numberVisibleTickets + 5,}
    }

    default:
      return state;
  }
};
export const getSearchId = () => async (dispatch) => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search', {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  });
  const data = await res.json();
  dispatch({
    type: 'SET_SEARCH_ID',
    payload: data.searchId,
  })
};

export const getTickets = () => async (dispatch, getState) => {
  const searchId = getState().filters.searchId;
  let stop = false;
  while (!stop) {
    try {
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      });
      if (!res.ok) {
        if (res.status === 500) {
          continue
        }
      }
      const data = await res.json();
      stop = data.stop;
      console.log(data);

      dispatch({
        type: 'ADD_TICKETS',
        payload: data.tickets,
      })
    }
    catch(err) {
      console.error('Ошибка при получении билетов:', err);
    }
  }
}

export const setSortType = (sort) => (dispatch, getState) => {
  const { allTickets, filters } = getState().filters;

  let sortedTickets = filterAndSortTickets(allTickets, filters, sort);

  dispatch({
    type: 'SET_SORT_TYPE',
    payload: sort,
  });

  dispatch({
    type: 'ADD_TICKETS',
    payload: sortedTickets,
  });
};

export const addVisibleTickets = () => (dispatch) => {
  dispatch({
    type: 'ADD_5_TICKETS',
  })
}






const filterAndSortTickets = (tickets, filters, sortType) => {
  const activeStops = Object.entries(filters)
    .filter(([, isChecked]) => isChecked)
    .map(([stopCount]) => Number(stopCount));

  const filtered = tickets.filter(ticket => {
    const stopsTo = ticket.segments[0].stops.length;
    const stopsBack = ticket.segments[1].stops.length;
    return activeStops.includes(stopsTo) || activeStops.includes(stopsBack);
  });

  if (sortType === 'Самый дешевый') {
    return filtered.sort((a, b) => a.price - b.price);
  }

  if (sortType === 'Самый быстрый') {
    return filtered.sort((a, b) => {
      const timeA = a.segments[0].duration + a.segments[1].duration;
      const timeB = b.segments[0].duration + b.segments[1].duration;
      return timeA - timeB;
    });
  }

  if (sortType === 'Оптимальный') {
    return filtered.sort((a, b) => {
      const timeA = a.segments[0].duration + a.segments[1].duration;
      const timeB = b.segments[0].duration + b.segments[1].duration;
      const scoreA = timeA * 10 + a.price;
      const scoreB = timeB * 10 + b.price;
      return scoreA - scoreB;
    });
  }

  return filtered;
};

export default filtersReducer; 