/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";

describe("Testes relacionados a autenticação de usuário", () => {
  const failOnStatusCode = false;

  // Tests Status code 2xx - STARTS HERE -
  it("POST Login com sucesso com usuário já criado", () => {

    //Arrange
    let userCreate = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };
    
    cy.createUser(userCreate)

    //Action and Assert
    cy.authUser(userCreate.email, userCreate.password).then(response =>{
      expect(response.status).to.be.eq(200)
      expect(response.body).to.have.property("accessToken")
      expect(response.body.accessToken).to.be.a("String")
      expect(response.body.accessToken).to.be.not.empty
    })

    //Clean Data
    cy.inactivateUser();
  })
  // Tests Status code 2xx - ENDS HERE -  

  // Tests Status code 4xx - STARTS HERE -

  it("POST Login cretorna erro ao realizar login com usuário não cadastrado", () => {

    //Arrange
    let userLogin = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: "Invalid username or password.",
      error: "Unauthorized",
      statusCode: 401
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  it("POST Login cretorna erro ao realizar login com usuário com email invalido", () => {

    //Arrange
    let userLogin = {
      email: "anagabriela@gmailcom",
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: [
        "email must be an email"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  it("POST Login cretorna erro ao realizar login com usuário com email igual a null", () => {

    //Arrange
    let userLogin = {
      email: null,
      password: faker.internet.password({ length: 6 }),
    };

    const bodyResponse = {
      message: [
        "email should not be empty",
        "email must be an email"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  it("POST Login cretorna erro ao realizar login com usuário o parametro senha igual a null", () => {

    //Arrange
    let userLogin = {
      email: faker.internet.email(),
      password: null,
    };

    const bodyResponse = {
      message: [
        "password must be a string",
        "password should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  it("POST Login cretorna erro ao realizar login com usuário sem parametro email", () => {

    //Arrange
    let userLogin = {
      password: faker.internet.password({ length: 6 })
    };

    const bodyResponse = {
      message: [
        "email should not be empty",
        "email must be an email"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  it("POST Login cretorna erro ao realizar login com usuário sem o parametro senha igual a null", () => {

    //Arrange
    let userLogin = {
      email: faker.internet.email(),
    };

    const bodyResponse = {
      message: [
        "password must be a string",
        "password should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    //Action and Assert
    cy.authUser(userLogin.email, userLogin.password, failOnStatusCode).then(response =>{
      expect(response.status).to.be.eq(bodyResponse.statusCode)
      expect(response.body).to.deep.eq(bodyResponse)
    })
  })

  // Tests Status code 4xx - ENDS HERE -
})