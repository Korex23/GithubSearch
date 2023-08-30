import { useState, useEffect } from "react";
import "./GitHubAcct.css";
import Pagination from "./pagination/Pagination";
import axios from "axios";

const GitHubUsers = () => {
  const [users, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(1); 

  // const fetchUsers = () => async {
  //   axios.get("https://api.github.com/users").then((res) => {
  //     console.log(res.data);
  // setUser(res.data);
  // setTotal(res.data.length);
  // setSearchUser(res.data);
  //   });
  // };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.github.com/users");
      setUser(response.data);
      setSearchUser(response.data);
      setTotal(response.data.length);
    } catch (error) {
      console.log(error);
    }
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const end = currentPage * limit;
  const start = end - limit;
  const currentPageUsers = searchUser.slice(start, end);

  const results = currentPageUsers.map((user) => {
    const { id, login, avatar_url, html_url } = user;
    return (
      <div className="card" key={id}>
        <img className="card-img" src={avatar_url} alt={login} />
        <h4>{login}</h4>
        <a href={html_url}>profile</a>
      </div>
    );
  });

  const content = results.length ? results : <h3>No users found</h3>;

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
      <Pagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default GitHubUsers;
