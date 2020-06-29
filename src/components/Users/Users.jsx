import React from "react";
import styles from "./users.module.css";

let Users = props => {

    if (props.users.length === 0) {
  props.setUsers([
    {
      id: 1,
      photoUrl:
        "https://bugaga.ru/uploads/posts/2018-06/1527924361_kartinki-21.jpg",
      followed: false,
      fullName: "Cat",
      status: "I love Pizza",
      location: { city: "Milan", country: "Italy" }
    },
    {
      id: 2,
      photoUrl:
        "https://i.pinimg.com/originals/70/02/42/7002421cc6c33c32f09d00f45bb5a155.jpg",
      followed: true,
      fullName: "Tim",
      status: "I am pidor",
      location: { city: "Moscow", country: "Russia" }
    },
    {
      id: 3,
      photoUrl: "https://i.ytimg.com/vi/vP73cUKjjAg/maxresdefault.jpg",
      followed: false,
      fullName: "Pavel",
      status: "I am getting married",
      location: { city: "Moscow", country: "Russia" }
    }
  ]);
}

  return (
    <div>
      {props.users.map(u => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto} />
            </div>
            <div>
              {u.followed 
                ? (<button onClick={() => { props.unfollow(u.id) }}> Unfollow </button>) 
                : ( <button onClick={() => { props.follow(u.id) }}>Follow</button>)
              }
            </div>
          </span>
          <span>
            <div>{u.fullName}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{u.location.country}</div>
            <div>{u.location.city}</div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
