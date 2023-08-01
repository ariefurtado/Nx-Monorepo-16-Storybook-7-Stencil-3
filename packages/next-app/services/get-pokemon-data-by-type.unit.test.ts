import axios from 'axios';
import { getPokemonDataByType } from './get-pokemon-data-by-type';
import { Pokemon } from '../types/pokemon';

describe('testing function getPokemonDataByType', () => {
  it('should return an array of objects with id and name properties when given valid type', async () => {
    // Arrange
    const type = 'fire';
    const mockData = {
      pokemon: [
        {
          pokemon: {
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
            name: 'charmander',
          },
        },
        {
          pokemon: {
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
            name: 'charmeleon',
          },
        },
      ],
    };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

    // Act
    const result: Pokemon[] = await getPokemonDataByType(type);

    // Assert
    expect(result).toEqual([
      { id: '4', name: 'charmander' },
      { id: '5', name: 'charmeleon' },
    ]);
  });
});
