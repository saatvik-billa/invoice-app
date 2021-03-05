import '@babel/polyfill';
import { test } from './dashboard';

console.log('hello from parcel');

const login = document.getElementById('admin-login');
const invoice_check = document.getElementById('check-invoice');

if (login) {
    login.addEventListener('submit', e => {
        e.preventDefault(); 
        const us = document.getElementById('us').value; 
        const pw = document.getElementById('pw').value;
        if (us === 'username' && pw === 'password') {
            window.setTimeout(() => {
                location.assign('/dashboard')
                document.getElementById('us').value = '';
                document.getElementById('pw').value = '';
            }, 1500);
        }
        else {
            document.getElementById('us').value = '';
            document.getElementById('pw').value = '';
            window.alert('Wrong US and/or PW 🙄');
        };
    });
};

if (invoice_check) {
    invoice_check.addEventListener('submit', e => {
        e.preventDefault(); 
        const num = document.getElementById('invoice-num').value;
        window.setTimeout(() => {
            location.assign(`/invoice-details/${num}/`)
            document.getElementById('invoice-num').value = '';
        }, 1500);
    });
};