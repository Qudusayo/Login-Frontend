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
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className={styles.container}>
                <img className="logo" src={logo} alt="logo" />
                <h2 className={styles.title}>FORGET PASSWORD</h2>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    <input
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={this.state.email}
                    />
                    <button type="submit" className="danger">
                        FORGET PASSWORD →
                        {/* <img className="spinner" src={spinner} alt="spinner" /> */}
                    </button>
                </form>

                <div className={styles.info}>
                    <span className={styles.sign}>
                        <Link to="/signup">Sign Up ?</Link>
                    </span>
                    <span className={styles.forget}>
                        <Link to="/">LOGIN →</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default index;
