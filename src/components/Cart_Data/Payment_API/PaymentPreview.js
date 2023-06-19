import React, { useState } from 'react';
import { getCookie, checkCookieExists } from "../../../CookieFunction";
import { useAlert } from "react-alert";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import exit from "../../../assets/exit.png";
import { useNavigate } from 'react-router-dom';
import './Payment-Style.css';
import './PaymentPreview.css'
import Stripe from 'react-stripe-checkout';
import { updateDataTransaction } from '../../API_Communication/CartDataAPI';

//const stripePromise = loadStripe('pk_test_51MzlNHGpf7NnxYjCcvT588Hm1PqwfRP9r2oX1uNrzoiH47oz0nOuFNOV28meAcwfWtQIg4FsUChoIdOOH7yIzNsH00PF7xfScF');

function PaymentPreview({ item, closePreview }) {
    const _alert = useAlert();
    const _navigate = useNavigate();

    async function handleToken(token) {
        fetch('http://localhost/api/payment/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token.id,
                'amount': item.cena
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
                    updateDataTransaction("T", item.id)
                    setTimeout(() => {
                        _navigate('/');
                    }, 500)
                } else {
                    updateDataTransaction("F", item.id);
                    throw new Error('Wystąpił błąd podczas przetwarzania płatności.');
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className="inspectBlog">
            <div className='content3'>
                <div className="previewContent">
                    <div className='payDetails payPreviewDetail'>
                        <div className="zamkniecie" onClick={() => closePreview(0)}>
                            <img src={exit} alt="exit" />
                        </div>
                        <div className='categoryInput'>
                            <h3>Produkty: </h3>
                            <h2>{item.ilosc} szt.</h2>
                        </div>
                        <hr></hr>
                        <div className='categoryInput'>
                            <h3>Razem: </h3>
                            <h2>{item.cena} zł</h2>
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
            </div>
        </div>
    )
}

export default PaymentPreview;