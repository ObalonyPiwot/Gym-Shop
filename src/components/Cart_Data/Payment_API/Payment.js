import React from 'react';
import Stripe from 'react-stripe-checkout';
import Navbar from '../../Navbar';
import './Payment-Style.css';
import { useState } from 'react';

const Payment = (props) => {
    const [selectedOption, setSelectedOption] = useState('dhl');
    const [paymentData, setPaymentData] = useState({
        name: '',
        surname: '',
        street: '',
        houseNr: '',
        postCode: '',
        city: '',
        phone: ''
    })

    const __handleRadioChange = (_event_) => {
        setSelectedOption(_event_.target.value);
    }
    const __handleInputChange = (_event_) => {
        const {name, value} = _event_.target;
        setPaymentData( (_prevData) => ({
            ..._prevData,
            [name]: value
        }));
        console.log(paymentData);
    }
    async function handleToken(token) {
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

    function __validatePayment(event) {
        event.preventDefault();

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
                            <div class="form__group field ">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="name"
                                    value={paymentData.name}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="name" class="form__label">Imie</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="surname"
                                    value={paymentData.surname}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="surname" class="form__label">Nazwisko</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="street"
                                    value={paymentData.street}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="street" class="form__label">Ulica</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="houseNr"
                                    value={paymentData.houseNr}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="houseNr" class="form__label">Numer Budynku/mieszkania</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="postCode"
                                    value={paymentData.postcode}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="postcode" class="form__label">Kod pocztowy</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="city"
                                    value={paymentData.city}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="city" class="form__label">Miasto</label>
                            </div>
                            <div class="form__group field">
                                <input
                                    type="input"
                                    class="form__field"
                                    placeholder="Name"
                                    name="phone"
                                    value={paymentData.phone}
                                    onChange={__handleInputChange}
                                    required
                                />
                                <label for="phone" class="form__label">Telefon</label>
                            </div>
                        </div>


                        <div className='adressContainer'>
                            <h1 className='orderNumber'>2</h1><h2>Sposób dostawy</h2>
                        </div>
                        <hr></hr>
                        <div className='inputAdress'>
                            <p>Sposób dostawy</p>
                            <form action="">
                                <label class="form-control">
                                    <input
                                        type="radio"
                                        name="radio"
                                        value="dhl"
                                        checked={selectedOption === 'dhl'}
                                        onChange={__handleRadioChange}
                                    />
                                    DHL
                                </label>

                                <label class="form-control">
                                    <input
                                        type="radio"
                                        name="radio"
                                        value="inpost"
                                        checked={selectedOption === 'inpost'}
                                        onChange={__handleRadioChange}
                                    />
                                    InPost
                                </label>
                            </form>
                        </div>
                        <button className='nextStep' onClick={() => __validatePayment()}>
                            DALEJ
                        </button>
                    </div>

                </div>
                <div className='payDetails'>
                    <div className='categoryInput'>
                        <h3>Produkty: </h3>
                        <h2>{props.products.count} szt.</h2>
                    </div>
                    <hr></hr>
                    <div className='categoryInput'>
                        <h3>Razem: </h3>
                        <h2>{props.products.result} zł</h2>
                    </div>
                    <hr></hr>
                    <div className='categoryInput payButton'>
                        <Stripe
                            className="paymentButton"
                            stripeKey="pk_test_51MzlNHGpf7NnxYjCcvT588Hm1PqwfRP9r2oX1uNrzoiH47oz0nOuFNOV28meAcwfWtQIg4FsUChoIdOOH7yIzNsH00PF7xfScF"
                            token={handleToken}
                        />
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