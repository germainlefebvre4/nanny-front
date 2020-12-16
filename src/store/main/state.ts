import { IUserProfile, INanny, IUserContract, IWorkingDays } from '@/interfaces';

export interface AppNotification {
    content: string;
    color?: string;
    showProgress?: boolean;
}

export interface MainState {
    token: string;
    isLoggedIn: boolean | null;
    logInError: boolean;
    userProfile: IUserProfile | null;
    dashboardMiniDrawer: boolean;
    dashboardShowDrawer: boolean;
    notifications: AppNotification[];
    contracts: IUserContract[];
    userContract: IUserContract | null;
    contract: IUserContract | null;
    searchNanny: INanny | null;
    workingDays: IWorkingDays[] | [];
}
