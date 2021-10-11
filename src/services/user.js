const base_url = 'http://localhost:3000/api/'

export function requestLogin(credentials) {
    return fetch(base_url + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}