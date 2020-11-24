import axios from 'axios';
import { apiUrl } from '@/env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate, IUserContract, IUserContractCreate } from './interfaces';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  async getMe(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/api/v1/users/me`, authHeaders(token));
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(`${apiUrl}/api/v1/users/`, authHeaders(token));
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(`${apiUrl}/api/v1/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
  async getContracts(token: string) {
    return axios.get<IUserContract[]>(`${apiUrl}/api/v1/contracts/`, authHeaders(token));
  },
  async createContract(token: string, data: IUserContractCreate) {
    console.log(data)
    console.log(data.user_id)
    var userId;
    var nannyId;
    userId = data.user_id;
    nannyId = data.nanny_id;
    delete data.user_id;
    delete data.nanny_id;
    if (!nannyId) {
      return axios.post(`${apiUrl}/api/v1/contracts/?user_id=${userId}`,
        data, authHeaders(token));
    } else {
      return axios.post(`${apiUrl}/api/v1/contracts/?user_id=${userId}&nanny_id=${nannyId}`,
        data, authHeaders(token));
    }
  },
  // async createContract(token: string, data: IUserContractCreate) {
  //   return axios.post(`${apiUrl}/api/v1/contracts/`, data, authHeaders(token));
  // },
};
