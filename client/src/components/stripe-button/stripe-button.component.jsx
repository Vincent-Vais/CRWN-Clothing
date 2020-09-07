import React from "react";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HNgXZFwKLx5LVPOM4TpjO5cWQubObrZ1LwLbhHv9m7dr6CqeqWUXwWl5Dxw3NaVKu9xCKcGRVHRPyB0NLb8FUUq00X6CbVhE2";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment Succesful!");
        console.log(response);
      })
      .catch((error) => {
        alert("Payment Error! Please make sure you use provided credit card");
        console.log(error);
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
