import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";

import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";

const CheckoutForm = ({ onPaymentSuccess, onPaymentCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const savings = subtotal - total;

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      // Create PaymentIntent
      const { data } = await axios.post(
        "/payments/create-payment-intent",
        { products: cart, couponCode: coupon?.code || null },
        { withCredentials: true }
      );

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setError(result.error.message);
        if (result.error.type === "card_error" || result.error.type === "validation_error") {
          onPaymentCancel?.();
        }
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // Clear cart locally
        clearCart();

        // Fetch last completed order from backend
        const { data: orderData } = await axios.get("/orders/last", { withCredentials: true });

        onPaymentSuccess?.(orderData.order);
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred. Please try again.");
      onPaymentCancel?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-primary/90 border-4 border-accent rounded-2xl  p-6 lg:h-full text-secondary">
      <div className="space-y-4">
        <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold">{t("cart.checkout.title")}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs lg:text-sm 2xl:text-base">
            <span>{t("cart.checkout.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between text-accent-content text-xs lg:text-sm 2xl:text-base">
              <span>{t("cart.checkout.discount")}</span>
              <span>- ${savings.toFixed(2)}</span>
            </div>
          )}

          {coupon && isCouponApplied && (
            <div className="flex justify-between text-xs lg:text-sm 2xl:text-base">
              <span>{t("cart.checkout.coupon")} ({coupon.code})</span>
              <span>- ${((subtotal * coupon.discountPercentage) / 100).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm lg:text-base 2xl:text-lg font-bold border-t border-gray-700 pt-2">
            <span>{t("cart.checkout.total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4">
          <CardElement
            options={{
              style: {
                base: { color: "#fff", fontSize: "16px", "::placeholder": { color: "#D4AF37" } },
                invalid: { color: "#f87171" },
              },
            }}
          />
          {error && <p className="text-red-400 mt-2 text-base lg:text-lg 2xl:text-xl">{error}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="w-full py-3 bg-accent/80 hover:bg-accent text-sm lg:text-base 2xl:text-lg rounded-lg text-accent-content font-semibold transition-shadow shadow-md shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? t("cart.checkout.loading") : t("cart.checkout.btnCheckout")}
          {loading && <span className="animate-spin">⏳</span>}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
