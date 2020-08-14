import React, { useEffect, useState } from "react";
import "./App.css";
import User from "./User";
import { Container, TextField } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/forks?per_page=2&page=2")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setTimeout(() => {
          setUsers(res);
        }, 0);
      });
  }, []);

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

  return (
    <Container className="main">
      <TextField
        fullWidth
        label="Github personal access token"
        variant="outlined"
        margin="dense"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      *Ensure that 'user:follow' scope is enabled for this token
      <br />
      <h1>Users who have forked the Facebook/react repository:</h1>
      <Pagination count={10} color="primary" />
      {users.map((user) => {
        return (
          <User
            key={user.id}
            img={user.owner.avatar_url}
            username={user.owner.login}
            handleFollowClick={handleFollowClick}
          />
        );
      })}
    </Container>
  );
}

export default App;
