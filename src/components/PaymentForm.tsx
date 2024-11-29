import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { discount_value } from '../utilities/formatCurrency'

type CartItem = {
  id: number
  quantity: number
  amount: number
  marketing_statement: string, 
  product_price: number, 
  product_discount: number, 
  image: string
}

type FormProps = {
  items: CartItem[],
  currentUserId: {}
}

const PaymentForm = ({items, currentUserId}:FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>('');
  const [isProcessing, setIsProcessing] = useState<Boolean>(false);
  console.log(items)

  const itemTotals = items.map(item => {
    const { product_price, product_discount, quantity } = item;
    let value = discount_value(product_price, product_discount)
    return value *quantity;
  })

  const grandTotal = itemTotals.reduce((acc, total) => acc + total, 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if(!stripe || !elements){
      setMessage("Stripe is not ready")
      return;
    }

    if(!grandTotal || grandTotal <= 0){
      setMessage("Please enter a valid amount.");
    }

    setIsProcessing(true);

    try {
      const response = await fetch("https://sneaker-api-new.onrender.com/payments/create_payment_intent", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ amount: grandTotal, currency: 'usd', currentUserId: currentUserId }),
      });
      console.log(response)
      const { client_secret } = await response.json()
      console.log(client_secret)

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!
        },
      });

      if(result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      }else if (result.paymentIntent?.status === "succeeded"){
        setMessage("Payment successful!")
      }
    }catch(error: any){
      setMessage(`Error: ${error.message}`);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='amount'>Amount (in USD): </label>
        <input 
          type="number"
          id="amount" 
          value={grandTotal}
          placeholder='Enter amount'
          required
        />
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
          }
        }} 
        />
        <button type="submit">
          {isProcessing ? "Processing..." : "Pay"}
        </button>
        {message && <div>{message}</div>}
    </form>
  )
  
}

export default PaymentForm;