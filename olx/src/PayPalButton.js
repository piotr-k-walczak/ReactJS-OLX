import { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import React from "react"
import { useHistory } from "react-router";

export default function PayPalButtons(props) {
    const history = useHistory()
    return (
      <PayPalButton
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "49.99",
            }
          }],
        });
      }}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          history.push("/")
        }}
      />
    );
}