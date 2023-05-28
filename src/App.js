import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
function App() {
  const client = new ApolloClient({
    uri: 'https://graphqlpokemon.favware.tech/v7',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route exact path="/" element={<PokemonList />} />
        <Route exact path="/details" element={<PokemonDetail />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
