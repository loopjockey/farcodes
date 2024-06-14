export const cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

export const ok_only = () => new Response('ok', { headers: cors_headers })

export const ok = <T,>(data:T) => new Response(JSON.stringify(data), {
    headers: { ...cors_headers, 'Content-Type': 'application/json' },
    status: 200,
});

export const error = (code:number, message:string) => new Response(JSON.stringify({ error: message }), {
    headers: { ...cors_headers, 'Content-Type': 'application/json' },
    status: code,
})

export const not_allowed = () => error(405, 'Not Allowed');

// deno-lint-ignore no-explicit-any
export const validated_body = async <T = any>(req:Request, ...required:string[]):Promise<{request_body:T,request_errors:string[]|null}> => {
    const body = await req.json();
    if (body == null)
        return {request_body: null!, request_errors: ["No data"]};

    const errors = [];
    for(const name of required) {
        if (body[name] === null || typeof body[name] === 'undefined') {
            errors.push('Missing ' + name);
        }
    }
    return {request_body: body, request_errors: errors.length ? errors : null};
}

export type DocoGenerator = () => string | string[];
export const is_spec = (req:Request) => {
    return req.method === 'GET' && req.url.includes('?spec');
}
export const spec_response = (gen:DocoGenerator) => {
    let data = gen();
    if (data instanceof Array) {
        data = data.join("\n\n");
    }
    return new Response(data, {
        headers: { ...cors_headers, 'Content-Type': 'text/plain' },
        status: 200,
    });
}

export const filter_on_one_raw = (url:URL, ...options:string[]) => {
    let field = '';
    let value = '';
    let count = 0;

    for(const option of options) {
        const myval = url.searchParams.get(option);
        if (myval) {
            count++;
            field = option;
            value = myval;
        }
    }

    return {field, value, exactly_one:count===1};
}

export const filter_on_one = (searchParams:URLSearchParams, ...options:string[]) => {
    let field = '';
    let value = '';
    let count = 0;

    for(const option of options) {
        const myval = searchParams.get(option);
        if (myval) {
            count++;
            field = option;
            value = myval;
        }
    }

    return {field, value, exactly_one:count===1};
}
