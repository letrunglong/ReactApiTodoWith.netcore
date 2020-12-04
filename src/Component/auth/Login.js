import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { userName, password } = this.state;

        axios
            .post(
                "http://localhost:5000/api/TodoUsers",
                {
                        userName: userName,
                        password: password
                }
            )
            .then(response => {
                this.props.handleSuccessfulAuth(response.data);
            })
            .catch(error => {
                console.log(error);
                // this.props.handleFailAuth("Sai tài khoản và mật khẩu")
                // console.log("login error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={this.state.userName}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}