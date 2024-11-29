import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useSessionsContext } from '../context/SessionContext';

const publishableKey = import.meta.env.VITE_Publishable_Key
const stripePromise = loadStripe(publishableKey)
console.log(stripePromise);
console.log(publishableKey);

const Payment: React.FC = () => {
  const {  items } = useShoppingCart();
  const { currentUser } = useSessionsContext();

  return (
    <Elements stripe={stripePromise}>
     { currentUser && <PaymentForm items={items} currentUserId={currentUser.id}/>}
    </Elements>
  )
}

export default Payment;