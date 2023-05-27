import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Stripe from 'react-stripe-checkout';
import Navbar from './Navbar';
import './Payment-Style.css';

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
                <Navbar />
                    <div className='Pay'>
                        <div className="paySteps">
                            <div className='firstStep'>
                                <div className='orderContainer '>
                                    <h1 className='orderNumber'>1</h1><h2>Adresy</h2>
                                </div>
                                <hr></hr>
                                <div className='inputAdress'>
                                    <p>Adresy dostawy</p>
                                    <div className='categoryInput'>
                                        <h3>Imię: </h3>
                                        <input value="imie" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Nazwisko: </h3>
                                        <input value="nazwisko" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Ulica: </h3>
                                        <input value="ulica" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Numer budynku/mieszkania: </h3>
                                        <input value="budynek" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Kod pocztowy: </h3>
                                        <input value="kodpocz" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Miasto: </h3>
                                        <input value="miasto" disabled id='imie' name='imie'/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>Numer telefonu: </h3>
                                        <input value="telefon" disabled id='imie' name='imie'/>
                                    </div>
                                </div>
                                    <button className='nextStep'>
                                        DALEJ
                                    </button>
                                
                                <div className='adressContainer'>
                                    <h1 className='orderNumber'>2</h1><h2>Sposób dostawy</h2>
                                </div>
                                <hr></hr>
                                <div className='inputAdress'>
                                <p>Sposób dostawy</p>
                                    <div className='categoryInput'>
                                        <h3>DHL: </h3>
                                        <input type="radio" value="imie"/>
                                    </div>
                                    <div className='categoryInput'>
                                        <h3>INPOST: </h3>
                                        <input type="radio" value="imie"/>
                                    </div>
                                </div>
                            </div>
                        <Stripe
                            className="paymentButton"
                            stripeKey="pk_test_51MzlNHGpf7NnxYjCcvT588Hm1PqwfRP9r2oX1uNrzoiH47oz0nOuFNOV28meAcwfWtQIg4FsUChoIdOOH7yIzNsH00PF7xfScF"
                            token={handleToken}
                        />
                        </div>
                        <div className='payDetails'>
                            <div className='categoryInput'>
                                <h3>Produkty: </h3>
                                <h2>1szt</h2>
                            </div>
                            <div className='categoryInput'>
                                <h3>Wysylka: </h3>
                                <h2>21,37zł</h2>
                            </div>
                            <hr></hr>
                            <div className='categoryInput'>
                                <h3>Razem: </h3>
                                <h2>21,37zł</h2>
                            </div>
                        </div>

                    </div>







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