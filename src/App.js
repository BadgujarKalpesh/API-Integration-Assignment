import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import BuyNowForm from './BuyNowForm'; 
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBuyForm, setShowBuyForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleBuyNowClick = () => {
      setShowBuyForm(true);
  };

  const handleBackToProducts = () => {
      setShowBuyForm(false);
  };

  if (showBuyForm) {
    return <BuyNowForm onBack={handleBackToProducts} />;
  }

  return (
    <div className="App">
      <Container>
        <h1 className="my-4 text-center">Product Listing</h1>
        <Row>
          {products.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="product-title">{product.title}</Card.Title>
                  <Card.Text className="product-price">${product.price}</Card.Text>
                  <Card.Text>Rating: {product.rating.rate} ({product.rating.count} reviews)</Card.Text>
                  <div className="mt-auto">
                    <Button variant="primary" className="me-2" onClick={() => handleViewClick(product)}>View</Button>
                    <Button variant="success" onClick={handleBuyNowClick}>Buy Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col md={6}>
                    <img src={selectedProduct.image} alt={selectedProduct.title} className="img-fluid modal-image" />
                </Col>
                <Col md={6}>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p>{selectedProduct.description}</p>
                    <h4>Price: ${selectedProduct.price}</h4>
                    <p><strong>Rating:</strong> {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
             <Button variant="success" onClick={() => { handleCloseModal(); handleBuyNowClick(); }}>
              Buy Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;