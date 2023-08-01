import axios from 'axios';
import { Pokemon, PokemonTypeApiResponse } from '../types/pokemon';
import { getIdFromUrl } from '../utils/get-id-from-url';

export async function getPokemonDataByType(type: string): Promise<Pokemon[]> {
  if (!type) throw new Error('Type not defined');
  const targetUrl = `https://pokeapi.co/api/v2/type/${type}/?limit=12`;

  try {
    const {
      data: { pokemon },
    } = await axios.get<PokemonTypeApiResponse>(targetUrl);

    return pokemon.map(({ pokemon }) => {
      const id = getIdFromUrl(pokemon.url)
      return { id: `${id}`, name: pokemon.name };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
}
