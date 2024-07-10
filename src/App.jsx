import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './App.css';

const fetchCharacters = async (page) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return res.data;
};

function App() {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery(['characters', page], () => fetchCharacters(page), {
    keepPreviousData: true,
  });

  return (
    <div className="App">
      <h1 align="center">Rick and Morty</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="rows">
            {data.results.map((character) => (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name} />
                <p><b>{character.name}</b></p>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                
                <p>Last seen on: {character.origin.name}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (!data.info.next) return;
                setPage((old) => old + 1);
              }}
              disabled={!data.info.next}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;