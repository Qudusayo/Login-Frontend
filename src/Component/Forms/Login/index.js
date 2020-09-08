import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/react.svg";
import spinner from "../../../assets/loading.png";

import styles from "../style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        if (!data.email) {
            return this.error("Email is required");
        } else if (!data.password) {
            return this.error("Password is required");
        } else if (data.password.length < 6) {
            return this.error("Password should be > 5 characters");
        } else {
            this.setState({ waiting: true });
            fetch("https://login-backend-e5394a.eu1.kinto.io/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.errorMsg) {
                        this.setState({ waiting: false });
                        return this.error(response.message);
                    } else {
                        this.setState({
                            email: "",
                            password: "",
                            confirmPassword: "",
                            errorMessages: "",
                            waiting: false,
                        });
                        return this.props.history.push("/home");
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error(
                        "Error  registering user, Kindly try again"
                    );
                });
        }
    };

    error = (message) => {
        this.setState({ errorMessages: message });
        setTimeout(() => {
            this.setState({ errorMessages: "" });
        }, 5000);
    };

    render() {
        return (
            <div className={styles.container}>
                <img className="logo" src={logo} alt="logo" />
                <h2 className={styles.title}>LOGIN</h2>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    {this.state.errorMessages ? (
                        <span className={styles.error}>
                            {this.state.errorMessages}
                        </span>
                    ) : null}
                    <input
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={this.state.email}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="▪▪▪▪▪▪▪▪▪▪▪▪"
                        value={this.state.password}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "LOGIN"
                        )}
                    </button>
                </form>
                <div className={styles.info}>
                    <span className={styles.sign}>
                        <Link to="/signup">Sign Up ?</Link>
                    </span>
                    <span className={styles.forget}>
                        <Link to="/forgetPin">Forget Password →</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default index;
