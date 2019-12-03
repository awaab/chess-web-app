const {createStore} = require('redux');

const initialState = {
    logged_in : false,
    session_key : None,
}

const Reducer = (state = initialState,action)=>{
    const newState = {...state};
    if(action.type==="LOGIN"){
        newState.logged_in = true;
    }

    if(action.type==="LOGOUT"){
       newState.logged_in = false;
    }

    if(action.type==="LOGOUT"){
       newState.logged_in = false;
    }

    return newState;
};

const Subscriber = ()=>{
    console.log(store.getState());
}