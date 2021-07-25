import User from '../../models/User';
import { getSignInQuery, getSignUpMutation, getLogOutQuery } from './Graphql/UserQueries';
import { fetchGraphql } from './helper';

export const signUpUser = async (user: User): Promise<{ user: User, error: string }> => {
    const query = getSignUpMutation(user);
    const { data, errors } = await fetchGraphql(query, 'users');
    return {
        user: data?.signUpUser,
        error: errors?.[0]?.message
    };
}

export const signIn = async (user: User): Promise<{ user: User, error: string }> => {
    const query = getSignInQuery(user);
    const { data, errors } = await fetchGraphql(query, 'users');
    return {
        user: data?.SignInUser,
        error: errors?.[0]?.message
    };
}

export const logOut = async (user: User): Promise<{ user: User, error: string }> => {
    const query = getLogOutQuery(user);
    const { data, errors } = await fetchGraphql(query, 'users');
    return {
        user: data?.logOutUser,
        error: errors?.[0]?.message
    };
}