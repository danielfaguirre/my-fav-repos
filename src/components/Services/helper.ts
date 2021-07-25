export const fetchGraphql = async (query: string, endpoint:string) => {
    const response = await fetch(`http://localhost:3001/graphql/${endpoint}`, {
        method: 'POST',
        body: query,
        headers: {
            'Content-Type': 'application/graphql'
        }
    });
    return await response.json();
}