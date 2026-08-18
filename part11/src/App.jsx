import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <main>
      <h1>Pokedex</h1>
      <Link to="/pokemon/ivysaur">ivysaur</Link>
      <p>Pokémon and Pokémon character names are trademarks of Nintendo.</p>
    </main>
  )
}

function Ivysaur() {
  return (
    <main>
      <h1>ivysaur</h1>
      <p>chlorophyll</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/ivysaur" element={<Ivysaur />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
