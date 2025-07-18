import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/blogs/all');
      setBlogs(res.data.reverse());
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const trending = blogs.slice(0, 2);
  const latest = blogs.slice(2);

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1503264116251-35a269479413)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh'
        }}
      >
        <Container>
          <h1 className="fw-bold display-5 display-md-4">Welcome to Blogify</h1>
          <p className="lead">Discover stories, insights, and expertise from writers on any topic.</p>
          <Link to="/blogs/create">
            <Button variant="light" size="lg" className="mt-3">
              Start Writing
            </Button>
          </Link>
        </Container>
      </motion.div>

      <Container className="py-5">
        {/* Trending Posts */}
        {trending.length > 0 && (
          <>
            <h2 className="mb-4 text-center text-md-start">🔥 Trending Posts</h2>
            <Row className="mb-5 g-4">
              {trending.map((blog, index) => (
                <Col xs={12} md={6} key={blog._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Card className="shadow-sm h-100">
                      <Card.Img
                        variant="top"
                        src={`https://picsum.photos/600/300?random=${blog._id}`}
                        alt="Blog cover"
                        style={{ objectFit: 'cover', height: '200px' }}
                      />
                      <Card.Body>
                        <Card.Title className="fs-5">{blog.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          By {blog.author.firstName} {blog.author.lastName}
                        </Card.Subtitle>
                        <Card.Text className="text-truncate">
                          {blog.content.length > 120
                            ? blog.content.slice(0, 120) + '...'
                            : blog.content}
                        </Card.Text>
                        <Link to={`/blogs/${blog._id}`}>
                          <Button variant="primary" size="sm">Read More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Latest Blog Posts */}
        <h2 className="mb-4 text-center text-md-start">📝 Latest Posts</h2>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {latest.map((blog, index) => (
            <Col key={blog._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`https://picsum.photos/400/200?random=${blog._id}`}
                    alt="Blog cover"
                    style={{ objectFit: 'cover', height: '180px' }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6">{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      By {blog.author.firstName} {blog.author.lastName}
                    </Card.Subtitle>
                    <Card.Text className="text-truncate">
                      {blog.content.length > 100
                        ? blog.content.slice(0, 100) + '...'
                        : blog.content}
                    </Card.Text>
                    <Link to={`/blogs/${blog._id}`}>
                      <Button variant="outline-primary" size="sm">Read More</Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer className="text-muted small">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Card.Footer>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
