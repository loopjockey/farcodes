import { Database } from './database.types'
export type ITable = Database['public']['Tables'];
export type IView = Database['public']['Views'];
export type IUserProfile = ITable['user_profile'];
export type IProgram = ITable['programs'];
export type IViewReferralProgram = IView['vw_referrals_with_programs'];

export type { Database };