import React from 'react'

const Base = (props) => {
    const {
        title = "My Title",
        description = "My Description",
        className = "mt-2 bg-dark text-white p-4",
        children
    } = props;
    return (
        <>
            <div className="container-fluid">
                <div className="py-3 jumbotron bg-dark text-white text-center">
                    <h2 className="display-5">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, reach me out at: <a style={{width: "min-content"}} className="mx-auto text-info nav-link" href="mailto:temporary@domain.com">temporary@domain.com</a></h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className="text-black-50">
                            An Amazing Django React FullStack App
                        </span>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Base
