import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2e993b56-c8b6-4744-b277-c9b4cada2532',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
  },

  toFollow(userId) {
    return instance.post(`follow/${userId}`).then(response => response.data);
  },

  toUnfollow(userId) {
    return instance.delete(`follow/${userId}`).then(response => response.data);
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
    return instance.put(`profile/status`, {status: status});
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },

  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, {email, password, rememberMe});
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};
