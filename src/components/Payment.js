import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Stripe from 'react-stripe-checkout';

const Payment = (props) => {

    async function handleToken(token) {
        console.log(token);
        fetch('http://localhost/api/payment/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token.id,
                'amount': 500
            },
            body: JSON.stringify({
                email: 'example@example.com',
                currency: 'usd',
                name: 'Example Name',
                description: 'Example Description'
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('Płatność została pomyślnie przetworzona.');
                } else {
                    throw new Error('Wystąpił błąd podczas przetwarzania płatności.');
                }
            })
            .catch(error => alert(error.message));
        }
        return (
            <div className="App">
                <Stripe
                    stripeKey="pk_test_51MzlNHGpf7NnxYjCcvT588Hm1PqwfRP9r2oX1uNrzoiH47oz0nOuFNOV28meAcwfWtQIg4FsUChoIdOOH7yIzNsH00PF7xfScF"
                    token={handleToken}
                />
                {/* <h1>Platnosc</h1>
            <StripeCheckout
                token={this.handleToken}
                stripeKey="pk_test_51MzlNHGpf7NnxYjCcvT588Hm1PqwfRP9r2oX1uNrzoiH47oz0nOuFNOV28meAcwfWtQIg4FsUChoIdOOH7yIzNsH00PF7xfScF"
                amount={1000} // kwota w centach
                currency="PLN"
                name="GymShop"
                description="Opis produktu"
                image="https://placekitten.com/100/100"
            >
                <button>Zapłać</button>
                <button onClick={() => props.onFormSwitch('cart')}>Cofnij do koszyka</button>
            </StripeCheckout> */}
            </div>      
    );
}


export default Payment;