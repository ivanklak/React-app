import * as axios from 'axios';

//смотрим документацию для запросов
const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2e993b56-c8b6-4744-b277-c9b4cada2532',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
      return response.data;
    });
  },
  toFollow(userId) {
    return instance.post(`follow/${userId}`).then(response => {
      return response.data;
    });
  },
  toUnfollow(userId) {
    return instance.delete(`follow/${userId}`).then(response => {
      return response.data;
    });
  },
  getProfile(userId) {
    console.warn(`Obsolete method. Please use profileAPI object.`);
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

// standart POST request

// let reqOptions = {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     fullname: data.fullname,
//     dateOfBirth: data.birthDay,
//     " skiPassExpirationTime": data.skipass,
//     coach: data.coach,
//     sportType: data.sportType
//   }),
//   redirect: "follow"
// };
// return fetch("http://192.168.235.8:7001/visitor", reqOptions)
//   .then(resp => {
//     if (resp.status === 200) {
//       return resp.json();
//     }
//   })
//   .then(result => console.log(result))
//   .catch(error => console.log("error", error))
