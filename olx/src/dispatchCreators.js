export function setUserDispatch(uid){
    return {
        type: "auth/setUser",
        payload: uid
    }
}


export function setPostDetailsDispatch(details){
    return {
        type: "post/setDetails",
        payload: details
    }
}