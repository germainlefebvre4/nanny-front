import { IUserProfile, INanny, IUserContract, IWorkingDays, IContractSummary } from '@/interfaces';

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
    userContract: IUserContract;
    contract: IUserContract;
    searchNanny: INanny | null;
    workingDays: IWorkingDays[] | [];
    contractSummary: IContractSummary | {};
}
