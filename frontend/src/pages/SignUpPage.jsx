import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

import SignUpForm from '../components/forms/SingUpForm';

const SignUpPage = () => (
  <Container className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xxl={5} md={8} xs={12}>
        <Card className="shadow">
          <Card.Body className="row p-2 p-md-5">
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;
