import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      // Edit mode - fetch blog data
      axios.get(`/blogs/view/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => {
          setError('Failed to fetch blog for editing.');
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (id) {
        // Update blog
        await axios.patch(`/blogs/edit/${id}`, { title, content }, config);
        alert('Blog updated successfully!');
      } else {
        // Create new blog
        await axios.post('/blogs/create', { title, content }, config);
        alert('Blog created successfully!');
      }

      navigate('/');
    } catch (err) {
      console.error('Submit error:', err?.response?.data);
      setError(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">{id ? 'Edit Blog' : 'Create New Blog'}</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="content" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {id ? 'Update Blog' : 'Post Blog'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
