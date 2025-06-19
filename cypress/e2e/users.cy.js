describe('Authorization',() => {
    beforeEach(()=>{
    cy.viewport(
        Cypress.config("viewportWidth"),
        Cypress.config("viewportHeight")
    );
      cy.visit('/');
    })

    it("Should open the main page", () => {
      cy.visit("localhost:3000");
      cy.contains('Books list');
    });

    it('log in books list', ()=>{
        cy.contains('Log in').click();
        cy.login("bropet@mail.ru", "123");
        cy.contains("Добро пожаловать").should("be.visible", true);
    });

    it("Empty login",()=>{
        cy.contains('Log in').click();
        cy.login(null, "123");
        cy.get('#mail').then((elements)=>{
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        });
    })

    it("Empty password",()=>{
        cy.contains('Log in').click();
        cy.login("bropet@mail.ru", null);
        cy.get('#pass').then((elements)=>{
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        });
    });
});

describe('Add book',() => {
    beforeEach(()=>{
      cy.visit('/');
      cy.contains('Log in').click();
      cy.login("bropet@mail.ru", "123");
    })

    it("Add new book",()=>{
        cy.contains('Add new').click();
        cy.get('#title').type("Буратино");
        cy.contains("Submit").click();
    });

    it("Add favorite book",()=>{
        cy.contains("Add to favorite").click();
        cy.contains("Favorites").click();
        cy.get(".card-body").then((elements) => {
            expect(elements).to.have.length.at.least(1);
        });
    });

    it("Delete favorite book",()=>{
        cy.contains("Favorite").click();
        cy.contains("Delete from favorite").click();
        cy.contains("Please add some book").should("be.visible");
    });

});
