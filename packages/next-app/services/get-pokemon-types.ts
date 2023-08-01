import axios from 'axios';
import { Pokemon, PokemonApiListResponse } from '../types/pokemon';
import { getIdFromUrl } from '../utils/get-id-from-url';

export async function getPokemonTypes(): Promise<Pokemon[]> {
  const targetUrl = 'https://pokeapi.co/api/v2/type';
  try {
    const { data } = await axios.get<PokemonApiListResponse>(targetUrl);

    return data.results.map(({ name, url }) => {
      const id = getIdFromUrl(url);
      return { id: id, name: name };
    });

  } catch (error) {
    throw new Error('Failed to fetch Pokemon types');
  }
}
