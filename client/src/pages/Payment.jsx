import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'
import config from '../config/config'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux';
import { useCreateCheckoutSessionMutation } from '../api/api';

const stripePromise = loadStripe(config.stripe_pk);
function Payment() {
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const clientSecret = useSelector((state) => state.global.clientSecret)
  const payment = useSelector((state) => state.global.payment)

  useEffect(() => {
    (async () => {
      await createCheckoutSession({
        amount: payment.amount,
        description: payment.description,
        name: payment.name,
        quantity: payment.quantity
      }).unwrap();
    })()
  }, [])

  const options = { clientSecret }

  return (
    <div className='h-screen text-center bg-white py-16 overflow-y-scroll'>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout className='h-full' />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Payment