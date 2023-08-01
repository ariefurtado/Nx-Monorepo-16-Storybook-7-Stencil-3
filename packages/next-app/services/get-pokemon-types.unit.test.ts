import axios from 'axios';
import { getPokemonTypes } from './get-pokemon-types';

describe('testing function getPokemonTypes', () => {
  it('fetches Pokemon types successfully', async () => {
    // Arrange
    const expectedTypes = [
      { id: '1', name: 'normal' },
      { id: '2', name: 'fighting' },
      { id: '3', name: 'flying' },
      { id: '4', name: 'poison' },
      { id: '5', name: 'ground' },
      { id: '6', name: 'rock' },
      { id: '7', name: 'bug' },
      { id: '8', name: 'ghost' },
      { id: '9', name: 'steel' },
      { id: '10', name: 'fire' },
      { id: '11', name: 'water' },
      { id: '12', name: 'grass' },
      { id: '13', name: 'electric' },
      { id: '14', name: 'psychic' },
      { id: '15', name: 'ice' },
      { id: '16', name: 'dragon' },
      { id: '17', name: 'dark' },
      { id: '18', name: 'fairy' },
      { id: '10001', name: 'unknown' },
      { id: '10002', name: 'shadow' },
    ];

    // Act
    const types = await getPokemonTypes();

    // Assert
    expect(types).toEqual(expectedTypes);
  });

  it('throws an error if failed to fetch Pokemon types', async () => {
    // Arrange
    const expectedError = new Error('Failed to fetch Pokemon types');
    const axiosMock = jest.spyOn(axios, 'get').mockRejectedValue(expectedError);

    // Act & Assert
    await expect(getPokemonTypes()).rejects.toThrow(expectedError);

    // Clean up
    axiosMock.mockRestore();
  });

  it('returns an empty array if there are no Pokemon types', async () => {
    // Arrange
    const expectedTypes: any[] = [];
    const axiosMock = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { results: [] }, status: 200 });

    // Act
    const types = await getPokemonTypes();

    // Assert
    expect(types).toEqual(expectedTypes);

    // Clean up
    axiosMock.mockRestore();
  });
});
