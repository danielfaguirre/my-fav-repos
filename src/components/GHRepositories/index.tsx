import React, { useEffect, useState } from 'react';
import GHRepository from '../../models/GHRepository';
import User from '../../models/User';
import MyErrorMessage from '../Common/MyErrorMessage';
import { getGHRepositories, setFavoriteGHRepository } from '../Services/ghRepositoryService';

type Props = {
    user: User;
};
export const GHRepositories = (props: Props) => {
    const { user } = props;
    const [myRepositories, setMyRepositories] = useState([] as GHRepository[]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [favoriteOnly, setFavoriteOnly] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchRepositories = async () => {
            const { ghRepositories, error } = await getGHRepositories(user);
            if (ghRepositories) {
                setLoading(false);
                setMyRepositories(ghRepositories);
                console.log(ghRepositories)

            }
            if (error)
                setError(error);
        }
        fetchRepositories();
    }, [user]);

    const setAsFavorite = async (name: string, isFavorite: boolean) => {
        const { ghRepository, error } = await setFavoriteGHRepository(name, user, isFavorite);
        let myRepositoryTemp = [...myRepositories];
        if (error)
            setError(error);
        if (ghRepository) {
            const index = myRepositories.findIndex(item => item.name === ghRepository.name);
            myRepositoryTemp[index].isFavorite = ghRepository.isFavorite;
            setMyRepositories(myRepositoryTemp);
        }
    }

    if (loading)
        return <p>Loading...</p>

    if (error)
        return <MyErrorMessage errorMessage={error} />

    if (myRepositories.length === 0)
        return (
            <p className='text-muted text-center mt-2'>
                You don't have any repository created on Git hub. To create your first repository visit <a className='text-dark' rel="noreferrer" target="_blank" href="https://github.com">https://github.com</a>
            </p>
        )

    return (
        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 p-3">
            <p className='text-muted text-center mt-2'>
                <i className="bi-info-circle-fill me-2" /> Search your repository and clicking the star to add to your favorite list.
            </p>
            <div className="input-group mb-3">
                <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click for filter your favorite repositories"
                    className={`${favoriteOnly ? 'bi-star-fill text-warning' : 'bi-star'} input-group-text`}
                    onClick={() => setFavoriteOnly(!favoriteOnly)}
                />
                <input
                    placeholder="Search..."
                    className="form-control"
                    onChange={e => setFilter(e.target.value)}
                    type="text"
                    value={filter} />
            </div>
            <ul className="list-group">
                {
                    myRepositories.filter(item => {
                        if (favoriteOnly)
                            return item.isFavorite
                        else
                            return item;
                    }).filter(item => {
                        return item.name
                            .toLowerCase()
                            .includes(
                                filter.toLowerCase()
                            );
                    })/* .sort(item =>
                        item.isFavorite ? -1 : 1
                    ) */.map((repo, index) =>
                        <li
                            key={index}
                            className="list-group-item list-group-item-action">
                            <i
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={repo.isFavorite ? "Click to remove from your favorite list" : "Click to add to your favorite list"}
                                className={`${repo.isFavorite ? 'bi-star-fill text-warning' : 'bi-star'}  me-4 float-start`}
                                onClick={() => setAsFavorite(repo.name, !repo.isFavorite)}
                            />
                            <h5>
                                <a
                                    className={`${repo.isFavorite ? 'text-dark' : 'text-muted'} text-decoration-none`}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={repo.url}>
                                    {repo.name}
                                </a>
                            </h5>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};