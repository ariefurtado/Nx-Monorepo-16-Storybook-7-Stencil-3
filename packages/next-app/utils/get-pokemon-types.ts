export async function getPokemonTypes() {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://pokeapi.co/api/v2/type';
    try {
      const response = await fetch(corsProxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      return data.results

    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
}