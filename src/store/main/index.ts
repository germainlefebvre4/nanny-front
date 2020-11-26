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
  userContract: {
    weekdays: '',
    weeks: 0,
    hours: 0,
    price_hour_standard: 0,
    price_hour_extra: 0,
    price_fees: 0,
    price_meals: 0,
    start: '',
    end: '',
    user_id: 0,
    nanny_id: 0,
  },
  contract: {
    weekdays: '',
    weeks: 0,
    hours: 0,
    price_hour_standard: 0,
    price_hour_extra: 0,
    price_fees: 0,
    price_meals: 0,
    start: '',
    end: '',
    user_id: 0,
    nanny_id: 0,
  },
};

export const mainModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
