import React, { useState } from 'react'
import Base from "./../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isLocallyAuthenticated, signup } from '../auth/helper';

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then((data) => {
                console.log(data);
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    })
                } else {
                    setValues({
                        ...values,
                        error: true,
                        success: false,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="text-light">Name</label>
                            <input type="text" value={name} onChange={handleChange("name")} className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="text-light">Email</label>
                            <input type="email" value={email} onChange={handleChange("email")} className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="text-light">Password</label>
                            <input type="password" value={password} onChange={handleChange("password")} className="form-control" />
                        </div>
                        <button className="btn btn-success btn-block w-full" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success">
                        New Account Created successfully. <Link to="/signin">Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger">
                        Check all fields again.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                isLocallyAuthenticated() &&
                <Redirect to="/" />
            }
            <Base title="Sign Up Page" description="A Sign up for Tshirt Store">
                {success && successMessage()}
                {error && errorMessage()}
                {signUpForm()}
                <p className="text-white text-center">
                    {JSON.stringify(values)}
                </p>
            </Base>
        </>
    )
}

export default Signup
