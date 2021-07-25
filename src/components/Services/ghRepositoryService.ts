import { getGHRepositoriesQuery, setFavoriteGHRepositoryQuery } from './Graphql/GHRepositoryQueries';
import GHRepository from '../../models/GHRepository';
import User from '../../models/User';
import { fetchGraphql } from './helper';

export const getGHRepositories = async (user: User): Promise<{ ghRepositories: GHRepository[], error: string }> => {
    const query = getGHRepositoriesQuery(user);
    const { data, errors } = await fetchGraphql(query, 'gh_repositories');
    return {
        ghRepositories: data?.getGHRepositories,
        error: errors?.[0]?.message
    };
}

export const setFavoriteGHRepository = async (name: string, user: User, isFavorite: boolean): Promise<{ ghRepository: GHRepository, error: string }> => {
    const query = setFavoriteGHRepositoryQuery(name, user, isFavorite);
    const { data, errors } = await fetchGraphql(query, 'gh_repositories');
    return {
        ghRepository: data?.setFavorite,
        error: errors?.[0]?.message
    };
}