import './App.css'
import { NorwayMap } from './components/NorwayMap'

function App() {
  return (
    <>
      <header className="shrink-0 text-center">
        <h1>NCS Explorer</h1>
        <h4>Explore oil and gas data from the Norwegian Continental Shelf</h4>
      </header>
      <main className="relative min-h-0 flex-1">
        <NorwayMap />
      </main>
    </>
  )
}

export default App
