import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';

import SellerProductList from './Products/Seller/SellerProductList';
import SellerOrderList from './Products/Seller/SellerOrderList';
import ProductDetail from './Products/ProductDetail';
import ProductContext from './Products/ProductContext';
import AddProduct from './Products/Seller/AddProduct';

import CustomerOrderList from './Products/Customer/CustomerOrderList';

import Cart from './Carts/Cart';
import CheckoutPage from './Carts/CheckoutPage';
import CartContext from './Carts/CartContext';

import Home from './Welcome/Home';
import LoginPage from './Welcome/LoginPage';
import SignUpPage from './Welcome/SignUpPage';
import Logout from './Welcome/Logout';
import Dashboard from './Welcome/Dashboard';

import SuccessPage from './RedirectPages/SuccessPage';
import CancelPage from './RedirectPages/CancelPage';

import { EcommerceApi } from './api';
import { decodeToken } from "react-jwt";
import ProfilePage from './ProfilePage';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const INITIAL_LOGIN_FORM_DATA = {
    username: '',
    password: ''
  }
  const INITIAL_SIGNUP_FORM_DATA = {
    username: '',
    password: '',
    isSeller: false
  }

  const INITIAL_PRODUCT_FORM_DATA = {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    quantity: '',
    category: '',
    expectedShippingTime: ''
  }

  const INITIAL_PROFILE_FORM_DATA = {
    username: '',
    password: '',
    address: '',
    age: ''
  }

  const INITIAL_PROFILE_ERROR_STATE = {
    username: '',
    password: '',
    address: '',
    age: ''
  }

  const INITIAL_PRODUCT_ERROR_STATE = {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    quantity: '',
    category: '',
    expectedShippingTime: ''
  }

  const INITIAL_REDIRECT_STATUS = {
    show: 'false',
    cancel: 'true',
    success: 'true'
  }

  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState((JSON.parse(localStorage.getItem('cartItems')) || []));
  const [searchFilter, setSearchFilter] = useState('');
  const [numOfProducts, setNumOfProducts] = useState(12);

  const [loginFormData, setLoginFormData] = useState(INITIAL_LOGIN_FORM_DATA);
  const [signUpFormData, setSignUpFormData] = useState(INITIAL_SIGNUP_FORM_DATA);
  const [profileFormData, setProfileFormData] = useState(INITIAL_PROFILE_FORM_DATA);
  const [productFormData, setProductFormData] = useState(INITIAL_PRODUCT_FORM_DATA);

  const [myProducts, setMyProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [sellerOrders, setSellerOrders] = useState(JSON.parse(localStorage.getItem('sellerOrders')) || [])
  const [approvedTransactions, setApprovedTransactions] = useState([]);

  const [myTransactions, setMyTransactions] = useState(JSON.parse(localStorage.getItem('myItems')) || []);

  const [user, setUser] = useState(decodeToken(localStorage.getItem('token')) || {});
  const [shippingAddress, setShippingAddress] = useState('');
  const [id, setId] = useState(-1);

  const [loginErrorMessages, setLoginErrorMessages] = useState({});
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
  const [productErrorMessages, setProductErrorMessages] = useState(INITIAL_PRODUCT_ERROR_STATE);
  const [profileErrorMessages, setProfileErrorMessages] = useState(INITIAL_PROFILE_ERROR_STATE);

  const [showRedirectPage, setShowRedirectPage] = useState(JSON.parse(localStorage.getItem('showRedirectPage')) || INITIAL_REDIRECT_STATUS);
  console.log(showRedirectPage,"showredirecrpage")
  useEffect(() => {
    // set properties for body
    const body = document.querySelector('body');
    body.style.backgroundColor = '#116466';
    body.style.width = '100%'

    // grab all relevant data about a user from backend and store it in state
    if (user.isSeller && localStorage.getItem('token')) {
      const getMyProducts = async () => {
        setMyProducts(await EcommerceApi.getSellerItems(user.username))
      }
      getMyProducts();

      const getSellerOrders = async () => {
        setSellerOrders(await EcommerceApi.getSellerTransactions(user.username))
      }
      getSellerOrders();

      const getApprovedInteractions = async () => {
        setApprovedTransactions(await EcommerceApi.getApprovedTransactions(user.username))
      }
      getApprovedInteractions();
    }

    const getAllProducts = async () => {
      const allProducts = await EcommerceApi.getProducts()
      setProducts(() => allProducts.filter(product => product.quantity > 0));
    }
    getAllProducts();

    if (localStorage.getItem('token')) {
      const getCustomerTransactions = async () => {
        setMyTransactions(await EcommerceApi.getPastCustomerTransactions(user.username));
      }
      getCustomerTransactions();
    }
  }, [user]);

  // store seller's products in localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(myProducts))
  }, [myProducts])

  // store seller's orders in localStorage
  useEffect(() => {
    localStorage.setItem('sellerOrders', JSON.stringify(sellerOrders))
    if (user.username) {
      const getTransactions = async () => {
        setApprovedTransactions(await EcommerceApi.getApprovedTransactions(user.username));
      }
      getTransactions();
    }
  }, [sellerOrders])

  // store cartItems in localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  // store customer's own transactions in localStorage
  useEffect(() => {
    localStorage.setItem('myItems', JSON.stringify(myTransactions));
  }, [myTransactions])

  // store available redirect page in localStorage
  useEffect(() => {
    localStorage.setItem('showRedirectPage', JSON.stringify(showRedirectPage));
  }, [showRedirectPage]);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (user.username) {
      const product = await EcommerceApi.getProduct(e.target.id);
      if (product.sellerId == user.id) return;

      const inCart = cartItems.find(item => item.id == e.target.id);

      // if item not in cart add item to cart
      if (!inCart) {
        const newItem = products.find(product => product.id == e.target.id);
        setCartItems(() =>
          [...cartItems, {
            ...newItem,
            quantityChosen: 1
          }
          ]);
      }
    }
  }

  const handleRemoveFromCart = (e) => {
    const finalArray = cartItems.filter(item =>
      (e.target.parentNode.id && item.id != e.target.parentNode.id) ||
      e.target.parentNode.parentNode.id && item.id != e.target.parentNode.parentNode.id)
    setCartItems(() => finalArray)
  }

  const handleProceedToCheckout = async (e) => {
    e.preventDefault();
    navigate('/checkout')
  }

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (location.pathname != '/') {
      navigate('/')
    }
    const userProducts = await EcommerceApi.getFilteredProducts({ str: searchFilter, category: searchFilter })
    setProducts(() => userProducts);
    setNumOfProducts(() => 12)

  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((data) => ({
      ...data,
      [name]: value
    }));
    // upon changing input value remove any error status on input value
    if (name == 'username' && loginErrorMessages.username) {
      setLoginErrorMessages(() => ({}))
    } else if (name == 'password' && loginErrorMessages.password) {
      setLoginErrorMessages(() => ({}))
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await EcommerceApi.authenticate(loginFormData);
      if (token) {
        setUser(() => decodeToken(token));
        navigate('/');
        setLoginFormData(INITIAL_LOGIN_FORM_DATA);
      }
    } catch (err) {
      // store error msg in state so that appropiate message and display may be shown
      const msg = err.response.data.error.msg;
      if (msg.includes(`No user with username`)) {
        setLoginErrorMessages(() => ({ username: msg }));
      } else if (msg.includes(`Invalid password`)) {
        setLoginErrorMessages(() => ({ password: msg }))
      }
    }
  }

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name == 'isSeller') {
      setSignUpFormData((data) => ({
        ...data,
        isSeller: !data.isSeller
      }));
    } else {
      setSignUpFormData((data) => ({
        ...data,
        [name]: value
      }));
    }
    // upon changing input value remove any error status on input value
    if (name == 'username' && signUpErrorMessage) {
      setSignUpErrorMessage('');
    }
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await EcommerceApi.register(signUpFormData);
      if (token) {
        setUser(() => decodeToken(token));
        navigate('/');
        setSignUpFormData(INITIAL_SIGNUP_FORM_DATA);
      }
    } catch (err) {
      // store error msg in state so that appropiate message and display may be shown
      const msg = err.response.data.error.msg;
      setSignUpErrorMessage(msg);
    }
  }

  const handleLogout = () => {
    if (user.username) {
      localStorage.clear()
      setUser(() => ({}))
      setCartItems(() => [])
      setMyProducts(() => [])
      setSellerOrders(() => [])
      setApprovedTransactions(() => [])
      setMyTransactions(() => [])
      setShowRedirectPage(() => INITIAL_REDIRECT_STATUS)
      setShowCart(() => false)
    } else {
      alert('You must be logged in to Log out')
    }
  }

  const handleCartIconSubmit = (e) => {
    e.preventDefault();
    setShowCart(() => !showCart);
  }

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(data => ({
      ...data,
      [name]: value
    }))
    // upon changing input value remove any error status on input value
    if (name == 'name' && productErrorMessages.name) {
      setProductErrorMessages((data) => ({
        ...data,
        name: ''
      }));
    } else if (name == 'quantity' && productErrorMessages.quantity) {
      setProductErrorMessages((data) => ({
        ...data,
        quantity: ''
      }));
    } else if (name == 'expectedShippingTime' && productErrorMessages.expectedShippingTime) {
      setProductErrorMessages((data) => ({
        ...data,
        expectedShippingTime: ''
      }));
    } else if (name == 'price' && productErrorMessages.price) {
      setProductErrorMessages((data) => ({
        ...data,
        price: ''
      }))
    }
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()

    try {
      const finalProductFormData = {
        ...productFormData,
        price: parseFloat(productFormData.price),
        quantity: parseInt(productFormData.quantity),
        expectedShippingTime: parseInt(productFormData.expectedShippingTime)
      }
      const product = await EcommerceApi.createProduct(finalProductFormData, user.id);
      setMyProducts(items => [...items, product]);
      setProductFormData(INITIAL_PRODUCT_FORM_DATA);
      navigate('/dashboard');
    } catch (err) {
      // store error msg in state so that appropiate message and display may be shown
      const msg = err.response.data.error.msg
      if (msg.includes(`Duplicate product`)) {
        setProductErrorMessages((data) => ({
          ...data,
          name: msg
        }));
      } else if (msg.includes(`Quantity must be >=0`) || msg[0].includes(`instance.quantity`)) {
        setProductErrorMessages((data) => ({
          ...data,
          quantity: msg
        }));
      } else if (msg.includes(`That shipping time is unheard of`) || msg[0].includes(`instance.expectedShippingTime`)) {
        setProductErrorMessages((data) => ({
          ...data,
          expectedShippingTime: msg
        }));
      } else if (msg.includes(`Price must be >=0`) || msg[0].includes(`instance.price`)) {
        setProductErrorMessages((data) => ({
          ...data,
          price: msg
        }));
      } else if (msg.includes(`Missing Image url`)) {
        setProductErrorMessages((data) => ({
          ...data,
          imageUrl: msg
        }))
      }
    }
  }

  const handleAddressChange = (e) => {
    setShippingAddress(() => e.target.value)
  }

  const handleQuantityAdjusterChange = (e) => {

    if (typeof parseInt(e.target.value) != "number") return;
    if (isNaN(parseInt(e.target.value)) && e.target.value != '') return;
    if (parseInt(e.target.value) === 0) return;

    const newCartItems = cartItems.map(item => {
      if (e.target.value == '') {
        return ({
          ...item,
          quantityChosen: e.target.value
        })
      }
      if (e.target.parentNode.id == item.id && item.quantityChosen != '' && parseInt(e.target.value) <= item.quantity) {
        return ({
          ...item,
          quantityChosen: e.target.value
        })
      } else if (item.quantityChosen == '' && parseInt(e.target.value) <= item.quantity) {
        return ({
          ...item,
          quantityChosen: parseInt(e.target.value)
        })
      }
      return item
    });
    setCartItems(() => newCartItems)
  }

  const increase = (e) => {
    if (e.target.parentNode.children[1].value == '') return;
    const newCartItems = cartItems.map(item => {
      if (e.target.parentNode.id == item.id && item.quantityChosen < item.quantity) {
        return ({
          ...item,
          quantityChosen: parseInt(item.quantityChosen) + 1
        })
      }
      return item
    });
    setCartItems(() => newCartItems)
  }

  const decrease = (e) => {
    if (e.target.parentNode.children[1].value == '') return;
    const newCartItems = cartItems.map(item => {
      if (e.target.parentNode.id == item.id && item.quantityChosen > 1) {
        return ({
          ...item,
          quantityChosen: parseInt(item.quantityChosen) - 1
        })
      }
      return item;
    });
    setCartItems(() => newCartItems);
  }

  const makePayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    await EcommerceApi.buyCart(user.id, cartItems, shippingAddress);

    localStorage.setItem('cartItems', JSON.stringify([]));
    setShowRedirectPage((data) => ({
      ...data,
      show: 'true'
    }))
  }

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((data) => ({
      ...data,
      [name]: value
    }));
    // upon changing input value remove any error status on input value
    if (name == 'username' && profileErrorMessages.username) {
      setProfileErrorMessages((data) => ({
        ...data,
        username: ''
      }))
    } else if (name == 'password' && profileErrorMessages.password) {
      setProfileErrorMessages((data) => ({
        ...data,
        password: ''
      }))
    } else if (name == 'age' && profileErrorMessages.age) {
      setProfileErrorMessages((data) => ({
        ...data,
        age: ''
      }))
    }
  }

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    const { username, password, address, age } = profileFormData;
    if (username.length == 0) return;
    for (let char of age) {
      if (isNaN(parseInt(char))) {
        setProfileErrorMessages((data) => ({
          ...data,
          age: true
        }));
        return;
      }
    }
    try {
      const token = await EcommerceApi.authenticate({ username: user.username, password });
      const finalData = { username };
      if (address) {
        finalData.address = address;
      }
      if (age) {
        finalData.age = parseInt(age);
      }
      if (token) {
        await EcommerceApi.updateProfile(user.username, finalData);
        setProfileFormData(() => INITIAL_PROFILE_FORM_DATA);
        const newToken = await EcommerceApi.authenticate({ username, password });
        setUser(() => decodeToken(newToken));
      }
    } catch (err) {
      // store error msg in state so that appropiate message and display may be shown
      const msg = err.response.data.error.msg;
      if (msg.includes(`duplicate key value`)) {
        setProfileErrorMessages((data) => ({
          ...data,
          username: msg
        }))
      } else if (msg.includes(`Invalid password`)) {
        setProfileErrorMessages((data) => ({
          ...data,
          password: msg
        }))
      }
    }
  }

  const handleApproval = async (e) => {
    e.preventDefault();
    
    await EcommerceApi.sellerApproves(e.target.id);
  }

  const handleDelete = async () => {
    await EcommerceApi.deleteAccount(user.username);
    localStorage.clear();
    setUser({});
  }

  return (
    <div className="App">
      <CartContext.Provider value={
        {
          cartItems, showCart, setShowCart, makePayment, handleCartIconSubmit, handleQuantityAdjusterChange, increase, decrease,
          handleRemoveFromCart
        }}>
        <ProductContext.Provider value={{ handleAddToCart }}>
          <NavBar searchFilter={searchFilter}
            handleChange={handleSearchChange}
            handleSearch={handleSearch}
            setShowCart={setShowCart}
            user={user}
            showCart={showCart}
          />
          <Cart cartItems={cartItems}
            handleSubmit={handleProceedToCheckout}
          />
          <Routes>
            <Route path='/login'
              element={<LoginPage
                data={loginFormData}
                handleChange={handleLoginChange}
                handleSubmit={handleLoginSubmit}
                user={user}
                errorMessages={loginErrorMessages}
              />}
            />
            <Route path='/signup'
              element={<SignUpPage
                data={signUpFormData}
                handleChange={handleSignUpChange}
                handleSubmit={handleSignUpSubmit}
                user={user}
                errorMessage={signUpErrorMessage}
              />}
            />
            <Route path='/'
              element={<Home
                products={products}
                numOfProducts={numOfProducts}
                setNumOfProducts={setNumOfProducts}
                user={user}
              />}
            />
            <Route path='/products/:id'
              element={<ProductDetail user={user}
                handleClick={handleAddToCart}
                cartItems={cartItems}
              />}
            />
            
                  <Route path='/success'
                    element={<SuccessPage
                      setShowRedirectPage={setShowRedirectPage} />}
                  />
                
                  <Route path='/cancel'
                    element={<CancelPage
                      setShowRedirectPage={setShowRedirectPage} />}
                  />
                
            {
              user.username &&
              <>
                <Route path='/logout'
                  element={<Logout
                    handleLogout={handleLogout}
                  />}
                />
                <Route path='/checkout'
                  element={<CheckoutPage
                    address={shippingAddress}
                    handleChange={handleAddressChange}
                  />}
                />
                <Route path='/profile'
                  element={<ProfilePage
                    handleChange={handleProfileFormChange}
                    handleSubmit={handleProfileFormSubmit}
                    profileFormData={profileFormData}
                    errorMessages={profileErrorMessages}
                    handleDelete={handleDelete}
                    user={user}
                  />}
                />
                <Route path='/customer/orders'
                  element={<CustomerOrderList
                    interactions={myTransactions}
                  />}
                />
              </>
            }
            {
              user.isSeller &&
              <>
                <Route path='/dashboard'
                  element={<Dashboard
                    interactions={sellerOrders}
                    products={myProducts}
                    approvedTransactions={approvedTransactions}
                  />}
                />
                <Route path='/products/new'
                  element={<AddProduct
                    productFormData={productFormData}
                    handleChange={handleProductChange}
                    handleSubmit={handleProductSubmit}
                    errorMessages={productErrorMessages}
                  />}
                />
                <Route path='/seller/orders'
                  element={<SellerOrderList
                    interactions={sellerOrders}
                    setSellerOrders={setSellerOrders}
                    user={user} 
                    handleApproval={handleApproval}
                    />}
                />
                <Route path='/seller/products'
                  element={<SellerProductList
                    products={myProducts}
                  />}
                />
              </>
            }
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
