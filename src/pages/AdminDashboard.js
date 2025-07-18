// src/pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from '../api/axios';

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [blogsCountRes, usersCountRes, commentsCountRes, recentBlogsRes] = await Promise.all([
        axios.get('/admin/blogs/count', config),
        axios.get('/admin/users/count', config),
        axios.get('/admin/comments/count', config),
        axios.get('/admin/blogs/recent', config)
      ]);

      setBlogCount(blogsCountRes.data.count);
      setUserCount(usersCountRes.data.count);
      setCommentCount(commentsCountRes.data.count);
      setRecentBlogs(recentBlogsRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const handleDeleteBlog = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/blogs/remove/${id}`, config);
      setRecentBlogs(prev => prev.filter(blog => blog._id !== id));
      setBlogCount(prev => prev - 1);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete blog.');
    }
  };

  return (
    <Container className="py-4">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Admin Dashboard</motion.h2>

      <Row className="mb-4 mt-3">
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Blogs</Card.Title>
              <h3>{blogCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3>{userCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Total Comments</Card.Title>
              <h3>{commentCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mb-3">📋 Recent Blogs</h4>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentBlogs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No recent blogs found.</td>
            </tr>
          ) : (
            recentBlogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.author?.firstName} {blog.author?.lastName}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}
