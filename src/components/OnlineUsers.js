import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import "./OnlineUsers.styles.css";

const OnlineUsers = (props) => {
  const { users, room, navOpen, socket } = props;

  const [userIsOnline, setUserIsOnline] = useState(null);
  const [userWhoTyped, setUserWhoTyped] = useState(null);

  useEffect(() => {
    socket.on("isTyping", (name) => {
      setUserIsOnline(true);
      if (!userIsOnline) {
        setUserWhoTyped(name);
        const delay = setTimeout(() => {
          setUserIsOnline(false);
        }, 5000);
        return () => clearTimeout(delay);
      }
    });
  }, [userIsOnline]);

  // console.log("//////////");
  console.log(userIsOnline);

  const handleLeave = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    localStorage.removeItem("isOnline");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // props.history.push('/')
  };

  return (
    <div className={navOpen ? "users_div active" : "users_div"}>
      <h4>Room: {room}</h4>
      <a href="/" onClick={handleLeave}>
        <button>Leave Room?</button>
      </a>

      {users ? (
        <>
          <ul>
            {users.map((user) => (
              <div key={user.id} className="online-users-list-wrapper">
                <div
                  className={`circle-icon circle-icon--${
                    userIsOnline && userWhoTyped === user.username
                      ? "online"
                      : "offline"
                  }`}
                ></div>
                <li className="online-users-list">{user.username}</li>
              </div>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default withRouter(OnlineUsers);
