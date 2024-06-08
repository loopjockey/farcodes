import { FeedType, IHasCreator, IHasProgram, IProgram, ISimpleCodeModel, ISimpleFarcasterUser, ISimpleProgram } from '../models';
import { DUMMY_CODES, DUMMY_PROGRAM, DUMMY_TRENDING_PROGRAMS, DUMMY_USER } from '../models/dummy';

export type Jwt = string;
export interface ICli { }

export const loginWithSigner = async (signerUuid: string): Promise<Jwt> => Promise.resolve("get jwt");

export const createCli = (jwt: Jwt): ICli => ({});

export const getUserByFid = async (cli: ICli, fid:number) => {
    return {
        ...DUMMY_USER,
        fid
    }
}

export const searchPrograms = async (cli: ICli, text: string) => {
    return await new Promise<ISimpleProgram[]>((resolve) => {
        setTimeout(() => {
            resolve(DUMMY_TRENDING_PROGRAMS);
        }, 2000);
    });
}

export const listTrendingPrograms = async (cli: ICli) => {
    return await new Promise<IProgram[]>((resolve) => {
        setTimeout(() => {
            resolve(DUMMY_TRENDING_PROGRAMS);
        }, 2000);
    });
};

export const listCodesForFeed = async (cli: ICli, feedType: FeedType) => {
    return await new Promise<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>((resolve) => {
        setTimeout(() => {
            resolve(
                DUMMY_CODES.map(d => ({
                    ...d,
                    program: DUMMY_PROGRAM,
                    creator: DUMMY_USER
                }))
            )
        });
    });
}

export const listCodesForUser = async (cli: ICli, fid: number) => {
    return await new Promise<(ISimpleCodeModel & IHasProgram)[]>((resolve) => {
        setTimeout(() => {
            resolve(
                DUMMY_CODES.map(d => ({
                    ...d,
                    program: DUMMY_PROGRAM
                }))
            )
        });
    });
}