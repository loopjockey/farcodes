export interface IAuthenticatedUser {
    fid: number;
    is_authenticated: boolean;
    signer_uuid: string;
}

export interface ISimpleFarcasterUser {
    fid: number;
    username: string;
    name: string;
    custodyAddress?: string;
    avatarUrl: string;
}

export interface IHasCreator {
    creator: ISimpleFarcasterUser;
}

export interface ISimpleProgram {
    id: string;
    name: string;
    avatarUrl: string;
    rewardDescription: string;
}

export interface IHasProgram {
    program: ISimpleProgram;
}

export interface IProgram extends ISimpleProgram {
    description: string;
}

export interface ISimpleCodeModel {
    id: string;
    postedByFid: number;
    programId: string;
    postedDate: Date;
    codeCount: number;
    rewardDescription?: string;
}


export enum FeedType {
    trending = 'trending',
    recent = 'recent',
    mutuals = 'mutuals',
    following = 'following',
    mine = 'mine'
}