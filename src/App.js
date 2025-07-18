import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import NavigationBar from './components/Navbar';
import BlogForm from './pages/BlogForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blogs/create" element={<BlogForm />} />
            <Route path="/blogs/edit/:id" element={<BlogForm />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
