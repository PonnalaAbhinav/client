import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user:{
        "_id": {
          "$oid": "649c764e837c490f64dc8dfa"
        },
        "username": "jame",
        "email": "jame@gmail.com",
        "password": "$2b$10$TULdn0z9EffSscPPD86Og.oxlTfcJETEFGHhb1tqArpinpITEFJhm",
        "profilePicture": "person/1.jpeg",
        "coverPicture": "",
        "followers": [],
        "followings": [
          "649c774e837c490f64dc8e02"
        ],
        "isAdmin": false,
        "createdAt": {
          "$date": "2023-06-28T18:05:02.542Z"
        },
        "updatedAt": {
          "$date": "2023-06-29T10:10:54.552Z"
        },
        "__v": 0
      },
    isFetching:false,
    error:false
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{

    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}