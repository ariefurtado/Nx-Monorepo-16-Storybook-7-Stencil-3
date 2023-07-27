export async function getPokemonData() {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
    try {
      const response = await fetch(corsProxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      return data.results.map((pokemon: any) => { 
        const splitedUrl = pokemon.url.split('/');
        const id = splitedUrl[splitedUrl.length - 2]
        return{ id: id, name: pokemon.name }
    })

    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
}