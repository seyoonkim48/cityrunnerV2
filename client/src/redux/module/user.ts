import { userApi } from '../../axios/userApi';

const REGISTER_USER = 'user/REGISTER_USER' as const;
const LOGIN_USER = 'user/LOGIN_USER' as const;
const LOGOUT_USER = 'user/LOGOUT_USER' as const;


export const registerUser = (Submitdata: object) => {
const data = userApi.register(Submitdata)
    return {
        type: REGISTER_USER,
        payload: data,
    }
}

export const loginUser = () => {
    return {
        type: LOGIN_USER,
    }
}

export const logoutUser = () =>{
    return {
        type: LOGOUT_USER,
    }
};


type UserAction =
| ReturnType <typeof registerUser>
| ReturnType <typeof loginUser>
| ReturnType <typeof logoutUser>;

type UserState = {
   isLogin: boolean,
   isLoading: boolean,
   isSuccess: boolean,
   userinfo: {
       id?: number,
       email: string,
       nickname: string,
   }
};

const initialState: UserState = {
    isLogin: false,
    isLoading: false,
    isSuccess: false,
    userinfo: {
        email: '',
        nickname: '',
    }
};

export default function user(state: UserState = initialState, action: UserAction) : UserState {
    switch (action.type){
        case REGISTER_USER:
        return {
        ...state,
        isSuccess: true,
        }

        default: return state
    }
}

