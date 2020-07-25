/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Create from "@material-ui/icons/CreateOutlined";
import History from "@material-ui/icons/HistoryOutlined";
import Add from "@material-ui/icons/Add";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import CustomersListPage from 'views/CustomersList/CustomersList.js';
import CustomerCreationPage from 'views/CustomerCreation/CustomerCreation.js';
import RechargeAccountPage from 'views/RechargeAccount/RechargeAccount.js';
import TransactionHistoryPage from 'views/TransactionHistory/TransactionHistory.js';

const dashboardRoutes = [
  {
    path: "/customers-list",
    name: "Danh sách khách hàng",
    icon: LibraryBooks,
    component: CustomersListPage,
  },
  {
    path: "/customer-creation",
    name: "Taọ tài khoản khách hàng",
    icon: Create,
    component: CustomerCreationPage,
  },
  {
    path: "/recharge-account",
    name: "Nạp tiền vào tài khoản",
    icon: Add,
    component: RechargeAccountPage,
  },
  {
    path: "/transaction-history",
    name: "Lịch sử giao dịch",
    icon: History,
    component: TransactionHistoryPage,
  }
];

export default dashboardRoutes;
