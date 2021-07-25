import User from "../../../models/User";

export const getGHRepositoriesQuery = (user: User) => {
    const { userName } = user;
    return `
    query {
        getGHRepositories(userName: "${userName}"){
          name
          url
          userName
          isFavorite
        }
      }
        `
}

export const setFavoriteGHRepositoryQuery = (name: string, user: User, isFavorite: boolean) => {
    const { userName } = user;
    return `
    mutation {
      setFavorite(name: "${name}", userName: "${userName}", isFavorite: ${isFavorite}){
        name
        url
        userName
        isFavorite
      }
    }
    `
}