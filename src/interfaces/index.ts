export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    firstname: string;
    id: number;
}

export interface INanny {
    email: string;
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
    id: number;
    weekdays: string;
    weeks: number;
    hours: number;
    price_hour_standard: number;
    price_hour_extra: number;
    price_fees: number;
    price_meals?: number;
    start?: string;
    end?: string;
    user_id?: number;
    nanny_id?: number;
}

export interface IUserContractCreate {
    weekdays: string;
    weeks: number;
    hours: number;
    price_hour_standard: number;
    price_hour_extra: number;
    price_fees: number;
    price_meals?: number;
    start?: string;
    end?: string;
    user_id?: number;
    nanny_id?: number;
}

export interface IUserContractUpdate {
    id: number;
    weekdays: string;
    weeks: number;
    hours: number;
    price_hour_standard: number;
    price_hour_extra: number;
    price_fees: number;
    price_meals?: number;
    start?: string;
    end?: string;
    user_id?: number;
    nanny_id?: number;
}
