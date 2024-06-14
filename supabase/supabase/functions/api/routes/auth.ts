import ServerRequest from "https://deno.land/x/pogo@v0.6.0/lib/request.ts";
import { respond_error, respond_ok } from "../../shared/supapogo.ts";
import { create_jwt_for_fid } from "../../shared/jwt.ts";
import { createSupabaseForServiceRole } from "../../shared/supabase.ts";
import { getFidCurrentDetails, receiveSignerUuid } from "../../shared/neynar.ts";

export interface ISignInRequest {
  signer_uuid: string;
}

export const SignIn = async (req: ServerRequest) => {
  try {
    const body = await req.raw.json() as ISignInRequest;

    if (!body?.signer_uuid) {
      return respond_error(400, "No Signer");
    }

    const neynar_user = await receiveSignerUuid(body.signer_uuid);
    if (!neynar_user) {
      return respond_error(400, "Unknown Signer");
    }

    const supabase = createSupabaseForServiceRole();
    let matching = await supabase.from('user_profile').select('*').eq('fid', neynar_user.fid);

    if (!matching.data || !matching.data.length) {
      const fidDetailsResp = await getFidCurrentDetails(neynar_user.fid);
      const fidDetails = fidDetailsResp.users[0];

      const createSupaUserResult = await supabase.auth.admin.createUser({
        email: `${fidDetails.fid}@far.codes`,
        password: crypto.randomUUID(),
        user_metadata: {},
        email_confirm: false
      });

      if (createSupaUserResult.error) {
        console.log(createSupaUserResult.error);
        return respond_error(500, "Error creating user.");
      }

      const createProfileResult = await supabase.from('user_profile').insert({
        avatar_url: "https://cdn.discordapp.com/attachments/898978000000000000/898978000000000000/unknown.png", //TODO
        fid: fidDetails.fid,
        name: fidDetails.display_name,
        custody_address: fidDetails.custody_address,
        username: fidDetails.username,
        id: createSupaUserResult.data.user?.id!
      });

      if (createProfileResult.error) {
        console.log(createProfileResult.error);
        return respond_error(500, "Error creating user.");
      }

      matching = await supabase.from('user_profile').select('*').eq('fid', neynar_user.fid);
    }

    const user = matching!.data![0];
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24hr
    const [jwt, error] = await create_jwt_for_fid(user, "access-token", exp);

    if (error) {
      console.error(error);
      return respond_error(error.code, error.message);
    }

    return respond_ok(jwt);
  } catch (err) {
    console.error(err);
    return respond_error(500, err.message);
  }
};
