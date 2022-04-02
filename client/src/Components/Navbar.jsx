import React, { useEffect, useState } from "react";

function Navbar() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoaded(true);
    }
  }, []);

  const logouthandle = () => {
    localStorage.removeItem("user");
    setLoaded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/" style={{ marginLeft: "5px" }}>
        <h2>Action</h2>
      </a>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            Trending
          </a>
          <a className="nav-item nav-link active" href="/search">
            Seach
          </a>
          <a className="nav-item nav-link active" href="/watchlist">
            Watchlist
          </a>
          <a className="nav-item nav-link active" href="/recomend">
            Recomend-Me
          </a>
          {loaded ? (
            <>
              <a
                className="nav-item nav-link active"
                onClick={logouthandle}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a className="nav-item nav-link active" href="/login">
                Login
              </a>
              <a className="nav-item nav-link active" href="/signup">
                SignUp
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
