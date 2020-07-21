import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "2e993b56-c8b6-4744-b277-c9b4cada2532"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data;
      });
  }
};

export const followAPI = {
  toFollow(id) {
    return instance.post(`follow/${id}`).then(response => {
      return response.data;
    });
  }
};

export const unfollowAPI = {
  toUnfollow(id) {
    return instance.delete(`follow/${id}`).then(response => {
      return response.data;
    });
  }
};
