export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    firstname: string;
    id: number;
}

export interface IUserProfileUpdate {
    email?: string;
    firstname?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    firstname?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserContracts {
    user_id: number;
    nanny_id?: number;
    start?: string;
    end?: string;
}
