import { useEffect } from 'react';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ productFormData, handleChange, handleSubmit, errorMessages }) => {
    const { name, description, price, imageUrl, quantity, category, expectedShippingTime } = productFormData
    const navigate = useNavigate();
    
    return (
        <div className="AddProduct">
            <div className="AddProduct-Form-Container">
                <form onSubmit={(e) => {
                    handleSubmit(e)
                    if(Object.keys(errorMessages).length === 0){
                        navigate('/dashboard');
                    }
                }
            }
                    className="AddProduct-Form">
                    <label htmlFor="name">
                        <b className='AddProduct-label'>
                            Name
                        </b>
                    </label>
                    {!errorMessages.name &&
                        <input type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            id="name"
                            className="AddProduct-Name form-control" />}
                    {errorMessages.name &&
                        <>
                            <input type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                id="name"
                                className="AddProduct-Name form-control is-invalid" />
                            <div id='name' className='invalid-feedback'>
                                You already have a product by that name
                            </div>
                        </>
                    }
                    <label htmlFor="description">
                        <b className='AddProduct-label'>
                            Description
                        </b>
                    </label>
                    <input type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        id="description"
                        className="AddProduct-Description form-control" />
                    <label htmlFor="price">
                        <b className='AddProduct-label'>
                            Price
                        </b>
                    </label>
                    {!errorMessages.price &&
                        <input type="number"
                            name="price"
                            value={price}
                            step='.01'
                            onChange={handleChange}
                            id="price"
                            className="AddProduct-Price form-control" />}
                    {errorMessages.price &&
                        <>
                            <input type="number"
                                name="price"
                                value={price}
                                step='.01'
                                onChange={handleChange}
                                id="price"
                                className="AddProduct-Price form-control is-invalid" />
                            <div id='price' className='invalid-feedback'>
                                You must type in a valid price
                            </div>
                        </>
                    }
                    <label htmlFor="imageUrl">
                        <b className='AddProduct-label'>
                            Image url
                        </b>
                    </label>
                    <input type="file"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={handleChange}
                        id="imageUrl"
                        className="AddProduct-ImageUrl form-control" />
                    <label htmlFor="quantity">
                        <b className='AddProduct-label'>
                            Quantity
                        </b>
                    </label>
                    {!errorMessages.quantity &&
                        <input type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            id="quantity"
                            className="AddProduct-Quantity form-control" />}
                    {errorMessages.quantity &&
                        <>
                            <input type="number"
                                name="quantity"
                                value={quantity}
                                onChange={handleChange}
                                id="quantity"
                                className="AddProduct-Quantity form-control is-invalid" />
                            <div id='quantity' className='invalid-feedback'>
                                You must type in a valid quantity
                            </div>
                        </>
                    }
                    <label htmlFor="category">
                        <b className='AddProduct-label'>
                            Most Relevant Category
                        </b>
                    </label>
                    <input type="text"
                        name="category"
                        value={category}
                        onChange={handleChange}
                        id="category"
                        className="AddProduct-Category form-control" />
                    <label htmlFor="expectedShippingTime">
                        <b className='AddProduct-label'>
                            Expected Shipping Time in Days
                        </b>
                    </label>
                    {!errorMessages.expectedShippingTime &&
                        <input type="number"
                            name="expectedShippingTime"
                            id="expectedShippingTime"
                            value={expectedShippingTime}
                            onChange={handleChange}
                            className="ProfilePage-Input form-control" />}
                    {errorMessages.expectedShippingTime &&
                        <>
                            <input type="number"
                                name="expectedShippingTime"
                                value={expectedShippingTime}
                                onChange={handleChange}
                                className="ProfilePage-Input form-control is-invalid"
                                id='expectedShippingTime' />
                            <div id='expectedShippingTime' className='invalid-feedback'>
                                You must type in a valid number
                            </div>
                        </>
                    }
                    <button className="AddProduct-Form-Button btn btn-primary">
                        Make Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct