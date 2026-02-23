import request from './api.js'


export const PostWorkoutService = async (id, data, token) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const GetWorkoutService = async (id, token) => {
    return request(`/users/workouts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const GetExerciseService = async (id, token) => {
    return request(`/users/workouts/exercise/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const PutExerciseService = async (id, data, token) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const PatchWorkoutService = async (id, data, token) => {
    return request(`/users/workouts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const DeleteExerciseService = async (id, token) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}