import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let history = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      userName: username,
      password: password,
      email: email,
    };
    const newUser = await axios.post(
      `http://localhost:5000/api/user/register`,
      body
    );
    if (newUser.data) {
      localStorage.setItem("user", JSON.stringify(newUser.data));
      history("/recomend");
    } else {
      alert("Invalid Entry");
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      history("/recomend");
    }
  }, []);

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 col-sm-7 col-md-6 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h2>Sign Up</h2>
                <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    className="form-control my-4 py-2"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control my-4 py-2"
                    placeholder="Email-Id"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control my-4 py-2"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <div className="text-center mt-3">
                    <button className="btn btn-primary">Sign Up</button>
                    <a
                      style={{ color: "black" }}
                      className="nav-link"
                      href="/login"
                    >
                      Already have an account ?
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

export default SignUp;
