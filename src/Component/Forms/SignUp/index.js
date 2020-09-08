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
            confirmPassword: "",
            errorMessages: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        if (!data.email) {
            return this.error("Email is required");
        } else if (!data.password) {
            return this.error("Password is required");
        } else if (data.password !== data.confirmPassword) {
            return this.error("Password doesn't match");
        } else if (data.password.length < 6) {
            return this.error("Password too short, 6 characters expected");
        } else {
            this.setState({ waiting: true });
            fetch("https://login-backend-e5394a.eu1.kinto.io/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.errorMsg) {
                        this.setState({
                            waiting: false,
                            email: response.email,
                            password: response.password,
                            confirmPassword: response.confirmPassword
                        });
                        return this.error(response.message);
                    } else {
                        this.setState({
                            email: "",
                            password: "",
                            confirmPassword: "",
                            errorMessages: "",
                            waiting: false,
                        });
                        return this.error(response.message);
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
                <h2 className={styles.title}>SIGNUP</h2>
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
                        autoComplete="off"
                        placeholder="Email"
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
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="▪▪▪▪▪▪▪▪▪▪▪▪"
                        value={this.state.confirmPassword}
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
                            "SIGNUP"
                        )}
                    </button>
                </form>

                <div className={styles.info}>
                    <span className={styles.forget}>
                        <Link to="/">Login →</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default index;