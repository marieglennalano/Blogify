import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <small>
          &copy; {new Date().getFullYear()} <strong>Blogify</strong>. All rights reserved.
        </small>
      </Container>
    </footer>
  );
}
