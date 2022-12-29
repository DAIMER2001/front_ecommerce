export interface Client {
    id: string;
    name: string;
    accumulation_points: number;
    role: string;
}

export interface AuthClient {
    name: string;
    password: string;
}


export interface RegisterClient {
    name: string;
    accumulation_points: number;
    role: string;
    password: string;
}
export class ClientModule {
    id!: string;
    name!: string;
    accumulation_points!: number;
    role!: string;
    password!: string;
}