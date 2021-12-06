describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'luis',
      username: 'Luis',
      password: 'Diego'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blog system')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Luis')
      cy.get('#password').type('Diego')
      cy.get('#login-button').click()

      cy.contains('luis logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Luis')
      cy.get('#password').type('Pedro')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')

      cy.get('#errorNotif').should('have.css', 'color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Luis')
      cy.get('#password').type('Diego')
      cy.get('#login-button').click()

      cy.contains('luis logged-in')
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('CYPRESS TEST TITLE')
      cy.get('#author').type('AUTHORTEST')
      cy.get('#url').type('http://test.me')
      cy.get('#create-button').click()

      cy.get('#positiveNotif').should('have.css', 'color','rgb(166, 255, 200)')
      cy.get('#blog-tile')
        .contains('CYPRESS TEST TITLE')
    })
  })
})