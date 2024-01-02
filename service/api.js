

async function requester(url, method, data) {
    const option = {
        method,
        headers: {}
    }

    if (data) {
        option.headers["Content-Type"] = "application/json"
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