import request from './api.js'

export const getMetricas = async (id) => {
    return request(`/users/bodydata/meansurement/${id}`)
}

export const postMetrica = async (id, metricaData) => {
    return request(`/users/bodydata/meansurement/${id}`, {
        method: "POST",
        body: JSON.stringify(metricaData)
    })
}