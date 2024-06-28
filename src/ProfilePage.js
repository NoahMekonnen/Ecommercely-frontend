import { useState, useEffect } from 'react';
import './ProfilePage.css'
import { EcommerceApi } from './api';

const ProfilePage = ({ profileFormData, handleChange, handleSubmit, errorMessages, handleDelete, user }) => {
    const { username, password, address, age } = profileFormData;
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        const getProfile = async () => {
            setProfileData(await EcommerceApi.getProfile(user.username))
        }
        getProfile()
    }, [user])

    return (
        <div className="ProfilePage">
            <div className='ProfilePage-Form-Container'>
                <form onSubmit={handleSubmit}
                    className='ProfilePage-Form'>
                    <label htmlFor="username">
                        <b className='ProfilePage-label'>
                            Username
                        </b>
                    </label>
                    {!errorMessages.username &&
                        <input type="text"
                            name="username"
                            value={username}
                            placeholder={profileData.username}
                            onChange={handleChange}
                            className="ProfilePage-Input form-control" />}
                    {errorMessages.username &&
                        <>
                            <input type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className="ProfilePage-Input form-control is-invalid"
                                id='username' />
                            <div id="username" class="invalid-feedback">
                                That username is already taken
                            </div>
                        </>
                    }
                    <label htmlFor="password">
                        <b className='ProfilePage-label'>
                            Password For Authentication
                        </b>
                    </label>
                    {!errorMessages.password &&
                        <input type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="ProfilePage-Input form-control" />}
                    {errorMessages.password &&
                        <>
                            <input type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="ProfilePage-Input form-control is-invalid"
                                id='password'
                            />
                            <div id="password" class="invalid-feedback">
                                Invalid Password
                            </div>
                        </>
                    }
                    <label htmlFor="address">
                        <b className='ProfilePage-label'>
                            Address
                        </b>
                    </label>
                    <input type="text"
                        name="address"
                        value={address}
                        placeholder={profileData.address}
                        onChange={handleChange}
                        className="ProfilePage-Input form-control" />
                    <label htmlFor="age">
                        <b className='ProfilePage-label'>
                            Age
                        </b>
                    </label>
                    {!errorMessages.age &&
                        <input type="number"
                            name="age"
                            value={age}
                            placeholder={profileData.age}
                            onChange={handleChange}
                            className="ProfilePage-Input form-control" />}
                    {errorMessages.age &&
                        <>
                            <input type="text"
                                name="age"
                                value={age}
                                onChange={handleChange}
                                className="ProfilePage-Input form-control is-invalid"
                                id='age' />
                            <div id="age" class="invalid-feedback">
                                Invalid Age
                            </div>
                        </>
                    }
                    <button className='ProfilePage-Form-Button btn btn-primary'>
                        Update
                    </button>
                </form>
                <button className='ProfilePage-Form-Delete btn btn-danger'
                    onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
        </div>
    )
}

export default ProfilePage