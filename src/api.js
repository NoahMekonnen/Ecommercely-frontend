import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BASE_URL = REACT_APP_BASE_URL || 'http://localhost:3001';


/** Api Class
 * 
 * It holds all the methods needed for the application (get/send) to make
 * calls to the Api
 */

class EcommerceApi {
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${EcommerceApi.token}` };
        const params = (method === "get")
            ? data
            : {}
        return (await axios({ url, method, data, params, headers })).data
    }


    // Specific Api calls

    static setToken() {
        if (!localStorage.getItem('token')) {
            this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlzQWRtaW4iOmZhbHNlLCJpc1NlbGxlciI6ZmFsc" +
                "2UsImlhdCI6MTcxNjgyNDg3OX0.JvlkCeLEwhTpXvx-TUljOZHlDoxzvQqcotwMN6jcgdc";
        } else {
            this.token = localStorage.getItem('token');
        }
    }

    static async authenticate(data) {
        this.setToken();

        const res = await this.request('auth/login', data, 'post');
        localStorage.setItem('token', res.token);
        return res.token;

    }

    static async register(data) {
        this.setToken();
        console.log('register')
        const res = await this.request('auth/register', data, 'post');
        localStorage.setItem('token', res.token);
        return res.token;
    }

    static async getProducts() {
        this.setToken();
        const res = await this.request('products');
        return res.products;
    }

    static async getFilteredProducts(params) {
        this.setToken();
        const res = await this.request('products', params);
        return res.products;
    }

    static async getProduct(id) {
        this.setToken();
        const res = await this.request(`products/${id}`);
        return res.product;
    }

    static async addItem({ customerId, productId, quantitySold }) {
        this.setToken();
        const res = await this.request('interactions', { customerId, productId, quantitySold }, 'post')
        return res.cart
    }

    static async buyCart(customerId, products, address) {

        this.setToken();

        const res = await this.request(`carts`, { address, customerId }, 'post');

        for (let product of products) {
            await this.request(`interactions`,
                { productId: product.id, quantityChosen: product.quantityChosen, cartId: res.cart.id }, 'post');
            const newQuantity = product.quantity - product.quantityChosen;

            await this.request(`products/${product.id}`, { quantity: newQuantity }, 'patch');
        }

        await this.request(`carts/${res.cart.id}`, {}, 'patch');
        
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        const data = {
            products: products
        }

        const response = await this.request(`carts/create-checkout-session`, data, 'post');

        const result = stripe.redirectToCheckout({
            sessionId: response.id
        });

        return response.id;
    }

    static async sellerApproves(interactionId) {
        this.setToken();
        await this.request(`interactions/${interactionId}`, {}, 'patch')
    }

    static async getSellerTransactions(username) {
        this.setToken();
        const res = await this.request(`users/${username}/interactions/seller`);
        return res.interactions;
    }

    static async getApprovedTransactions(username) {
        this.setToken();
        const res = await this.request(`users/${username}/interactions/seller/approved`);
        return res.interactions;
    }

    static async createProduct(data, sellerId) {
        this.setToken();
        const finalData = {
            ...data,
            sellerId
        }

        const res = await this.request(`products`, finalData, 'post');
        return res.product;
    }

    static async getSellerItems(username) {
        this.setToken();
        const res = await this.request(`users/${username}/products`);
        return res.products;
    }

    static async updateProfile(username, data) {
        this.setToken();
        const res = await this.request(`users/${username}`, data, 'patch');
    }

    static async getPastCustomerTransactions(username) {
        this.setToken();
        const res = await this.request(`users/${username}/interactions/customer`);

        return res.interactions;
    }

    static async getProfile(username) {
        this.setToken();
        const res = await this.request(`users/${username}`);
        return res.user;
    }

    static async deleteAccount(id) {
        this.setToken();
        await this.request(`users/${id}`, {}, 'delete');
    }
}

EcommerceApi.testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlzQWRtaW4iOmZhbHNlLCJpc1NlbGxlciI6ZmFsc" +
    "2UsImlhdCI6MTcxNjgyNDg3OX0.JvlkCeLEwhTpXvx-TUljOZHlDoxzvQqcotwMN6jcgdc"

export { BASE_URL, EcommerceApi }