import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Donation() {
  const publishableKey =
    "pk_test_51NUqoFLYUQiI92n9dfGz5bM3Lf9mdUHrvLKzG36ANJQmXSk0EoZZHpsDYErryZJCAVLSrV067H9CcFis5DPq7WqS00aYg6c4MZ";
  const [donate, setDonate] = useState({
    name: "Thank you for your generosity!",
    price: 5,
  });
  const priceForStripe = donate.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:3000/payment",
        method: "post",
        data: {
          amount: donate.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Help Us Grow</h2>
      <p>{donate.name}</p>
      <p>${donate.price}</p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${donate.price}`}
        token={payNow}
      />
    </div>
  );
}

export default Donation;
