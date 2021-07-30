import React from 'react';

const NickName = props => {
  return <div>{props.name}</div>;
};

export default NickName;

// import NickName from "./components/Profile/MyPosts/Post/NickName";

// const NickNames = () => {
//   let nickNames = [
//     { id: 1, name: "Jack Sparrow" },
//     { id: 2, name: "Barbossa" },
//     { id: 3, name: "Mr Gibs" }
//   ];

//   let nickNameElements = nickNames.map(n => <NickName name={n.name} />);

//   return (
//     <div>
//       <h1>{nickNameElements}</h1>
//     </div>
//   );
// };

// export default NickNames;
