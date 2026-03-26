import request from "./api.js";

export const GET = (token, route) => {
    return request(route, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const PUT = (token, route, data) => {
    return request(route, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}