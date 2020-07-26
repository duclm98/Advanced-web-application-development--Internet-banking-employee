import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Table from "./Table.js";

import { accountAction } from "../../redux";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const Customer = ({ dispatch, accounts }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    email: "",
    accountName: "",
    phone: "",
    address: "",
  });
  const [msg, setMsg] = useState("");
  const [accountGetting, setAccountGetting] = useState(false);

  useEffect(() => {
    if (!accountGetting) {
      dispatch(accountAction.getAccounts());
      setAccountGetting(true);
    }
  }, [accountGetting]);

  const handleCreateAccount = async () => {
    const createAccount = await dispatch(accountAction.createAccount(input));
    if (createAccount.status === false) {
      return setMsg(createAccount.msg);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Quản lý tài khoản khách hàng
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tên khách hàng (chữ in không dấu)"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.accountName}
                    onChange={(event) => {
                      const accountName = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        accountName,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Địa chỉ email"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.email}
                    onChange={(event) => {
                      const email = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        email,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Số điện thoại"
                    id="phone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.phone}
                    onChange={(event) => {
                      const phone = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        phone,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Địa chỉ"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.address}
                    onChange={(event) => {
                      const address = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        address,
                      }));
                    }}
                  />
                  <h6 style={{ color: "red" }}>{msg}</h6>
                  <Button color="primary" onClick={handleCreateAccount}>
                    Tạo tài khoản
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <Table
                    rows={accounts || []}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps)(Customer);
