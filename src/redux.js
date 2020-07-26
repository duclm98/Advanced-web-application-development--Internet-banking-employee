import instance from "./services/AxiosServices";

export const accountAction = {
    getAccount: (accountNumberFromBody) => async _ => {
        const accountNumber = accountNumberFromBody ? accountNumberFromBody : "0000000000000";
        try {
            const {
                data
            } = await instance.get(
                `employees/accounts/${accountNumber}`
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
    getAccounts: () => async dispatch => {
        try {
            const {
                data
            } = await instance.get(`employees/accounts`);
            dispatch({
                type: 'GET_ACCOUNTS',
                payload: data
            })
            return {
                status: true,
                data
            }
        } catch (error) {}
    },
    createAccount: (account) => async dispatch => {
        try {
            const {
                data
            } = await instance.post(`employees/accounts`, account);
            dispatch({
                type: 'CREATE_ACCOUNT_SUCCESS',
                payload: data
            })
            return {
                status: true,
                data
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    }
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
    if (action.type === 'GET_ACCOUNTS') {
        return {
            ...state,
            accounts: action.payload
        }
    } else if (action.type === "CREATE_ACCOUNT_SUCCESS") {
        return {
            ...state,
            accounts: [...state.accounts, action.payload]
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