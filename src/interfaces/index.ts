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

export interface IUserContract {
    user_id?: number;
    nanny_id?: number;
    start?: string;
    end?: string;
}

export interface IUserContractCreate {
    weekdays: string;
    weeks: number;
    hours: number;
    price_hour_standard: number;
    price_hour_extra: number;
    price_fees: number;
    price_meals?: number;
    start?: Date;
    end?: Date;
    user_id?: number;
    nanny_id?: number;
}
