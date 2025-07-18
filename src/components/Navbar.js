import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function NavigationBar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const nameFromEmail = decoded.email.split('@')[0];
        setUserName(decoded.firstName || nameFromEmail);
        setIsAdmin(decoded.isAdmin || false);
      } catch (err) {
        console.error('Invalid token');
      }
    }

    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    setExpanded(false);
    navigate('/login');
  };

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={(value) => setExpanded(value)}
      className="shadow-sm mb-4"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeMenu}>
          Blogify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/" onClick={closeMenu}>
              Home
            </Nav.Link>

            {token ? (
              <>
                <Nav.Link as={Link} to="/blogs/create" onClick={closeMenu}>
                  Create Blog
                </Nav.Link>

                {isAdmin && (
                  <Nav.Link as={Link} to="/admin/dashboard" onClick={closeMenu}>
                    Admin Dashboard
                  </Nav.Link>
                )}

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
                <Nav.Link as={Link} to="/login" onClick={closeMenu}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={closeMenu}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
