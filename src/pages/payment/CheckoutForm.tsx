import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been initialized.");
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "An unknown error occurred");
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      setErrorMessage(error.message!);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" disabled={!stripe || !elements}>
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
