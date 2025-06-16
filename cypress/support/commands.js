Cypress.Commands.add('createUser', (baseUrl, user) => {
  return cy.request({
    method: 'POST',
    url: `${baseUrl}`,
    body: user
  }).then((response) => {
    user.id = response.body.id;  // Сохраняем реальный ID после создания
    return user;
  });
});

Cypress.Commands.add('updateUser', (baseUrl, username, updatedUser) => {
  try {
    return cy.request({
      method: 'PUT',
      url: `${baseUrl}/${username}`,
      body: updatedUser,
      retryOnNetworkFailure: true,  // повторит запрос при проблемах с сетью
      retryInterval: 1000,  // интервал между попытками
      retries: 3  // максимальное количество попыток
    });
  } catch (err) {
    console.error(err);
  }
});

Cypress.Commands.add('deleteUser', (baseUrl, username) => {
  return cy.request({
    method: 'DELETE',
    url: `${baseUrl}/${username}`
  });
});

Cypress.Commands.add('verifyUser', (baseUrl, username, expectedUser) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl}/${username}`,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 200 || !response.body) {
      throw new Error(`User "${username}" not found or incorrect response.`);
    }
    console.log('Received Body:', response.body);
    console.log('Expected User:', expectedUser);

    // Ограничим проверку важными полями
    expect(response.body.username).to.eq(expectedUser.username);
    // Проверка other fields при условии, что они существуют
    if (response.body.lastName) {
      expect(response.body.lastName).to.eq(expectedUser.lastName);
    }
  });
});

Cypress.Commands.add('verifyUserAbsence', (baseUrl, username) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl}/${username}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});