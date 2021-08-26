import React, { useState } from 'react';
import Base from "./../core/Base";
import { authenticate, signin } from "../auth/helper"
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: "user@test.com",
        password: "12345",
        error: "",
        success: false
    })

    const { email, password, error, success } = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signin({ email, password })
            .then((data) => {
                console.log(data);
                if (!data.error) {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    });
                    data.token && authenticate({token: data.token, user: data.user});
                } else {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={onSubmit}>
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

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const performRedirect = () => {
        return (
            <Redirect to="/user/dashboard" />
        );
    }

    return (
        <Base title="Sign In Page" description="A Sign in for Tshirt Store">
            {error && errorMessage()}
            {signInForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
            {
                success &&
                performRedirect()
            }
        </Base>
    )
}

export default Signin
