import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publKey =
    "pk_test_51HNgXZFwKLx5LVPOM4TpjO5cWQubObrZ1LwLbhHv9m7dr6CqeqWUXwWl5Dxw3NaVKu9xCKcGRVHRPyB0NLb8FUUq00X6CbVhE2";

  const onToken = (token) => {
    console.log(token);
    alert("Payment was successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN CLOTHING"
      billingAddress
      shoppingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}$`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publKey}
    />
  );
};

export default StripeCheckoutButton;
