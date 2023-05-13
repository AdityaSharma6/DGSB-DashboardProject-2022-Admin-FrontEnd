export interface UserModel {
    _id: string;
    username: string;
    password: string;
    dashboardNumber: number;
    surveyStartDate: Date;
}

export enum AuthenticationLevels {
    Other,
    Admin,
}

export interface UserContextModel extends UserModel {
    isAuthenticated: boolean,
    authLevel: AuthenticationLevels
}

