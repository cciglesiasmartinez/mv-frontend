export interface GetUserResponse {
    data: {
        id: string;
        username: string;
        email: string;
        password: string;
        registeredAt: string;
        modifiedAt: string;
    }
    meta: {
        requestId: string;
        timestamp: string;
    }
}