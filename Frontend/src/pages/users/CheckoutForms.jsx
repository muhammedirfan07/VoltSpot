import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51R2tErRZxoXS9LqVZoqMif8tyX8KO34xdcbHB7ql9mZOhgXnNLOQkBUDUHbndfxGf9jKKmice2iNdhSsp27JpL2e00zduaUSDC");

const CheckoutForms = () => {
  console.log("inside the Checkot form");
  const {sessionId}=useParams()
  
  useEffect(() => {
    const redirectToStripeCheckout = async () => {
      console.log("redirectToStripeCheckout");
      
      console.log("Session ID:", sessionId);
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error);
      }
    };

    // if (sessionId) {
    //   redirectToStripeCheckout();
    // }
    redirectToStripeCheckout();
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to Stripe Checkout...</h1>
        <p className="text-lg">Please wait while we process your payment.</p>
      </div>
    </div>
  );
};

export default CheckoutForms;