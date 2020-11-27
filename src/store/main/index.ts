import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { MainState } from './state';
import { IUserContract } from '@/interfaces';

const defaultState: MainState = {
  isLoggedIn: null,
  token: '',
  logInError: false,
  userProfile: null,
  dashboardMiniDrawer: false,
  dashboardShowDrawer: true,
  notifications: [],
  contracts: [],
  userContract: null,
  contract: null,
  searchNanny: null,
};

export const mainModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
