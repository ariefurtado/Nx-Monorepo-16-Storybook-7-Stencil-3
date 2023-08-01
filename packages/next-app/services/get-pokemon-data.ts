import axios from 'axios';
import { getIdFromUrl } from '../utils/get-id-from-url';
import { Pokemon, PokemonApiListResponse } from '../types/pokemon';

export async function getPokemonData(): Promise<Pokemon[]> {
  const targetUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
  try {
    const { data } = await axios.get<PokemonApiListResponse>(targetUrl);

    return data.results.map((pokemon) => {
      const id = getIdFromUrl(pokemon.url);
      return { id, name: pokemon.name };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
}
