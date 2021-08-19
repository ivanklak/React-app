import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2e993b56-c8b6-4744-b277-c9b4cada2532',
  },
});

export enum ResultCodes {
  Success = 0,
  Error = 1,
}
