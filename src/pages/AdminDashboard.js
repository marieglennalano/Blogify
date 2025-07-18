// src/pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from '../api/axios';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [blogsRes, usersRes, commentsRes] = await Promise.all([
        axios.get('/blogs/all', config),
        axios.get('/users/all', config),
        axios.get('/comments/all', config)
      ]);

      setBlogs(blogsRes.data);
      setUsers(usersRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  return (
    <Container className="py-4">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin Dashboard
      </motion.h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Blogs</Card.Title>
              <h3>{blogs.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3>{users.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Total Comments</Card.Title>
              <h3>{comments.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h4>📋 Recent Blogs</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.slice(0, 5).map(blog => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.author?.firstName} {blog.author?.lastName}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="outline-danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
