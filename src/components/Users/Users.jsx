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
      <div className={styles.pages}>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
              onClick={e => {
                props.onPageChanged(p);
              }}
            >
              {p + " "}
            </span>
          );
        })}
      </div>
      {props.users.map(u => (
        <div key={u.id} className={styles.persons}>
          <div className={styles.person}>
            <span>
              <div>
                <NavLink to={"/profile/" + u.id}>
                  <img
                    src={u.photos.small != null ? u.photos.small : userPhoto}
                    className={styles.userPhoto}
                  />
                </NavLink>
              </div>
              <div className={styles.followbtn}>
                {u.followed ? (
                  <button
                    disabled={props.followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span className={styles.description}>
              <div>
                <h4>{u.name}</h4>
              </div>
              <div><h5>{u.status}</h5></div>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Users;
