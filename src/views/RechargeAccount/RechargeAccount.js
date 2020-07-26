import React, { useState, useEffect } from "react";
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

const RechargeAccount = ({ dispatch }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    accountNumber: "",
    accountName: "",
    money: null,
  });

  useEffect(() => {
    const setAccountName = async () => {
      const account = await dispatch(
        accountAction.getAccount(input.accountNumber)
      );
      if (account.status) {
        if (account.data.accountName) {
          setInput((prev) => ({
            ...prev,
            accountName: account.data.accountName,
          }));
        } else {
          setInput((prev) => ({
            ...prev,
            accountName: "",
          }));
        }
      }
    };
    setAccountName();
  }, [input.accountNumber]);

  const handleRechargeIntoAccounnt = async () => {};

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Nạp tiền vào tài khoản khách hàng
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Số tài khoản"
                    id="account"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.accountNumber}
                    onChange={(event) => {
                      const accountNumber = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        accountNumber,
                      }));
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <CustomInput
                    labelText="Tên tài khoản"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={input.accountName}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Số tiền cần nạp"
                    id="money"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    type="number"
                    value={input.money}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleRechargeIntoAccounnt}>
                Nạp tiền vào tài khoản
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default connect()(RechargeAccount);
