import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Preloader/Preloader";

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  //debugger;
  return (
    <div>
      <div>
        <img src=" https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.small} />
        <p>
          <div>
            <strong>{props.profile.fullName}</strong>
          </div>
        </p>

        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.contacts.facebook}</div>
        <div>{props.profile.contacts.vk}</div>
        <div>{props.profile.contacts.twitter}</div>
      </div>
    </div>
  );
};
export default ProfileInfo;
