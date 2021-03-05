import axios from 'axios';

const home = document.getElementById('home');
const new_invoice = document.getElementById('new-invoice');
const new_cust = document.getElementById('new-customer');
const customer_list = document.getElementById('customer-list');
const paid_invoices = document.getElementById('paid-invoices');

const getColor = (date_paid, status) => {
    if (date_paid) return 'Blue'
    else if (status === 'Active') return 'green'
    else if (status === 'Not Active') return 'red'
};

if (home) {
    home.addEventListener('click', async () => {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/invoices'
        });
        
        let html = `<h2>Invoices</h2>`;
        let ids = [];

        res.data.data.doc.forEach((el, i) => {
            html += `
            <div class="row invoice-item" id="item-${el.number}">
                <div class="col span-1-of-4"> ${el.customer.name}</div>
                <div class="col span-1-of-4"> ${el.reason ? el.reason : 'No reason provided'} </div>
                <div class="col span-1-of-4"> $${el.balance_due} </div>
                <div class="col span-1-of-4"> <span style="color:${getColor(el.date_paid, el.status)}";>${el.date_paid ? 'Paid' : el.status}</span> </div>
            </div>`;
            ids.push(`item-${el.number}`)
        });

        document.querySelector('.viewing-box').innerHTML = html; 

        ids.forEach(el => {
            const num = el.split('-')[1];
            document.querySelector(`#${el}`).addEventListener('click', () => {
                window.setTimeout(() => {
                    location.assign(`/invoice-details/${num}/`)
                }, 1500);
            });
        });
    });
};

if (new_invoice) {
    new_invoice.addEventListener('click', async () => {
        let cust_names = '';
        const allCustomers = await axios({
            method: 'GET',
            url: 'api/v1/customers'
        });
        allCustomers.data.data.doc.forEach(el => {
            cust_names += `<option value="${el.name}">${el.name}</option>`;
        });
        
        let newItem = `
            <h3><u>New Item</u></h3>
            <label for="description" id="description"><h3>Description: </h3></label>
            <textarea id="description" name="description"></textarea>
            <label for="amount"><h3>Unit Price: </h3></label>
            <input type="text" id="amount" name="amount">
            <label for="quantity"><h3>Quantity: </h3></label>
            <input type="text" id="quantity" name="quantity">`;
        let wholeHTML = `
            <h2>New Invoice</h2>
            <form action="#" id="invoice-form">
                <div class="invoice-form">
                    <label for="customers"><h3>Bill To: </h3></label>
                    <select name="customers" id="customers">
                    ${cust_names}
                    </select>
                    <label for="date"><h3>Due Date: </h3></label>
                    <input type="date" id="date" name="date">
                    <label for="reason"><h3>Reason for Billing: </h3></label>
                    <input type="reason" id="reason" name="reason">
                    ${newItem}
                </div>
                <button name="item-button" id="item-button" type="button">Add another item</button>
                <button name="invoice-button" class="submit-button" type="submit">Create Invoice</button>
            </form>`;
        document.querySelector('.viewing-box').innerHTML = wholeHTML; 
        document.getElementById('item-button').addEventListener('click', () => {
            document.querySelector('.invoice-form').insertAdjacentHTML('beforeend', newItem); 
        });
        
        let invoice_form = document.getElementById('invoice-form');
        invoice_form.addEventListener('submit', async e => {
            e.preventDefault(); 
            let values = Array.from(invoice_form.elements).map(el => el.value);
            values.pop(); values.pop();
            const [customer, due_date, reason, ...items] = values; 
    
            let formatted_items = [];
            let balance_due = 0;
            for (let i=0; i < items.length; i += 3) {
                const [description, amount, quantity] = [items[i], parseFloat(items[i+1]), parseFloat(items[i+2])];
                balance_due += amount * quantity * 1.0825; 
                formatted_items.push({description, amount, quantity});
            };
    
            const res = await axios({
                method: 'POST',
                url: 'api/v1/invoices',
                data: {
                    customer,
                    due_date,
                    reason,
                    items: formatted_items,
                    balance_due: balance_due.toFixed(2)
                }
            });
    
            document.getElementById('customers').value = 'A';
            ['description', 'amount', 'quantity', 'date'].forEach(element => {
                Array.from(document.getElementsByName(element)).forEach(el => el.value = '');
            });
    
            document.querySelector('.viewing-box').innerHTML = wholeHTML;
        });
    });
};

if (new_cust) {
    new_cust.addEventListener('click', () => {
        let html = `
            <h2>New Customer</h2>
            <form action="#" class="customer-form">
                <label for="name"><h3>Name: </h3></label>
                <input type="text" id="name" name="name">
                <label for="mail"><h3>Email: </h3></label>
                <input type="text" id="mail" name="mail">
                <label for="address"><h3>Street Address: </h3></label>
                <input type="text" id="address" name="address">
                <label for="city"><h3>City: </h3></label>
                <input type="text" id="city" name="city">
                <label for="state"><h3>State: </h3></label>
                <input type="text" id="state" name="state">
                <label for="country"><h3>Country: </h3></label>
                <input type="text" id="country" name="country">
                <label for="zip"><h3>Zipcode: </h3></label>
                <input type="text" id="zip" name="zip" maxlength="5">
                <button name="request-button" class="submit-button" type="submit">Create Customer</button>
            </form>`;
        
        document.querySelector('.viewing-box').innerHTML = html;

        let customer_form = document.querySelector('.customer-form');
        customer_form.addEventListener('submit', async e => {
            e.preventDefault();
            let values = Array.from(customer_form.elements).map(el => el.value);
            values.pop();
            const [name, email, street_address, city, state, country, zipcode] = values;
            
            const res = await axios({
                method: 'POST',
                url: 'api/v1/customers',
                data: { name, email, street_address, city, state, country, zipcode }
            });
            
            ['name', 'mail', 'address', 'city', 'state', 'country', 'zip'].forEach(element => {
                Array.from(document.getElementsByName(element)).forEach(el => el.value = '');
            });
        });
    });
};

if (customer_list) {
    customer_list.addEventListener('click', async () => {
        
        const allCustomers = await axios({
            method: 'GET',
            url: 'api/v1/customers'
        });
    
        let html = `<h2>Customer List</h2>`;
        allCustomers.data.data.doc.forEach((el, i) => {
            html += `<div class="row customer-item item-${i}">${el.name}</div>`
        });
        document.querySelector('.viewing-box').innerHTML = html;
    });
};

if (paid_invoices) {
    paid_invoices.addEventListener('click', async () => {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/invoices'
        });
    
        let html = '<h2>Paid Invoices</h2>';
        
        res.data.data.doc.forEach((el, i) => {
            if (el.date_paid < new Date().toISOString()) {
                html += `
                <div class="row paid-item item-${el.number}">
                    <div class="col span-1-of-4"> ${el.customer.name}</div>
                    <div class="col span-1-of-4"> ${el.reason} </div>
                    <div class="col span-1-of-4"> $${el.balance_due} </div>
                    <div class="col span-1-of-4"> <span style="color:blue";>Paid</span></div>
                </div>`;
            };
        });
        document.querySelector('.viewing-box').innerHTML = html;
    });
};