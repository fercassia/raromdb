/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";

describe("Testes relacionados consulta de usuário por id", () => {
  const failOnStatusCode = false;

  let idUser;
  let active;

  let userCreate = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  };

  beforeEach(() => {
    cy.createUser(userCreate).then((response) => {
      idUser = response.body.id;
      active = response.body.active;
    });
    cy.authUser(userCreate.email, userCreate.password);
  });

  // Tests Status code 2xx - STARTS HERE -

  it("GET usuário admin lista pelo seu id com sucesso", () => {
    //Arrange
    cy.promoteToAdmin();

    const usuario = {
      id: idUser,
      name: userCreate.name,
      email: userCreate.email,
      type: 1,
      active: active,
    };

    //Action and Assert
    cy.listUserById(idUser).then((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(usuario);
    });

    //Clean Data
    cy.deleteUser(idUser);
  });

  it("GET usuário critico pesquisando seu id", () => {
    //Arrange
    const usuario = {
      id: idUser,
      name: userCreate.name,
      email: userCreate.email,
      type: 2,
      active: active,
    };

    cy.promoteToCritic();

    //Action and Assert
    cy.listUserById(idUser, failOnStatusCode).then((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(usuario);
    });

    //Clean Data
    cy.promoteToAdmin();
    cy.deleteUser(idUser);
  });

  it("GET usuário comum pesquisando seu id", () => {
    //Arrange
    const usuario = {
      id: idUser,
      name: userCreate.name,
      email: userCreate.email,
      type: 0,
      active: active,
    };

    //Action and Assert
    cy.listUserById(idUser, failOnStatusCode).then((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(usuario);
    });

    //Clean Data
    cy.promoteToAdmin();
    cy.deleteUser(idUser);
  });

  it("GET listando usuário existente com um usuário admin", () => {

    //Arrange
    cy.promoteToAdmin();

    const modelResponse = {
      id: 0,
      name: "String",
      email: "String",
      type: 0,
      active: true,
    };

    //Action and Assert
    cy.listUsers().then((data) => {
      let idAnotherUser = data.body[0].id;

      cy.listUserById(idAnotherUser).then((response) => {
        expect(response.status).to.be.eq(200)
        expect(response.body).to.have.keys(modelResponse)
        expect(response.body).to.be.deep.eq(data.body[0])
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.be.a('string')
        expect(response.body.email).to.be.a('string')
        expect(response.body.type).to.be.a('number')
        expect(response.body.active).to.be.a('boolean')
      });
    });

    // Clean Data
    cy.deleteUser(idUser);
  });

  // Tests Status code 2xx - ENDS HERE -

  // Tests Status code 4xx - STARTS HERE -
  
  it("GET listando usuário existente com um usuário comum", () => {

    //Arrange
    let communUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    //Action and Assert
    cy.createUser(communUser).then((data) => {
      let idCommunUser = data.body.id

      cy.listUserById(idCommunUser, failOnStatusCode).then(response =>{
        expect(response.status).to.be.eq(403);
      })

      // Clean Data
      cy.promoteToAdmin();
      cy.deleteUser(idCommunUser);
    });

    //Clean Data
    cy.deleteUser(idUser);
  });

  it("GET listando usuário existente com um usuário critico", () => {

    //Arrange
    cy.promoteToCritic();

    let userAdmin = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    //Action and Assert
    cy.createUser(userAdmin).then((data) => {
      let idAdminUser = data.body.id

      cy.listUserById(idAdminUser, failOnStatusCode).then(response =>{
        expect(response.status).to.be.eq(403);
      })

      // Clean Data
      cy.authUser(userAdmin.email, userAdmin.password);
      cy.promoteToAdmin();
      cy.deleteUser(idUser);
      cy.deleteUser(idAdminUser);
    });
  });



  it("GET listando usuário pelo id invalido deve retornar erro de bad request", () => {
    //Arrange
    const idUserInvalid = "xpto";
    cy.promoteToAdmin();

    //Action and Assert
    cy.listUserById(idUserInvalid, failOnStatusCode).then((response) => {
      expect(response.status).to.be.eq(400);
    });

    //Clean Data
    cy.deleteUser(idUser);
  });



  it("GET listando usuário pelo id inexistente deve retornar erro de not found", () => {
    //Arrange
    const indUserDoesntExist = 99999999999999999;
    cy.promoteToAdmin();

    //Action and Assert
    cy.listUserById(indUserDoesntExist, failOnStatusCode).then((response) => {
      expect(response.status).to.be.eq(404);
    });

    //Clean Data
    cy.deleteUser(idUser);
  });

  // Tests Status code 4xx - ENDS HERE -
});
