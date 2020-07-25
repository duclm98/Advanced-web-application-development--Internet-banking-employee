import instance from "./services/AxiosServices";

export const accountAction = {
    getAccount: (accountNumberFromBody) => async dispatch => {
        const accountNumber = accountNumberFromBody ? accountNumberFromBody : "0000000000000";
        try {
            const {
                data
            } = await instance.get(
                `accounts/accountNumber/${accountNumber}`
            );
            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
};

export const transactionAction = {
    getMoneyReceivingTransaction: () => async dispatch => {
        try {
            const {
                data
            } = await instance.get(
                `transactions/money-receiving`
            );
            dispatch({
                type: "GET_MONEY_RECEIVING_TRANSACTION",
                payload: data,
            });
        } catch (error) {}
    },
    getMoneySendingTransaction: () => async dispatch => {
        try {
            const {
                data
            } = await instance.get(
                `transactions/money-sending`
            );
            dispatch({
                type: "GET_MONEY_SENDING_TRANSACTION",
                payload: data,
            });
        } catch (error) {}
    },
    getDebtRemindersTransaction: () => async dispatch => {
        try {
            const {
                data
            } = await instance.get(
                `transactions/payment-debt-reminders`
            );
            dispatch({
                type: "GET_DEBT_REMINDERS_TRANSACTION",
                payload: data,
            });
        } catch (error) {}
    },
};

const initialState = {
    accounts: [],
    transactionHistory: {
        moneyReceivingTransactions: [],
        moneySendingTransactions: [],
        debtRemindersTransactions: []
    }
};

export default (state = initialState, action) => {
    // Reducer cho account action
    if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
        };
    }

    // Reducer cho transaction action
    else if (action.type === 'GET_MONEY_RECEIVING_TRANSACTION') {
        console.log(action.payload.data)
        return {
            ...state,
            transactionHistory: {
                moneyReceivingTransactions: action.payload
            }
        }
    } else if (action.type === 'GET_MONEY_SENDING_TRANSACTION') {
        return {
            ...state,
            transactionHistory: {
                moneySendingTransactions: action.payload
            }
        }
    } else if (action.type === 'GET_DEBT_REMINDERS_TRANSACTION') {
        return {
            ...state,
            transactionHistory: {
                debtRemindersTransactions: action.payload
            }
        }
    }
    return state;
};