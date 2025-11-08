export interface LoginResponse {
    data: { 
        token: string,
        tokenType: string,
        expiresIn: number,
        username: string,
    }
    meta: {
        requestId: string,
        timestamp: string,
    }
}