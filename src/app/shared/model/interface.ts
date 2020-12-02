export enum TYPE_COLOURS {
    bug = '92BC2C',
    dark = '595761',
    dragon = '0C69C8',
    electric = 'F2D94E',
    fairy = 'EE90E6',
    fighting = 'D3425F',
    fire = 'FBA54C',
    flying = 'A1BBEC',
    ghost = '5F6DBC',
    grass = '5FBD58',
    ground = 'DA7C4D',
    ice = '75D0C1',
    normal = 'A0A29F',
    poison = 'B763CF',
    psychic = 'FA8581',
    rock = 'C9BB8A',
    steel = '5695A3',
    water = '539DDF'
  }
  
  export interface Results {
    name: string;
    url: string;
    id?: string;
    details?: PokemonDetails;
    description?: string;
  }
  
  export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
  }
  
  export interface PokemonDetails {
    name: string;
    id: number;
    sprites: Sprites;
    abilities?: Array<any>;
    types?: Array<any>;
  }
  
  export interface Sprites {
    front_default: string;
  }
  