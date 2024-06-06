export interface ISignerStatusResult {
    signer_uuid: string,
    public_key: string,
    status: "approved",
    fid: number,
    permissions: string[]
}

export interface IBulkGetUsersResponse {
    users: {
        "object": "user",
        "fid": number,
        "custody_address": string,
        "username": string,
        "display_name": string,
        "pfp_url": string,
        "profile": {
            "bio": {
                "text": string,
            }
        },
        "follower_count": number,
        "following_count": number,
        "verifications": string[],
        "verified_addresses": {
            "eth_addresses": string[],
            "sol_addresses": string[]
        },
        "active_status": "active" | "inactive",
        "power_badge": boolean
    }[]
}

export interface IGetUserFollowsResponse {
    users: {
        "object": "follow",
        "user": {
            "object": "user",
            "fid": number,
            "custody_address": string,
            "username": string,
            "display_name": string,
            "pfp_url": string,
            "profile": {
                "bio": {
                    "text": string
                }
            },
            "follower_count": number,
            "following_count": number,
            "verifications": string[],
            "verified_addresses": {
                "eth_addresses": string[],
                "sol_addresses": string[]
            },
            "active_status": "active" | "inactive",
            "power_badge": boolean,
            "viewer_context": {
                "following": boolean,
                "followed_by": boolean // This will tell us if this account is a mutual (at point in time)
            }
        }
    }[];
    next: {
        cursor: string
    }
}