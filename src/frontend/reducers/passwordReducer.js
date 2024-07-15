export const initialPasswordState={
    passwordLoading:false,
    passwords:[],
    passwordSearch:"",
    page:1
}

export const passwordReducerFunction=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case "LOADING":
            return {...state,passwordLoading:payload};
        case "SET_PASSWORDS":
            return {...state,passwords:[...payload]}
        case "PASSWORD_SEARCH":
            return {...state,passwordSearch:payload};
        case "SHOW_MORE":
            return {...state,page:state.page+1}
        default:
            return state;
    }
}