import fetch from 'isomorphic-fetch';

export async function login(password: string) {
    return await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: password,
        headers: {
            'Content-Type': 'text/plain'
        },
    });
}

export async function fetchWithLogin(url: string, options?) {
    const response = await (await login('password')).json<{token?: string, error?: string}>();
    if (response.error) {
        throw new Error('Incorrect password');
    }

    return await fetch(url, Object.assign({}, options, {headers: Object.assign({}, options && options.headers || {}, {Authorization: `Bearer ${response.token}`})}));
}
