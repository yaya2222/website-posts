import { SignUpCredentials } from "../network/users_api";
import * as usersApi from "../network/users_api"

export function useUsers(){

    async function signUpUser(credentials:SignUpCredentials){
try {
    const newUser = await usersApi.signUp(credentials)
} catch (error) {
    console.log(error);
    alert(error);
}
    }

    return {signUpUser}
}