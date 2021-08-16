import React, { Component } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "./components/Navbar/Navbar";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/login.css";

class Login extends Component {
  render() {
    const ErrorMessage = () => {
      if (this.props.error) {
        return <p>{this.props.error}</p>;
      }
      return null;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const token = document.querySelector("[name=csrf-token]").content;

      const data = {
        username: username.value,
        password: password.value,
      };

      Inertia.post("/login", data, {
        headers: {
          "X-CSRF-Token": token,
        },
      });
    };

    return (
      <main>
        <Navbar />
        <img
          src={require("../images/scene_1.svg")}
          alt=""
          role="presentation"
          className="scene-1-login"
        />
        <div className="login_content">
          <Head title="Welcome" />
          <ErrorMessage />
          <div className="login-title">Log in to your account</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
            <br />
            <input
              type="text"
              id="username"
              required
              name="username"
              placeholder="Username/Email"
            />
            <br />
            <label htmlFor="password"></label>
            <br />
            <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Password"
            />
            <br />

            <input type="submit" value="Log in" className="login-btn" />
          </form>
          <br />
          <div className="to-signup">
            Don't have an account yet? <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
