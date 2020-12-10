import axios from 'axios';
import { apiUrl } from '@/env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate, INanny, IUserContract, IContractSummary, IUserContractCreate, IWorkingDays } from './interfaces';

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
  async getContract(token: string, contractId: number) {
    return axios.get<IUserContract>(`${apiUrl}/api/v1/contracts/${contractId}`, authHeaders(token));
  },
  async getContractSummary(token: string, contractId: number, year: number, month: number) {
    return axios.get<IContractSummary>(`${apiUrl}/api/v1/contracts/${contractId}/summary?year=${year}&month=${month}`, authHeaders(token));
  },
  async createContract(token: string, data: IUserContractCreate) {
    const userId = data.user_id;
    const nannyId = data.nanny_id;
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
  async updateContract(token: string, data: IUserContractCreate, contractId: number) {
    delete data.user_id;
    delete data.nanny_id;
    return axios.put(`${apiUrl}/api/v1/contracts/${contractId}`,
      data, authHeaders(token));
  },
  async removeContract(token: string, contractId: number) {
    return axios.delete(`${apiUrl}/api/v1/contracts/${contractId}`, authHeaders(token));
  },
  async getNannyByEmail(token: string, nannyEmail: string) {
    return axios.get<INanny>(`${apiUrl}/api/v1/users/nanny/_search?email=${nannyEmail}`, authHeaders(token));
  },
  async getWorkingDays(token: string, contractId: number, year: number, month: number) {
    return axios.get<IWorkingDays>(`${apiUrl}/api/v1/contracts/${contractId}/working_days?year=${year}&month=${month}`, authHeaders(token));
  },
};
