export const fetchStarWars = async (number: number) => {
  let starWarsAPI = 'https://swapi.dev/api/'
  let response = await fetch(`${starWarsAPI}people/${number}/`);
  return await checkForError(response);
};

const checkForError = async (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  } else {
    return await response.json();
  }
};