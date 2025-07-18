import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import {
  Card,
  Button,
  Form,
  Container,
  Alert,
  Row,
  Col
} from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  let tokenUserId = '';
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      tokenUserId = decoded.id;
      isAdmin = decoded.isAdmin;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/blogs/view/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error('Failed to fetch blog:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/blog/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/comments/add/${id}`,
        { comment: text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setText('');
      setError('');
      fetchComments();
    } catch (err) {
      console.error('Comment Error:', err?.response?.data);
      setError(err?.response?.data?.message || 'Comment failed.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await axios.delete(`/blogs/remove/${blog._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Delete Error:', err?.response?.data);
      alert(err?.response?.data?.message || 'Failed to delete blog.');
    }
  };

  const handleDeleteComment = async (commentId) => {
  if (!window.confirm('Are you sure you want to delete this comment?')) return;

  try {
    await axios.delete(`/comments/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchComments(); // Refresh comments after deletion
  } catch (err) {
    console.error('Failed to delete comment:', err?.response?.data);
    alert(err?.response?.data?.message || 'Failed to delete comment.');
  }
};

  const blogAuthorId = blog.authorId || blog.author?._id;

  return (
    <Container className="my-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Card.Title as="h2" className="fw-bold">{blog.title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              By {blog.author?.firstName || 'Unknown'} {blog.author?.lastName || ''} &bull;{' '}
              {new Date(blog.createdAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</Card.Text>

            {(tokenUserId === blogAuthorId || isAdmin) && (
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to={`/blogs/edit/${blog._id}`}>
                  <Button variant="outline-primary" size="sm">Edit</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </motion.div>

      <h4 className="mb-4">💬 Comments</h4>

      {comments.length === 0 ? (
        <p className="text-muted">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <Row className="g-2 align-items-center">
                  <Col xs="auto">
                    <img
                      src={`https://ui-avatars.com/api/?name=${comment.user?.firstName || 'A'}&background=0D8ABC&color=fff`}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-circle"
                      style={{ objectFit: 'cover' }}
                    />
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Text className="mb-0">{comment.comment}</Card.Text>
                      {isAdmin && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                    <div className="text-muted small mt-1">
                      — {comment.user?.firstName || 'Anonymous'} {comment.user?.lastName || ''}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        ))
      )}

      {token && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form onSubmit={handleCommentSubmit} className="mt-4">
            <Form.Group controlId="comment">
              <Form.Label className="fw-semibold">Write a Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                required
              />
            </Form.Group>
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            <Button variant="success" type="submit" className="mt-3">
              Post Comment
            </Button>
          </Form>
        </motion.div>
      )}
    </Container>
  );
}
