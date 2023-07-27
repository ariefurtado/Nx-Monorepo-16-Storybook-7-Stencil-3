export async function getPokemonDataByType(type: string) {
  if (!type) return;
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://pokeapi.co/api/v2/type/${type}/?limit=12`;
  try {
    const response = await fetch(corsProxyUrl + targetUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.pokemon.map((pokemon: any) => {
      const splitedUrl = pokemon.pokemon.url.split('/');
      const id = splitedUrl[splitedUrl.length - 2];

      return { id: id, name: pokemon.pokemon.name };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
