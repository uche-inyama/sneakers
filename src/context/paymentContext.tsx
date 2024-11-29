import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';


const publishableKey = import.meta.env.VITE_Publishable_Key
const stripePromise = loadStripe(publishableKey)
console.log(stripePromise)
console.log(publishableKey)

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}

export default Payment;