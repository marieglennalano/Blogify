import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  Container,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/blogs/create', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess(true); // trigger animation
      setError('');

      setTimeout(() => {
        navigate('/');
      }, 1500); // redirect after animation
    } catch (err) {
      setSuccess(false);
      setError(err?.response?.data?.message || 'Blog creation failed.');
    }
  };

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
          <Card.Body>
            <h2 className="mb-4 text-center fw-bold">📝 Create New Blog</h2>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert variant="danger">{error}</Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert variant="success" className="text-center fw-bold">
                    🎉 Blog posted successfully!
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                  disabled={success}
                />
              </Form.Group>

              <Form.Group controlId="content" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write your blog here..."
                  required
                  disabled={success}
                />
              </Form.Group>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={success}
                >
                  {success ? 'Redirecting...' : 'Publish Blog'}
                </Button>
              </motion.div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
}
