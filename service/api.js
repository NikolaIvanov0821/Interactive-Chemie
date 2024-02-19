//Функционалност за заявки към база данни

async function requester(url, method, data) {
    const option = {
        method,
        headers: {}
    }
    const accessToken = sessionStorage.getItem("accessToken")
    if (accessToken && accessToken !== undefined) {
        option.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        option.headers["Content-Type"] = "application/json"
        option.body = data
    }

    const response = await fetch(url, option)

    if (response.status === 200) {
        return response.json()
    }
}

function get(url) {
    return requester(url, "GET")
}
function post(url, data) {
    return requester(url, "POST", data)
}
function put(url, data) {
    return requester(url, "PUT", data)
}
function del(url, data) {
    return requester(url, "DELETE", data)
}

export const request = {
    get,
    post,
    put,
    del
}