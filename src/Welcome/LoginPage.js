import { Navigate } from "react-router-dom";
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

const LoginPage = ({ data, handleChange, handleSubmit, user, errorMessages }) => {

    const { username, password } = data;
    const navigate = useNavigate();
    
    return (
        <div className="LoginPage">
            <div className="LoginPage-Form-Container">
                <form onSubmit={(e) => {
                    handleSubmit(e)
                    if(user.username){
                        navigate('/');
                    }
                }
            }
                    className="LoginPage-Form">
                    <label htmlFor="username"
                        className='LoginPage-label'>
                        <b>Username</b>
                    </label>
                    {!errorMessages.username &&
                        <input value={username}
                            name="username"
                            onChange={handleChange}
                            type="text"
                            id="username"
                            className="LoginPage-Username form-control"
                        />
                    }
                    {errorMessages.username &&
                        <>
                            <input value={username}
                                name="username"
                                onChange={handleChange}
                                type="text"
                                id="username"
                                className="LoginPage-Username form-control is-invalid"
                            />
                            <div id="username" class="invalid-feedback">
                                Please provide a valid username
                            </div>
                        </>
                    }
                    <label htmlFor="password">
                        <b className='LoginPage-label'>
                            Password
                        </b>
                    </label>
                    {!errorMessages.password &&
                        <input value={password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            id="password"
                            className="LoginPage-Password form-control" />}
                    {errorMessages.password &&
                        <>
                            <input value={password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                id="password"
                                className="LoginPage-Password form-control is-invalid" />
                            <div id="password" class="invalid-feedback">
                                Please provide a valid password
                            </div>
                        </>
                    }
                    <button className="LoginPage-Form-Button btn btn-success">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage