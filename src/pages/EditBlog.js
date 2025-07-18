import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blog, setBlog] = useState(null);

  const token = localStorage.getItem('token');
  let tokenUserId = '';
  let isAdmin = false;

  if (token) {
    const decoded = jwtDecode(token);
    tokenUserId = decoded.id;
    isAdmin = decoded.isAdmin;
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/blogs/view/${id}`);
      setBlog(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to fetch blog.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `/blogs/edit/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Blog updated successfully!');
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Update error:', err);
      alert(err?.response?.data?.message || 'Update failed');
    }
  };

  if (!token) {
    return (
      <Container className="mt-5">
        <Card body className="text-center">
          <h5>Please login to edit blog posts.</h5>
        </Card>
      </Container>
    );
  }

  if (!blog) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (blog.authorId !== tokenUserId && !isAdmin) {
    return (
      <Container className="mt-5">
        <Card body className="text-center text-danger">
          <h5>Access Denied. You can only edit your own blog.</h5>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Edit Blog</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="editTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Edit blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Edit your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Update Blog
        </Button>
      </Form>
    </Container>
  );
}
