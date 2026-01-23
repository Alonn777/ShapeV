import request from './api.js'

export const UpdateWorkoutService = async (id, data) => {
    return request(`/users/workouts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}