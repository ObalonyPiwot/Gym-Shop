import React from 'react';
import Stripe from 'react-stripe-checkout';
import Navbar from '../../Navbar';
import './Payment-Style.css';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { deleteDataFromSession, insertDataTransaction } from '../../API_Communication/CartDataAPI';
import { getCookie } from '../../../CookieFunction';

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
    const [promoCode, setDiscountCode] = useState ('');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const _alert = useAlert();
    const [isPromoCodeVisible, setPromoCodeVisible] = useState(false);

    // - for move to home after succesful payment
    const _navigate = useNavigate();

    const __handleRadioChange = (_event_) => {
        setSelectedOption(_event_.target.value);
    }
    const __handleInputChange = (_event_) => {
        const { name, value } = _event_.target;
        setPaymentData((_prevData) => ({
            ..._prevData,
            [name]: value
        }));
        console.log(paymentData);
    }

    const __handleInputDiscountChange = (_event_) =>{
        setDiscountCode(_event_.target.value);
    }

    const togglePromoCode = () => {
        setPromoCodeVisible(!isPromoCodeVisible);
    };

    async function handleToken(token) {
        fetch('http://localhost/api/payment/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token.id,
                'amount': props.products.result
            },
            body: JSON.stringify({
                email: 'example@example.com',
                currency: 'pln',
                name: 'Example Name',
                description: 'Example Description',
                userData: getCookie("USER_DATA")
            })
        })
            .then(response => {
                if (response.ok) {
                    _alert.success("Płatność została pomyślnie przetworzona");
                    insertDataTransaction("T", props.products.result);
                    setTimeout(() => {
                        deleteDataFromSession();
                        _navigate('/');
                    }, 500)
                } else {
                    insertDataTransaction("F", props.products.result);
                    throw new Error('Wystąpił błąd podczas przetwarzania płatności.');
                }
            })
            .catch(error => alert(error.message));
    }

    function __validatePayment(event) {
        setIsButtonDisabled(true);
        event.preventDefault();

        const validationErrors = {};
        let hasErrors = false;

        Object.keys(paymentData).forEach((field) => {
            if (paymentData[field].trim() === '') {
                validationErrors[field] = `Pole ${field.charAt(0).toUpperCase() + field.slice(1)} jest wymagane`;
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsButtonDisabled(false);
        console.log(paymentData);

    }

    const handlePromoCode = (e) =>{
        fetch("http://localhost/discountCode/checkIfExists/"+promoCode, {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {
            if(!isNaN(data))
            {
                props.setTotal(data);
                togglePromoCode();
            }
        })
        e.preventDefault();

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
                            {Object.keys(paymentData).map((field) => (
                                <div className={`form__group field ${errors[field] ? 'highlight' : ''}`} key={field}>
                                    <input
                                        type="input"
                                        className="form__field"
                                        placeholder="Name"
                                        name={field}
                                        value={paymentData[field]}
                                        onChange={__handleInputChange}
                                        required
                                    />
                                    {errors[field] && <p className="error-message">{errors[field]}</p>}
                                    <label htmlFor={field} className="form__label">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <div className='adressContainer'>
                            <h1 className='orderNumber'>2</h1><h2>Sposób dostawy</h2>
                        </div>
                        <hr></hr>
                        <div className='inputAdress'>
                            <p>Sposób dostawy</p>
                            <form action="">
                                <label className="form-control">
                                    <input
                                        type="radio"
                                        name="radio"
                                        value="dhl"
                                        checked={selectedOption === 'dhl'}
                                        onChange={__handleRadioChange}
                                    />
                                    DHL
                                </label>

                                <label className="form-control">
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
                        <button className='nextStep' type="button" onClick={__validatePayment}>
                            Dalej
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
                    <div className="categoryInput center discountCode">
                        <a href="#" onClick={togglePromoCode}>
                            {isPromoCodeVisible ? 'Zamknij' : 'Masz kod rabatowy?'}
                        </a>
                    </div>

                    {isPromoCodeVisible && (
                        <div className="promo-code logging" id="promo-code">
                            <div className="form-Input">
                                <input
                                    className="promo-input"
                                    type="text"
                                    name="discount_name"
                                    placeholder="Kod rabatowy"
                                    onChange={__handleInputDiscountChange}
                                />
                                <button type="submit" className="btnPromo" onClick={handlePromoCode}>
                                    Dodaj
                                </button>
                            </div>
                        </div>
                    )}
                    <div className='categoryInput payButton'>
                        <Stripe
                            disabled={isButtonDisabled}
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