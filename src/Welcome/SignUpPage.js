import { Navigate } from "react-router-dom";
import './SignUpPage.css'


const SignUpPage = ({ data, handleChange, handleSubmit, user, errorMessage }) => {

    const { username, password, isSeller } = data;

    return (
        <div className="SignUpPage">
            <div className="SignUpPage-Form-Container">
                <form onSubmit={handleSubmit}
                    className="SignUpPage-Form"
                    id="form">
                    <label htmlFor="username">
                        <b className='SignUpPage-label'>
                            Username
                        </b>
                    </label>
                    {!errorMessage &&
                        <input value={username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="SignUpPage-Username form-control"
                        />}
                    {errorMessage &&
                        <>
                            <input value={username}
                                onChange={handleChange}
                                type="text"
                                name="username"
                                id="username"
                                className="SignUpPage-Username form-control is-invalid"
                            />
                            <div id="username" class="invalid-feedback">
                                That username is already taken
                            </div>
                        </>
                    }
                    <label htmlFor="password">
                        <b className='SignUpPage-label'>
                            Password
                        </b>
                    </label>
                    <input value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        className="SignUpPage-Password form-control" />
                    <label>
                        <b className='SignUpPage-label'>
                            Seller Account?
                        </b>
                    </label>
                    <select name="isSeller"
                        form="form"
                        value={isSeller}
                        onChange={handleChange}
                        className="SignUpPage-isSeller form-control">
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>
                    <button className="SignUpPage-Form-Button btn btn-success">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage