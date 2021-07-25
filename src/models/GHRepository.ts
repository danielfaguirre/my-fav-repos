export default class GHRepository {
    name: string;
    url: string;
    userName: string;
    isFavorite: boolean;

    constructor(name: string, url: string, userName: string, isFavorite: boolean) {
        this.name = name;
        this.url = url;
        this.userName = userName;
        this.isFavorite = isFavorite;
    }
}