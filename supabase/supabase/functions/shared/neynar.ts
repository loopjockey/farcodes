import { setting_neynar_api_key } from "./settings.ts";

const API_KEY = setting_neynar_api_key();
/**
 * Step 1: The UI receives a signer_uuid which is scoped to our client_id.  
 * @returns The state of the supplied signer_uuid.
 */
export const receiveSignerUuid = async (signer_uuid: string): Promise<ISignerStatusResult> => {
    const url = new URL('https://api.neynar.com/v2/farcaster/signer');
    url.searchParams.append('signer_uuid', signer_uuid);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json', api_key: API_KEY }
    });
    return response.json();
}

/**
 * Step 2: Load the current state of the user by its fid (get avatar, username, name etc).
 * @param fid The unique identifier of the farcaster identity.
 * @returns The details of the farcaster account.
 */
export const getFidCurrentDetails = async (fid: number): Promise<IBulkGetUsersResponse> => {
    const url = new URL('https://api.neynar.com/v2/farcaster/user/bulk');
    url.searchParams.append('fids', fid.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json', api_key: API_KEY }
    });
    return response.json();
}

/**
 * Step 3: Load in who the user follows so we can load that into superbase, then build our subgraph off the back of it.
 * @param fid The unique identifier of the account we plan to load the follow list of.
 */
export const getUserFollows = async (fid: number): Promise<IGetUserFollowsResponse> => {
    const url = new URL(`https://api.neynar.com/v2/farcaster/following`);
    url.searchParams.append('fid', fid.toString());
    url.searchParams.append('viewer_fid', fid.toString());
    url.searchParams.append('sort_type', 'desc_chron');
    url.searchParams.append('limit', '25');
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json', api_key: API_KEY }
    });
    return response.json();
}

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