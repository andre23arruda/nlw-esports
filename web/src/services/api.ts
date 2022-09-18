const BASE_URL = import.meta.env.VITE_API_URL


export async function getApi(route: string) {
    return fetch(BASE_URL + route)
    .then(response => response.json()
        .then(data => ({
            status: response.status,
            data
        }))
    )
}

export async function postApi(route: string, formData: {}) {
    return fetch(
        BASE_URL + route,
        {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => response.json())
}