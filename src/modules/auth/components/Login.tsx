import React from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import {
  StyledInput,
  StyledLabel,
  InputContainer,
} from "../../../general/components/StyledInput";
import { ILogin } from "../interfaces/Login.model";

export const Login = () => {
  
  function submitCredentials(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: ILogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    
    console.log(data);
  }
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center loginBackground"
      >
        <Row className="justify-content-center w-100 ">
          <Col
            xs={12}
            lg={5}
            md={8}
            className="mb-3 mb-lg-0 justify-content-center align-items-center d-flex"
          >
            <img className="w-50" src="/logo_light.png" alt="" />
          </Col>
          <Col
            xs={12}
            lg={4}
            md={8}
            className="text-lg-start align-items-center "
          >
            <div className="loginFormCard shadow">
              <Form onSubmit={submitCredentials} method="POST">
                <Stack gap={2} className="justify-content-center">
                  <Form.Group>
                    <InputContainer>
                      <StyledInput
                        type="email"
                        placeholder=" "
                        id="email"
                        name="email"
                        required
                      />
                      <StyledLabel htmlFor="email">Correo</StyledLabel>
                    </InputContainer>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <InputContainer>
                      <StyledInput
                        type="password"
                        placeholder=" "
                        id="password"
                        name="password"
                        required
                      />
                      <StyledLabel htmlFor="password">Contraseña</StyledLabel>
                    </InputContainer>
                  </Form.Group>
                  <br></br>
                  <StyledButton
                    as={Button}
                    className="shadow-sm"
                    variant="filled"
                    type="submit"
                  >
                    Iniciar sesión
                  </StyledButton>
                  <Link
                    className="align-self-center loginForgetPassword"
                    to={""}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <Row className="d-flex align-items-center justify-content-center">
                    <Col lg={4} sm={4} xs={4}>
                      <hr className="w-100" />
                    </Col>
                    <Col
                      lg="auto"
                      sm="auto"
                      xs="auto"
                      className="px-2 text-center"
                    >
                      <p className="mb-0">o</p>
                    </Col>
                    <Col lg={4} sm={4} xs={4}>
                      <hr className="w-100" />
                    </Col>
                  </Row>

                  <Link className="align-self-center w-100" to={"/home"}>
                    <StyledButton
                      as={Button}
                      variant="outline"
                      className="w-100 shadow-sm"
                    >
                      Crear cuenta
                    </StyledButton>
                  </Link>
                </Stack>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
