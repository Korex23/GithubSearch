import { useState, useEffect } from "react";
import "./GitHubAcct.css";
import axios from "axios";

const GitHubUsers = () => {
  const [users, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  const fetchUsers = () => {
    axios.get("https://api.github.com/users").then((res) => {
      console.log(res.data);
      setUser(res.data);
      setSearchUser(res.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchUser(users);
    const resultsArray = users.filter((user) =>
      user.login.includes(e.target.value)
    );
    setSearchUser(resultsArray);
  };
  const results = searchUser.map((user) => {
    const { id, login, avatar_url, html_url } = user;
    return (
      <div className="card" key={id}>
        <img className="card-img" src={avatar_url} alt={login} />
        <h4>{login}</h4>
        <a href={html_url}>profile</a>
      </div>
    );
  });
  const content = results?.length ? results : <h3>No Such User</h3>;
  return (
    <>
      <h3>GitHub Users</h3>
      <form onSubmit={handleSubmit}>
        <div className="center">
          <input
            type="text"
            id="search"
            placeholder="Search Github users here"
            className="input"
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className="users">{content}</div>
    </>
  );
};

export default GitHubUsers;
