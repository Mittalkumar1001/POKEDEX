import axios from "axios";
import{useState} from "react"
function usePokemonList(){
const [pokemonListState,setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
    nextUrl:'',
    prevUrl:''
});

async function downloadPokemons(){
    setIsLoading(true);

        const response = await axios.get(pokedexUrl)

    const pokemonResults = response.data.results; 
    console.log(response.data);

    setNextUrl(response.data.next)
    setPrevUrl(response.data.previous)

    const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));

    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    const res = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
          
            types: pokemon.types
        }
    })
    console.log(res)
    setPokemonList(res);
    setIsLoading(false);
}
}

export default usePokemonList;