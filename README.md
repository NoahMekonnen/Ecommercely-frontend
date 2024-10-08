# Ecommercely(Ecommercely-frontend)

This is a basic ecommerce site
#### Live At: 

https://ecommercely-frontend.onrender.com/

![Ecommerce Picture](https://github.com/NoahMekonnen/Ecommercely-frontend/blob/main/HomePage.png?raw=true)

### App features include:

* A user upon registering can make a customer or seller account
* A customer can buy any available product and see his past orders. He can also update his profile information on the profile page.
* A seller can do the same as a customer but in addition the seller can make products. The seller can also view some basic information about 
his transactions with customers and approve any incoming orders in his dashboard
* Any user whether logged in or not can search for products in the nav search bar by the name of the product or the category that was assigned to that product. This user can also view the detail page of any product to get more information on it.

### Standard User flow

#### For a Customer:

1. A customer registers as a customer or logs into a customer account made previously.
2. He then filters products based on a category or a product name and adds items to his cart.
3. He then clicks on one of the products to view more information on the product and upon review adds the item to the cart.
4. He then clicks on the cart button in the Navbar and clicks the proceed to checkout button.
5. He then is directed to the checkout page where he types in an address and clicks the proceed to pay button.
6. He is then taken to the stripe checkout page where his payment information is verified.
7. Upon completion he will return to the Ecommcercely website.

#### For a Seller:

1. A seller registers as a seller or logs into a seller account made previously.
2. He then clicks the make product link in the Navbar and inputs some information for a product he wants to post.
3. Upon completion he is redirected to his dashboard.
4. If a customer buys a product he can approve the product by navigating to the page of customer orders and the transaction will be officially completed.
5. The seller can also view all his posted products and sales revenue through the dashboard page if he desires.


### API ENDPOINT

https://ecommerce-store-backend-7m44.onrender.com

### Tech Stack
* React.js
* CSS
* Bootstrap
* (Node.js for backend)

### Important Notes

* Database is populated with fake user and product data from mockaroo.com
* Payments are verified through stripe api(See backend repo for more detail: https://github.com/NoahMekonnen/Ecommercely-backend)
* If you want to run it locally you must go into the backend/routes/carts.js file and change the success and cancel url in the 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm test`

Test are currently not working as intended

### `npm run build`