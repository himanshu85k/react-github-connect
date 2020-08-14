import React, { useEffect, useState } from "react";
import "./App.css";
import User from "./User";
import { Container, TextField } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([{id: 0, owner: {avatar_url: '', login: 'test'}}]);
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [forksCount, setForksCount] = useState(0);

  useEffect(() => {
    getUsers();
    fetch("https://api.github.com/search/repositories?q=user%3Afacebook+repo%3Areact")
      .then((res) => res.json())
      .then((res) => {
        setForksCount(res.items[0].forks_count)
      });
  }, []);

  function getUsers(page = 1) {
    fetch(`https://api.github.com/repos/facebook/react/forks?per_page=10&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }

  function handleFollowClick(username) {
    console.log(username, "clicked");
    if (token) {
      axios({
        method: 'PUT',
        url: `https://api.github.com/user/following/${username}`,
        headers: {
          Authorization: `token ${token}`
        }
      }).then(res => {
        if (res.status === 204) {
          alert(`You are now following ${username}`)
        }
      });
    } else {
      alert('Please enter you Github personal access token');
    }
  }

  function handlePageChange(e, page) {
    setPage(page);
    getUsers(page);
  }

  return (
    <Container className="main">
      <h1>Users who have forked the Facebook/react repository:</h1>
      <br />
      <TextField
        fullWidth
        label="Enter github personal access token"
        margin="dense"
        variant="outlined"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      *Ensure that 'user:follow' scope is enabled for this token
      <br />
      <br />
      <Pagination count={parseInt(forksCount / 10, 10)} color="primary"
        onChange={(e, page) => handlePageChange(e, page)} page={page} />
      {
        users.length > 0 ?
          users.map((user) => {
            return (
              <User
                key={user.id}
                img={user.owner.avatar_url}
                username={user.owner.login}
                handleFollowClick={handleFollowClick}
              />
            );
          }) : <p>Loading</p>}
    </Container>
  );
}

export default App;
