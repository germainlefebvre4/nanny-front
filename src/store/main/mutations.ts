import { IUserProfile, INanny, IUserContract, IWorkingDays } from '@/interfaces';
import { MainState, AppNotification } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {
    setToken(state: MainState, payload: string) {
        state.token = payload;
    },
    setLoggedIn(state: MainState, payload: boolean) {
        state.isLoggedIn = payload;
    },
    setLogInError(state: MainState, payload: boolean) {
        state.logInError = payload;
    },
    setUserProfile(state: MainState, payload: IUserProfile) {
        state.userProfile = payload;
    },
    setDashboardMiniDrawer(state: MainState, payload: boolean) {
        state.dashboardMiniDrawer = payload;
    },
    setDashboardShowDrawer(state: MainState, payload: boolean) {
        state.dashboardShowDrawer = payload;
    },
    addNotification(state: MainState, payload: AppNotification) {
        state.notifications.push(payload);
    },
    removeNotification(state: MainState, payload: AppNotification) {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
    setContracts(state: MainState, payload: IUserContract[]) {
        state.contracts = payload;
    },
    setContract(state: MainState, payload: IUserContract) {
        state.contract = payload;
    },
    setSearchNanny(state: MainState, payload: INanny) {
        state.searchNanny = payload;
    },
    setWorkingDays(state: MainState, payload: IWorkingDays) {
        state.workingDays = payload;
    },

};

const {commit} = getStoreAccessors<MainState | any, State>('');

export const commitSetDashboardMiniDrawer = commit(mutations.setDashboardMiniDrawer);
export const commitSetDashboardShowDrawer = commit(mutations.setDashboardShowDrawer);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetToken = commit(mutations.setToken);
export const commitSetUserProfile = commit(mutations.setUserProfile);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
export const commitSetContracts = commit(mutations.setContracts);
export const commitSetContract = commit(mutations.setContract);
export const commitSetSearchNanny = commit(mutations.setSearchNanny);
export const commitSetWorkingDays = commit(mutations.setWorkingDays);
