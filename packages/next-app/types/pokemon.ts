export interface Pokemon {
  name: string;
  id: string;
}

export interface BaseItem {
  name: string;
  url: string;
}

export interface PokemonTypeApiResponse {
  damage_relations: Damagerelations;
  game_indices: Gameindex[];
  generation: BaseItem;
  id: number;
  move_damage_class: BaseItem;
  moves: BaseItem[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: PokemonList[];
}

interface PokemonList {
  pokemon: BaseItem;
  slot: number;
}

interface Name {
  language: BaseItem;
  name: string;
}

interface Gameindex {
  game_index: number;
  generation: BaseItem;
}

interface Damagerelations {
  double_damage_from: BaseItem[];
  double_damage_to: any[];
  half_damage_from: any[];
  half_damage_to: BaseItem[];
  no_damage_from: BaseItem[];
  no_damage_to: BaseItem[];
}

export interface PokemonApiListResponse {
  count: number;
  next?: any;
  previous?: any;
  results: BaseItem[];
}

export interface BaseItem {
  name: string;
  url: string;
}
