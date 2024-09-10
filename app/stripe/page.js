import Script from "next/script";

import StripeButton from "@/components/stripe-trial";

export default function Stripe() {
  return (
    <div className="mt-96 ml-96">
      <Script async src="https://js.stripe.com/v3/buy-button.js" />
      <main>
        <StripeButton />
        <div>
            <a target="_blank" href="https://buy.stripe.com/test_8wMbJM5W75CAbbqfYZ?locale=en-GB">
                Buy Now
            </a>
        </div>
      </main>
    </div>
  );
}
