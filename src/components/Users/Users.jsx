import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/people-profile.png";
import { NavLink } from "react-router-dom";
import Axios from "axios";

let Users = props => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
              onClick={e => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map(u => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? 
                <button onClick={() => {

                  Axios.delete(
                    `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    { withCredentials: true,
                    headers: {
                      "API-KEY": "2e993b56-c8b6-4744-b277-c9b4cada2532"
                    } 
                  }).then(response => {
                    if (response.data.resultCode === 0) {
                      props.unfollow(u.id);
                    }
                  });
                 }}>Unfollow</button>
                  : <button onClick={() => {

                    Axios.post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                      {},
                      { withCredentials: true,
                        headers: {
                          "API-KEY": "2e993b56-c8b6-4744-b277-c9b4cada2532"
                         }
                        }).then(response => {
                      if (response.data.resultCode === 0) {
                        props.follow(u.id);
                      }
                    });

                  }}>Follow</button>}
            </div>
          </span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{"u.location.country"}</div>
            <div>{"u.location.city"}</div>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
