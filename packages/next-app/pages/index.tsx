/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { MyButton } from '@monorepo/web-components-react';
import { getPokemonData } from '../services/get-pokemon-data';
import { getPokemonDataByType } from '../services/get-pokemon-data-by-type';
import { getPokemonTypes } from '../services/get-pokemon-types';
import { Pokemon } from '../types/pokemon';
import s from './home.styles.module.scss';

export function Index() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<Pokemon[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    (async () => {
      const pokemonTypes = await getPokemonTypes();

      const pokemonData = await getPokemonData();

      if (pokemonTypes) {
        setPokemonTypes(pokemonTypes);
      }
      if (pokemonData) {
        setPokemonData(pokemonData);
      }
    })();
  }, []);



  const handleFilterClick = async (name: string) => {
    if (name === typeFilter) {
      const pokemonData = await getPokemonData();
      if (pokemonData) {
        setTypeFilter('')
        setPokemonData(pokemonData);
        return
      }

    };

    setIsLoading(true);
    
    const filteredPokemons = await getPokemonDataByType(name);
    if (filteredPokemons) {
      setPokemonData(filteredPokemons);
      setTypeFilter(name);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <nav className={s.wrapper}>
        <h1 className={s.title}>Pokédex</h1>
        <ul className={s.nav}>
          {pokemonTypes.map((type) => (
            <li key={type.id}>
              <MyButton onClick={() => handleFilterClick(type.name)} active={typeFilter === type.name}>
                <p>{type.name}</p>
              </MyButton>
            </li>
          ))}
        </ul>

        <div className={s.stats}>
          <p>Current filter: {typeFilter}</p>
          <p>Count: {pokemonData.length}</p>
        </div>
      </nav>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className={s.pokemonListing}>
          {pokemonData.map((pokemon) => (
            <div className={s.card} key={pokemon.name}>
              <div className={s.cardTitle}>
                <p>{pokemon.name}</p>
              </div>
              <div className={s.thumb}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
