import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { MainState } from './state';
import { IUserContract } from '@/interfaces';

const defaultContract: IUserContract = {
  child : '',
  weekdays : '',
  weeks : 47,
  hours : 40,
  price_hour_standard : 3.5,
  price_hour_extra : 3.8,
  price_fees : 3.11,
  price_meals : 0,
  start : '' ,
  end : '' ,
  user_id : 0,
  nanny_id : 0,
};

const defaultState: MainState = {
  isLoggedIn: null,
  token: '',
  logInError: false,
  userProfile: null,
  dashboardMiniDrawer: false,
  dashboardShowDrawer: true,
  notifications: [],
  contracts: [],
  userContract: defaultContract,
  contract: defaultContract,
  contractSummary: {},
  searchNanny: {
    id: 0,
    email: '',
    firstname: '',
  },
  workingDays: [],
  dayTypes: [],
  addWorkingDaySuccess: null,
};

export const mainModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
