import * as localStorageVariable from "./variables/LocalStorage";
import instance from "./services/AxiosServices";

// Lấy lại access token sau mỗi 9 phút (vì thời gian tồn tại tối đa của access token la 10 phút)
const getRefreshToken = async () => {
    instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
        localStorageVariable.storeAccessToken
    );
    try {
        const {
            data
        } = await instance.post("employees/refresh", {
            refreshToken: localStorage.getItem(
                localStorageVariable.storeRefreshToken
            ),
        });
        localStorage.setItem(
            localStorageVariable.storeAccessToken,
            data.accessToken
        );
    } catch (error) {
        console.log("Không tìm thấy access token mới.");
    }
};
getRefreshToken();
setInterval(getRefreshToken, 540000);

export const employeeAction = {
    login: (account) => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );

        try {
            const {
                data
            } = await instance.post("employees/login", account);

            localStorage.setItem(
                localStorageVariable.storeAccessToken,
                data.accessToken
            );
            localStorage.setItem(
                localStorageVariable.storeRefreshToken,
                data.refreshToken
            );
            localStorage.setItem(
                localStorageVariable.storeEmployee,
                JSON.stringify(data.employee)
            );

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data,
            });

            return {
                status: true
            }
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data;
            }

            return {
                status: false,
                msg
            }
        }
    },
    logout: () => (dispatch) => {
        localStorage.clear();

        dispatch({
            type: "LOGOUT",
        });
    },
}

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
    accessToken: localStorage.getItem(localStorageVariable.storeAccessToken),
    refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken),
    employee: localStorage.getItem(localStorageVariable.storeEmployee),
    accounts: [],
    transactionHistory: {
        moneyReceivingTransactions: [],
        moneySendingTransactions: [],
        debtRemindersTransactions: []
    }
};

export default (state = initialState, action) => {
    // Reducer cho employee action
    if(action.type==='LOGIN_SUCCESS'){
        return {
            ...state,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            employee: action.payload.employee
        };
    } else if (action.type === "LOGOUT") {
        return {
            ...state,
            accessToken: null,
            refreshToken: null,
            employee: null,
        };
    }
    // Reducer cho account action
    else if (action.type === 'GET_ACCOUNTS') {
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