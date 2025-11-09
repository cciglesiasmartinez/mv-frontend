export interface RefreshAccessTokenResponse {
    data: {
        token: string,
        refreshToken: string,
        tokenType: string,
        expiresIn: number,
        issuedAt: string,
    }
    meta: {
        requestId: string,
        timestamp: string,
    }
}