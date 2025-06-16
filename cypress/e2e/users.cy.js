describe('Petstore API Users', () => {
  let user;
  let updatedUser;
  let baseURL;

  beforeEach(() => {
    cy.fixture('userData.json').then((data) => {
      user = data.user;
      updatedUser = data.updatedUser;
      baseURL = data.baseURL;
    });
  });

  it('updates and reads user', () => {
    cy.createUser(baseURL, user)
      .then(() => {
        cy.updateUser(baseURL, user.username, updatedUser);
        cy.verifyUser(baseURL, updatedUser.username, updatedUser);
      })
      .then(() => {
        cy.deleteUser(baseURL, updatedUser.username);
      });
  });
});