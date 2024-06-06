import { ISimpleFarcasterUser, ISimpleProgram, IProgram, ISimpleCodeModel, } from '../models';

export const DUMMY_USER: ISimpleFarcasterUser = {
    fid: 1,
    avatarUrl: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    name: 'Some Guy',
    username: 'someguy'
};

export const DUMMY_PROGRAM: ISimpleProgram = {
    id: 'upmoney',
    name: 'UpMoney',
    avatarUrl: 'https://d2xqxjfvpb1oa6.cloudfront.net/eyJidWNrZXQiOiJpbnZpdGF0aW9udXBsb2FkcyIsImtleSI6Imludml0YXRpb24uYXBwLnVwLmNvbS5hdS1wcm9tby1jb2Rlc19lMmJiYWQuYXUiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI1NiwiaGVpZ2h0IjoyNTYsImZpdCI6ImNvbnRhaW4iLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9fX0=',
    rewardDescription: '$10 Reward',
}

export const DUMMY_TRENDING_PROGRAMS: IProgram[] = new Array(10).fill(null).map((_, i) => {
    return {
        ...DUMMY_PROGRAM,
        id: [DUMMY_PROGRAM.id, i].join('_'),
        description: 'Up is a digital bank designed to help you organise your money and simplify your life. Join in minutes and pay no monthly fees.'
    }
});

export const DUMMY_CODES: ISimpleCodeModel[] = new Array(20).fill(null).map((_, i) => {
    return {
        id: '123',
        codeCount: 5,
        programId: DUMMY_PROGRAM.id,
        postedByFid: DUMMY_USER.fid,
        postedDate: new Date(2024, 5, 6)
    };
})