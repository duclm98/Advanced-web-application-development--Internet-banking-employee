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
    rechargeIntoAccount: (accountNumber, money) => async _ => {
        try {
            const {
                data
            } = await instance.post(`employees/recharge-into-account`, {
                accountNumber,
                money
            });
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
    },
    getTransactionHistories: (accountNumberFromBody) => async dispatch => {
        const accountNumber = accountNumberFromBody ? accountNumberFromBody : "0000000000000";
        const moneyReceivingTransactions = await instance.get(
            `employees/transactions/money-receiving/${accountNumber}`
        );
        const moneySendingTransactions = await instance.get(
            `employees/transactions/money-sending/${accountNumber}`
        );
        const debtRemindersTransactions = await instance.get(
            `employees/transactions/payment-debt-reminders/${accountNumber}`
        );
        dispatch({
            type: "TRANSACTION_HISTORY",
            payload: {
                moneyReceivingTransactions: moneyReceivingTransactions.data,
                moneySendingTransactions: moneySendingTransactions.data,
                debtRemindersTransactions: debtRemindersTransactions.data
            }
        });
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
    else if (action.type === 'TRANSACTION_HISTORY') {
        return {
            ...state,
            transactionHistory: {
                moneyReceivingTransactions: action.payload.moneyReceivingTransactions,
                moneySendingTransactions: action.payload.moneySendingTransactions,
                debtRemindersTransactions: action.payload.debtRemindersTransactions
            }
        }
    }
    return state;
};