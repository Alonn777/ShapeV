import request from "./api";

export const PostUser = async (route, bodydata)=>{
    return request(route, {
        method: "POST",
        body: JSON.stringify(bodydata)
    })
}