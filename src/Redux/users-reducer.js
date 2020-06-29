const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS ";

let initialState = {
  users: [
    
    // {
    //   id: 1,
    //   photoUrl: "https://bugaga.ru/uploads/posts/2018-06/1527924361_kartinki-21.jpg",
    //   followed: false,
    //   fullName: "Cat",
    //   status: "I love Pizza",
    //   location: { city: "Milan", country: "Italy" }
    // },
    // {
    //   id: 2,
    //   photoUrl: "https://i.pinimg.com/originals/70/02/42/7002421cc6c33c32f09d00f45bb5a155.jpg",
    //   followed: true,
    //   fullName: "Tim",
    //   status: "I am pidor",
    //   location: { city: "Moscow", country: "Russia" }
    // },
    // {
    //   id: 3,
    //   photoUrl: "https://i.ytimg.com/vi/vP73cUKjjAg/maxresdefault.jpg",
    //   followed: false,
    //   fullName: "Pavel",
    //   status: "I am getting married",
    //   location: { city: "Moscow", country: "Russia" }
    // }
    
  ]
}; 

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        // users: [...state.users],
        users: state.users.map( u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        })
      };

    case SET_USERS: {
      return { ...state, users: [ ...state.users, ...action.users ]}
    }

    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUserswAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
