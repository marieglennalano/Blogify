import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const nameFromEmail = decoded.email.split('@')[0];
        setUserName(decoded.firstName || nameFromEmail);
      } catch (err) {
        console.error('Invalid token');
      }
    }

    // Check if avatar exists (from Google login)
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Blogify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {token ? (
              <>
                <Nav.Link as={Link} to="/blogs/create">Create Blog</Nav.Link>
                <span className="navbar-text text-white me-2">
                  Welcome, {userName}!
                </span>

                {avatar && (
                  <Image
                    src={avatar}
                    alt="avatar"
                    roundedCircle
                    width={36}
                    height={36}
                    className="me-2"
                    style={{ objectFit: 'cover', border: '2px solid white' }}
                  />
                )}

                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
