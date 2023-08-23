import React, { useEffect, useState } from 'react'
import './PokemonDetails.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const PokemonDetails = () => {

    const [pokemon, setPokemon] = useState(null);

    const {id} = useParams();
    const POKEMON_DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/"

    async function downloadPokemon(){
        const response = await axios.get(`${POKEMON_DETAILS_URL}${id}`)

        const pokemon = response.data;
        setPokemon({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types,
            image: pokemon.sprites.other.dream_world.front_default
        })
    }

    useEffect(() => {
      downloadPokemon()
    }, [])
    
    return (
        pokemon && <>
            <Link to="/">
                <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </Link>
            <div className='pokemon-details-wrapper'>
                <div className='pokemon-name-d'>
                    {pokemon.name}
                </div>
                <div>
                    <img className='pokemon-image-d' src={pokemon.image}/>
                </div>
                <div className='pokemon-attr'>
                    <div>Height : {pokemon.height}</div>
                    <div>Width : {pokemon.weight}</div>
                </div>
                <div className='pokemon-type'>
                    <span>Type :</span> {pokemon.types.map((t) => <span className='type' key={t.type.name}>{t.type.name}</span>)}
                </div>
            </div>
        </>
    )
}

export default PokemonDetails