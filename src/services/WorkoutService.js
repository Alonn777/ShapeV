import request from './api.js'


export const PostWorkoutService = async (id, data) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const GetWorkoutService = async (id) => {
    return request(`/users/workouts/${id}`)
}

export const GetExerciseService = async (id) => {
    return request(`/users/workouts/exercise/${id}`)
}
export const PutExerciseService = async (id, data) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })
}


export const PatchWorkoutService = async (id, data) => {
    return request(`/users/workouts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}

export const DeleteExerciseService = async (id) => {
    return request(`/users/workouts/exercise/${id}`, {
        method: "DELETE"
    })
}