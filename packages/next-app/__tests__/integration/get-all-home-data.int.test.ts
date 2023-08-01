import React from 'react';
import { render, screen, waitFor  } from '@testing-library/react';
import { Index } from '../../pages'; // Adjust the import path based on your project structure
import {
  getPokemonData,
  getPokemonTypes,
  getPokemonDataByType,
} from '../../services'; // Adjust the import paths accordingly
import {} from 'jest';

jest.mock('../services', () => ({
  getPokemonData: jest.fn(() =>
    Promise.resolve([{ id: 1, name: 'Bulbasaur' }])
  ),
  getPokemonTypes: jest.fn(() => Promise.resolve([{ id: 1, name: 'Grass' }])),
  getPokemonDataByType: jest.fn(() =>
    Promise.resolve([{ id: 1, name: 'Bulbasaur' }])
  ),
}));

describe('Index component', () => {
  beforeEach(() => {
    render(<Index />);
  });

  it('should render the Pokédex title', () => {
    const titleElement = screen.getByText(/Pokédex/i);
    expect(titleElement).to();
  });

  it('should display loading text while fetching data', async () => {
    const loadingElement = screen.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();

    await waitFor(() => {
      expect(loadingElement).not.toBeInTheDocument();
    });
  });

  it('should render a list of Pokémon types', async () => {
    const typeElement = await screen.findByText(/Grass/i);
    expect(typeElement).toBeInTheDocument();
  });

  it('should filter Pokémon data by type when a type button is clicked', async () => {
    const typeElement = await screen.findByText(/Grass/i);
    expect(typeElement).toBeInTheDocument();

    typeElement.click();

    // Check if the filter is applied
    const filterElement = await screen.findByText(/Current filter: Grass/i);
    expect(filterElement).toBeInTheDocument();

    // Check if the filtered Pokémon is displayed
    const pokemonElement = await screen.findByText(/Bulbasaur/i);
    expect(pokemonElement).toBeInTheDocument();
  });
});
