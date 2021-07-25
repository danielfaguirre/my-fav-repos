import User from '../../../models/User';

export const getSignUpMutation = (user: User) => {
    const { userName, password } = user;
    return `
        mutation {
            signUpUser(userName: "${userName}", password: "${password}"){
                userName
                isAuth
            }
        }
        `
}

export const getSignInQuery = (user: User) => {
    const { userName, password } = user;
    return `
    query {
        SignInUser(userName: "${userName}", password: "${password}"){
            userName
            isAuth
        }
      }
        `
}

export const getLogOutQuery = (user: User) => {
    const { userName } = user;
    return `
    query {
        logOutUser(userName: "${userName}"){
            userName
            isAuth
        }
      }
        `
}