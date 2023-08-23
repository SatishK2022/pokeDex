import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = () => {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
    const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);
    const [nextUrl, setNextUrl] = useState(DEFAULT_URL);

    async function downloadPokemon() {
        const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);

        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);

        const pokemonResult = response?.data?.results; // Array of pokemon
        const pokemonPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url)) // Getting Promise to pokemon url
        const pokemonListData = await axios.all(pokemonPromise); // Resolving all the promise

        const finalPokemonList = pokemonListData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })

        setPokemonList(finalPokemonList);
        console.log(finalPokemonList)
    }

    useEffect(() => {
        downloadPokemon()
    }, [pokedexUrl])
    

  return (
    <div className='pokemon-list-wrapper'>
        <div className='pokemon-list-title'>
            <p>Pokemon List</p>
        </div>
        <div className="page-controls">
            <button onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
            <button onClick={() => setPokedexUrl(nextUrl)}>Next</button>
        </div>
        <div className="pokemon-list">
            {pokemonList.map((pokemon) => <Pokemon name={pokemon.name} url={pokemon.image} key={pokemon.id} id={pokemon.id}/>)}
        </div>
    </div>
  )
}

export default PokemonList