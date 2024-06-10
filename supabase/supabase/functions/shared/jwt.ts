
import { create } from "https://deno.land/x/djwt@v2.8/mod.ts"
import { setting_jwt_secret } from "../shared/settings.ts";
import { secretToKey } from "../shared/crypto.ts";
import { createSupabaseForServiceRole } from "./supabase.ts";
import { Database } from "../shared/models/database.types.ts";
const jwt_secret = setting_jwt_secret();

export interface IJwtResult {
    exp: number;
    jwt: string;
}

export interface IError {
    code: number;
    message: string;
}

export const create_jwt_for_fid = async (user:Database["public"]["Tables"]["user_profile"]["Row"], type:string, exp:number) : Promise<[IJwtResult|null,IError|null]> => {
    try {
      const supabase = createSupabaseForServiceRole();
      
      const authUserResult = await supabase.auth.admin.getUserById(user.id);
      if (!authUserResult.data || !authUserResult.data.user) {
        return [null, {code:401, message:"Unauthorized."}];
      }
      const authUser = authUserResult.data.user;

      console.log(`Generating Token for '${user.id}'`)
      const unique_ident = crypto.randomUUID();
      
      const payload = {
          "aud": "authenticated",
          "exp": exp,
          "sub": authUser.id,
          "email": authUser.email,
          "phone": authUser.phone,
          "app_metadata": {
            ...authUser.app_metadata,
            "fid": user.fid,
            "custody_address": user.custody_address,
            "name": user.name,
          },
          "user_metadata": authUser.user_metadata ?? {},
          "unique_ident": unique_ident,
          "role": "authenticated",
          "key_type": type
      }
      const jwt = await create({ alg: "HS256", type: "JWT" }, payload, await secretToKey(jwt_secret))
  
      return [{ exp, jwt }, null];
    } catch (err) {
      console.error(err)
      return [null, {code:401, message:"Unknown Error"}];
    }
  }