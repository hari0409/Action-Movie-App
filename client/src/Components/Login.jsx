import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const history = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      userName: username,
      password: password,
    };
    const logUser = await axios.post(
      `http://localhost:5000/api/user/login`,
      body
    );
    if (logUser.data) {
      localStorage.setItem("user", JSON.stringify(logUser.data));
      history("/");
    } else {
      alert("invalid");
    }
  };
  useEffect(() => {
    const existUser = JSON.parse(localStorage.getItem("user"));
    if (existUser) {
      history("/");
    }
  }, []);

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 col-sm-7 col-md-6 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h2>Log In</h2>
                <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    className="form-control my-4 py-2"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control my-4 py-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-center mt-3">
                    <button className="btn btn-primary">Log In</button>
                    <a
                      style={{ color: "black" }}
                      className="nav-link"
                      href="/signup"
                    >
                      Dont have an account ?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
