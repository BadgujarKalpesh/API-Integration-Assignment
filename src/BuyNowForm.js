import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function BuyNowForm({ onBack }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Order submitted! (This is a demo)');
    onBack(); 
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Shipping Information</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" placeholder="1234 Main St" required />
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                    Submit Order
                </Button>
                <Button variant="secondary" onClick={onBack}>
                    Back to Products
                </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BuyNowForm;