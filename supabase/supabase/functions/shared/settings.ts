export const setting_jwt_secret = () => 
    Deno.env.get('JWT_SECRET') || Deno.env.get('SUPABASE_JWT_SECRET') || Deno.env.get('X_JWT_SECRET') || '';

export const setting_service_role_key = () => 
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('X_SERVICE_ROLE_KEY') || '';

export const setting_anon_key = () => 
    Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('X_ANON_KEY') || '';

export const setting_supabase_url = () =>
    Deno.env.get('SUPABASE_URL') || '';
