export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    firstname: string;
    id: number;
    avatar?: string;
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
    is_user?: boolean;
    is_nanny?: boolean;
    is_superuser?: boolean;
}

export interface IUserContract {
    id?: number;
    child: string;
    duration_mode: string;
    weekdays: IWeekdays;
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
    child: string;
    duration_mode: string;
    weekdays: IWeekdays;
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

export interface IDayType {
    id: number | null;
    name: string | null;
}

export interface IWorkingDays {
    id: number;
    day_type_id: number;
    contract_id: number;
    day_type: IDayType;
    day: string;
    start?: string;
    end?: string;
    created_on: string;
    updated_on?: string;
}

export interface IContractSummary {
    business_days: number;
    working_days: number;
    presence_child: number;
    absence_child: number;
    disease_child: number;
    disease_nanny: number;
    daysoff_child: number;
    daysoff_nanny: number;
    hours_standard: number;
    hours_complementary: number;
    hours_extra: number;
    monthly_hours: number;
    monthly_salary: number;
    monthly_fees: number;
    price_hour_standard: number;
}

export interface IWeekdayHour {
    enabled: boolean;
    hour: number;
}

export interface IWeekdays {
    monday?: IWeekdayHour;
    tuesday?: IWeekdayHour;
    wednesdayonday?: IWeekdayHour;
    thursday?: IWeekdayHour;
    friday?: IWeekdayHour;
    saturday?: IWeekdayHour;
    sunday?: IWeekdayHour;
}
