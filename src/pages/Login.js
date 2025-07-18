import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
  InputGroup
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/users/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.removeItem('avatar');
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('/users/google-login', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      if (res.data.avatar) {
        localStorage.setItem('avatar', res.data.avatar);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Google login failed.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login was unsuccessful. Try again.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-sm border-0">
                <Card.Body className="px-3 px-md-4">
                  <h2 className="text-center mb-4">Welcome Back</h2>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="danger">{error}</Alert>
                    </motion.div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                        {form.password.length > 0 && (
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        )}
                      </InputGroup>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 mb-3"
                      as={motion.button}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Logging in...
                        </>
                      ) : (
                        'Log In'
                      )}
                    </Button>
                  </Form>

                  <div className="text-center text-muted mb-3">or</div>

                  <div className="d-flex justify-content-center mb-3">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      width="100%"
                    />
                  </div>

                  <p className="text-center mt-3 mb-0 small">
                    Don't have an account?{' '}
                    <Link to="/register" className="fw-semibold">
                      Register here
                    </Link>
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
