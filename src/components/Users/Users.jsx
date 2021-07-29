import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/people-profile.png";
import { NavLink } from "react-router-dom";
import Axios from "axios";

const Users = ({
  users,
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  followingInProgress,
  follow,
  unfollow
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
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
              className={currentPage === p && styles.selectedPage}
              onClick={e => {
                onPageChanged(p);
              }}
            >
              {p + " "}
            </span>
          );
        })}
      </div>
      {users.map(u => (
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
                    disabled={followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      follow(u.id);
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
              <div>
                <h5>{u.status}</h5>
              </div>
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
