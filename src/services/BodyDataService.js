import request from './api.js'

export const getMetricas = async (id) => {
    return request(`/users/bodydata/meansurement/${id}`)
}
export const GetHistoricMetric = async (id) => {
    return request(`/users/bodydata/historic/metrics/${id}`)
}
export const getBodyMeta = async (id) => {
    return request(`/users/bodydata/meta/${id}`)
}

export const postMetrica = async (id, metricaData) => {
    return request(`/users/bodydata/meansurement/${id}`, {
        method: "POST",
        body: JSON.stringify(metricaData)
    })
}

export const postMeta = async (id, metaData) => {
    return request(`/users/bodydata/meta/${id}`, {
        method: "POST",
        body: JSON.stringify(metaData)
    })
}