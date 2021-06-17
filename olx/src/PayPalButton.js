import { Component, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
import { useHistory } from "react-router";
import { BorderedDiv } from "./HeartButton";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "./Loading";

export default function PayPalButtons(props) {
  const { price, adId, userId } = props;

  const userID = useSelector((state) =>
    state.currentUser ? state.currentUser.uid : null
  );

  function post() {
    fetch("http://164.90.162.213:3000/purchases", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data()),
    }).then((res) => history.push("/"))
  }

  function data() {
    return {
      UserSso: userID,
      AdId: adId,
      Paid: true,
    };
  }

  const history = useHistory();
  return (
    <LoadingWrapper pending={false}>
      <BorderedDiv
        style={{
          minWidth: "150px",
          width: "70%",
        }}
      >
        <h5 style={{ margin: ".5em" }}>Kup teraz</h5>
        <PayPalButton
          {...props}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                    currency:"PLN"
                  },
                },
              ],
            });
          }}
          onSuccess={(details, data) => {
            post()
          }}
        />
      </BorderedDiv>
    </LoadingWrapper>
  );
}
