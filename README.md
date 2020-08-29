# Ứng dụng internet banking, phân hệ nhân viên
## Cách cài đặt và khởi chạy
### Môi trường local (development)
1. npm install
2. npm run dev
### Môi trường production (Heroku)
1. npm install
2. npm run build
3. serve -s build
### Môi trường production (Jenkins)
1. npm install pm2 -g
2. npm install
3. BUILD_ID=Internet_Banking_Employee pm2 restart internet_banking_employee || BUILD_ID=Internet_Banking_Employee pm2 start 'npm run jenkins' --name internet_banking_employee
## URL
### Môi trường production (Heroku): https://internet-banking-employee.herokuapp.com/
### Môi trường production (Jenkins): http://34.92.149.125:3002
## Tài khoản demo
1. Username: employee
2. Password: 90446
