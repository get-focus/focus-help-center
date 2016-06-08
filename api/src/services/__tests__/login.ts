export async function login(password: string) {
    return await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: password,
        headers: {
            'Content-Type': 'text/plain'
        },
    });
}

export async function loginAndGetCookie(password: string) {
    return (await login(password)).headers.getAll('set-cookie')
        .map(r => r.replace('; path=/; httponly', ''))
        .join('; ');
}
