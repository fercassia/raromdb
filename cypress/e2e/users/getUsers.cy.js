/// <reference types="Cypress" />
import { faker } from "@faker-js/faker";


describe("Testes relacionados a listagem de todos os usuários", () => {
  const failOnStatusCode = false;
  let idUser;

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  };

  beforeEach(() => {
    cy.createUser(user).then((response) => {
      idUser = response.body.id;
    });
  });

  // Tests Status code 2xx - STARTS HERE -

  it("GET Listando todos os usuários com sucesso", () => {

    //Arrange
    cy.authUser(user.email, user.password);
    cy.promoteToAdmin();

    //Action and Assert
    cy.listUsers().then((response) => {
      let lethResponse = response.body.length;
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a("Array");
      expect(response.body[0]).to.be.a("Object");
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("name");
      expect(response.body[0]).to.have.property("email");
      expect(response.body[0]).to.have.property("type");
      expect(response.body[0]).to.have.property("active");
      expect(response.body[lethResponse - 1]).to.be.a("Object");
      expect(response.body[lethResponse - 1]).to.have.property("id");
      expect(response.body[lethResponse - 1]).to.have.property("name");
      expect(response.body[lethResponse - 1]).to.have.property("email");
      expect(response.body[lethResponse - 1]).to.have.property("type");
      expect(response.body[lethResponse - 1]).to.have.property("active");
    });

    // Clean Data
    cy.deleteUser(idUser);
  });

  // Tests Status code 2xx - ENDS HERE -

  // Tests Status code 4xx - STARTS HERE -

  it("GET Retorna erro de não autorizado se usuário comum tentar listar todos os usuários", () => {
    //Arrange
    cy.authUser(user.email, user.password);

    //Action and Assert
    cy.listUsers(failOnStatusCode).then((response) => {
      expect(response.status).to.eq(403);
    });

    //Clean Data
    cy.promoteToAdmin();
    cy.deleteUser(idUser);
  });

  it("GET Retorna erro de não autorizado se usuário critico tentar listar todos os usuários", () => {
    //Arrange
    cy.authUser(user.email, user.password);
    cy.promoteToCritic();

    //Action and Assert
    cy.listUsers(failOnStatusCode).then((response) => {
      expect(response.status).to.eq(403);
    });

    //Clean Data
    cy.promoteToAdmin();
    cy.deleteUser(idUser);
  });

  it("GET Retorna erro de não autorizado se usuário deslogado tentar listar todos os usuários", () => {
    //Arrange
    cy.authUser(user.email, user.password);

    //Action and Assert
    cy.listUsers(failOnStatusCode).then((response) => {
      expect(response.status).to.eq(403);
    });

    //Clean Data
    cy.authUser(user.email, user.password);
    cy.promoteToAdmin();
    cy.deleteUser(idUser);
  });

  // Tests Status code 4xx - ENDS HERE -
});
