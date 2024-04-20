/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

const dataUser = require("../../fixtures/user.json");


describe("Testes relacionados a criação de usuários", () => {

  const failOnStatusCode = false;

  // Tests Status code 2xx - STARTS HERE -

  it("POST criando usuário com sucesso", () => {

    //Arrange and Action
    cy.createUser(dataUser.createUser).then((response) => {
      const bodyToReceive = {
        id: response.body.id,
        name: dataUser.createUser.name,
        email: dataUser.createUser.email,
        type: 0,
        active: true,
      };

      //Assert
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a("number");
      expect(response.body).to.deep.eq(bodyToReceive);
    });

    //Clean Data
    cy.authUser(dataUser.createUser.email, dataUser.createUser.password);
    cy.inactivateUser();
  });

  // Tests Status code 2xx - ENDS HERE -

  // Tests Status code 4xx - STARTS HERE -
  it("POST deve retornar erro ao tentar criar um usuário com email inválido", () => {

    //Arrange
    const bodyToReceive = {
      name: dataUser.createUser.name,
      email: "annwalkr@mailinatorcom",
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: ["email must be an email"],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive,failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

  it("POST deve retornar erro ao tentar criar um usuário com senha menor que 6 caracteres", () => {

    //Arrange
    const bodyToReceive = {
      name: dataUser.createUser.name,
      email: dataUser.createUser.email,
      password: faker.internet.password({ length: 5 }),
    };

    const bodyResponse = {
      message: ["password must be longer than or equal to 6 characters"],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive,failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

    it("POST deve retornar erro ao tentar criar um usuário com senha maior que 12 caracteres", () => {

      //Arrange
      const bodyToReceive = {
        name: dataUser.createUser.name,
        email: dataUser.createUser.email,
        password: faker.internet.password({ length: 13 }),
      };

      const bodyResponse = {
        message: ["password must be shorter than or equal to 12 characters"],
        error: "Bad Request",
        statusCode: 400,
      };

      //Action and Assertion
      cy.createUser(bodyToReceive,failOnStatusCode).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.eq(bodyResponse);
      });
    });

  it("POST deve retornar erro ao tentar criar um usuário sem nome", () => {

    //Arrange
    const bodyToReceive = {
      email: dataUser.createUser.email,
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: [
        "name must be longer than or equal to 1 characters",
        "name must be a string",
        "name should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive,failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

  it("POST deve retornar erro ao tentar criar um usuário sem email", () => {

    //Arrange
    const bodyToReceive = {
      name: dataUser.createUser.name,
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: [
        "email must be longer than or equal to 1 characters",
        "email must be an email",
        "email should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive, failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

  it("POST deve retornar erro ao tentar criar um usuário sem password", () => {

    //Arrange
    const bodyToReceive = {
      name: dataUser.createUser.name,
      email: dataUser.createUser.email,
    };

    const bodyResponse = {
      message: [
        "password must be longer than or equal to 6 characters",
        "password must be a string",
        "password should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive, failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

  it("POST deve retornar erro ao tentar criar um usuário sem email", () => {

    //Arrange
    const bodyToReceive = {
      name: dataUser.createUser.name,
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: [
        "email must be longer than or equal to 1 characters",
        "email must be an email",
        "email should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400,
    };

    //Action and Assertion
    cy.createUser(bodyToReceive, failOnStatusCode).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  });

  it("POST deve retornar erro ao tentar criar um usuário com um email já cadastrado", () => {

    //Arrange
    const bodyResponse = {
      message: "Email already in use",
      error: "Conflict",
      statusCode: 409,
    };

    let bodyWithEmailCreated = {
      name: faker.person.fullName(),
      email: ' ',
      password: faker.internet.password({ length: 12 }),
    }

    //Action and Assertion
    cy.createUser(dataUser.createUser).then((data) => {
      bodyWithEmailCreated.email = data.body.email
    })

    cy.createUser(bodyWithEmailCreated, failOnStatusCode).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.deep.eq(bodyResponse);
    });
  
    //Clean Data
    cy.authUser(dataUser.createUser.email, dataUser.createUser.password);
    cy.inactivateUser();
  });

  // Tests Status code 4xx - ENDS HERE -
});
