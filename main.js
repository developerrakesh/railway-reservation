let today = new Date();
const { createStore, combineReducers } = Redux;
//Action
const bookTicket = (name, amount) => {
    return {
        type: 'BOOK_TICKET',
        payload: {
            name,
            amount
        }
    }
}

const cancelTicket = (pnr, refundAmount) => {
    return {
        type: 'CANCEL_TICKET',
        payload: {
            pnr,
            refundAmount
        }
    }
}

//Reducer
const updateReservationList = (reservationList = [], action) => {
    let id = 1;
    let arrLength = reservationList.length;
    if(arrLength !== 0) {
        id = reservationList[arrLength - 1].pnr + 1;
    }
    if(action.type === 'BOOK_TICKET') {
        return [...reservationList, {pnr: id, ...action.payload}];
    } else if(action.type === 'CANCEL_TICKET') {
        return reservationList.filter(ticket => {
            if(ticket.pnr !== action.payload.pnr) return true;
        });
    } else return reservationList;
}

const updateAccounts = (balance = 0, action) => {
    if(action.type === 'BOOK_TICKET') {
        return balance + action.payload.amount;
    } else if(action.type === 'CANCEL_TICKET') {
        return balance - action.payload.refundAmount;
    } else return balance;
}

const allReducers = combineReducers({
    ReservationList: updateReservationList,
    Accounts: updateAccounts
});
//Store
const ticketList = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//Dispatch
ticketList.dispatch(bookTicket('Rakesh', 700));
ticketList.dispatch(bookTicket('Ram', 300));
ticketList.dispatch(bookTicket('Mohan', 400));
ticketList.dispatch(cancelTicket(2, 200));

