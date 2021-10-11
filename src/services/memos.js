const base_url = 'http://localhost:3000/api/memo/'

export function requestMemos(token) {
    return fetch(base_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function createMemo(token, memo) {
    return fetch(base_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(memo)
    })
}

export function deleteMemo(token, memo) {
    console.log(token)
    console.log(memo)
    return fetch(base_url + memo.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(memo)
    })
}