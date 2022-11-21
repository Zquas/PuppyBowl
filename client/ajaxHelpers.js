// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-UNF-HY-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


export const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${APIURL}players`, { method: 'GET'});
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return result.data.players;
    } catch (error) {
      console.error('Uh oh, trouble fetching players!', error);
    }
  };

export const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(
          `${APIURL}/players/${playerId}`
        );
        const result = await response.json();
        console.log(result);
        if (result.error) {
            throw result.error;
        }
        return await result.data.player;
    } catch (error) {
        console.error('Uh oh, trouble fetching playerId!', error);
      }
};

export const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(
          `${APIURL}/players/`,
          {
            method: 'POST',
            body: JSON.stringify(playerObj),
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        const result = await response.json();
        console.log(result);
        return result;
      } catch (err) {
        console.error(err);
      }
};

export const removePlayer = async (playerId) => {
    fetch(`${APIURL}/players/${playerId}`, {
    method: 'DELETE',
  });
  try {
    const response = await fetch(
      `${APIURL}/players/1`,
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
