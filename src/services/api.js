const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 150, offset = 0) => {
    const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
        throw new Error('Pokemon listesi yuklenemedi. API hatasi.');
    }
    const data = await response.json();
    return data.results;
};

export const fetchPokemonDetail = async (nameOrId) => {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
        throw new Error(`${nameOrId} adli Pokemon bulunamadi.`);
    }
    const data = await response.json();
    console.log('API den gelen Pokemon verisi:', data);
    return data;
};

export const fetchPokemonSpecies = async (name) => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);
    if (!response.ok) {
        throw new Error('Tur bilgisi yuklenemedi.');
    }
    const data = await response.json();
    return data;
};
