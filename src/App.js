import './App.css';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import logo from './Egal-News.jpeg';

function App() {
  const [mydata, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('allNews');  

  const apiUrls = {
    allNews: 'https://inshorts.me/news/all?offset=0&limit=21',
    topNews: 'https://inshorts.me/news/top?offset=0&limit=21',
    trendingNews: 'https://inshorts.me/news/trending?offset=0&limit=21',
    scienceNews: 'https://inshorts.me/news/topics/science',
    entertainmentNews: 'https://inshorts.me/news/topics/entertainment',
    sportsNews: 'https://inshorts.me/news/topics/sports',
  };

  const apiget = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.data.articles);
      });
  };

  useEffect(() => {
    apiget(apiUrls[activeCategory]);
    const interval = setInterval(() => {
      apiget(apiUrls[activeCategory]);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="News App Logo"
          />
          {' News App'}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setActiveCategory('allNews')}>All News</Nav.Link>
          <Nav.Link onClick={() => setActiveCategory('topNews')}>Top News</Nav.Link>
          <Nav.Link onClick={() => setActiveCategory('trendingNews')}>Trending News</Nav.Link>
          <Nav.Link onClick={() => setActiveCategory('scienceNews')}>Science News</Nav.Link>
          <Nav.Link onClick={() => setActiveCategory('entertainmentNews')}>Entertainment News</Nav.Link>
          <Nav.Link onClick={() => setActiveCategory('sportsNews')}>Sports News</Nav.Link>
        </Nav>
      </Navbar>

      <Row xs={1} md={3} className="g-4">
        {mydata.map((value) => (
          <Col className="container-fluid mt-4" key={value.id}>
            <Card>
              <Card.Img variant="top" src={value.imageUrl} />
              <Card.Body>
                <Card.Title>{value.title}</Card.Title>
                <Card.Text>{value.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;