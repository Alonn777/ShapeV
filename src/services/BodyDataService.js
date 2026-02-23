import request from './api.js'

export const getMetricas = async (id, token) => {
    return request(`/users/bodydata/meansurement/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const GetHistoricMetric = async (id, token) => {
    return request(`/users/bodydata/historic/metrics/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getBodyMeta = async (id, token) => {
    return request(`/users/bodydata/meta/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const postMetrica = async (id, metricaData, token) => {
    return request(`/users/bodydata/meansurement/${id}`, {
        method: "POST",
        body: JSON.stringify(metricaData),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const postMeta = async (id, metaData, token) => {
    return request(`/users/bodydata/meta/${id}`, {
        method: "POST",
        body: JSON.stringify(metaData),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}