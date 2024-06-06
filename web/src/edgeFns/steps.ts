// NEYNAR DOCS https://docs.neynar.com/reference/following-v2

import { ISignerStatusResult, IBulkGetUsersResponse, IGetUserFollowsResponse } from './models'

const API_KEY = "???"

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