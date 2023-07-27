/* eslint-disable @next/next/no-img-element */
import { MyButton } from '@monorepo/web-components-react';
import s from './home.styles.module.scss';
import { useEffect, useState } from 'react';
import { getPokemonData } from '../utils/get-pokemon-data';
import { getPokemonTypes } from '../utils/get-pokemon-types';
import { getPokemonDataByType } from '../utils/get-pokemon-data-by-type';

type PokemonList = { name: string; id: number }[];
type PokemonTypeList = { id: number; name: string }[];
export function Index() {
  const [pokemonData, setPokemonData] = useState<PokemonList>([]);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypeList>([]);
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
    setIsLoading(true);
    if (name === typeFilter) return setTypeFilter('');
    setTypeFilter(name);

    const filteredPokemons = await getPokemonDataByType(name);
    if (filteredPokemons) {
      setPokemonData(filteredPokemons);
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
              <MyButton onClick={() => handleFilterClick(type.name)}>
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
