import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookDetails from './components/BookDetails'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/view/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
