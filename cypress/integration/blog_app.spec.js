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

  // describe('Login',function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.get('#username').type('Luis')
  //     cy.get('#password').type('Diego')
  //     cy.get('#login-button').click()

  //     cy.contains('luis logged-in')
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.get('#username').type('Luis')
  //     cy.get('#password').type('Pedro')
  //     cy.get('#login-button').click()

  //     cy.contains('Wrong credentials')

  //     cy.get('#errorNotif').should('have.css', 'color','rgb(255, 0, 0)')
  //   })
  // })

  // describe('When logged in', function() {
  //   beforeEach(function() {
  //     cy.request('POST', 'http://localhost:3003/api/login', {
  //       username: 'Luis', password: 'Diego'
  //     }).then(response => {
  //       localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
  //       cy.visit('http://localhost:3000')
  //     })
  //   })

  //   it('A blog can be created', function() {
  //     cy.contains('Create blog').click()
  //     cy.get('#title').type('CYPRESS TEST TITLE')
  //     cy.get('#author').type('AUTHORTEST')
  //     cy.get('#url').type('http://test.me')
  //     cy.get('#create-button').click()

  //     cy.get('#positiveNotif').should('have.css', 'color','rgb(166, 255, 200)')
  //     cy.get('#blog-tile').contains('CYPRESS TEST TITLE')
  //   })

  //   it('A blog can be liked', function() {
  //     cy.contains('Create blog').click()
  //     cy.get('#title').type('CYPRESS TEST TITLE')
  //     cy.get('#author').type('AUTHORTEST')
  //     cy.get('#url').type('http://test.me')
  //     cy.get('#create-button').click()

  //     cy.get('#blog-tile').get('#view-button').click()
  //     cy.get('#like-button').click()
  //     cy.get('#blog-tile') .contains('Likes: 1')
  //   })
  //   it('A blog can be deleted', function() {
  //     cy.contains('Create blog').click()
  //     cy.get('#title').type('CYPRESS TEST TITLE')
  //     cy.get('#author').type('AUTHORTEST')
  //     cy.get('#url').type('http://test.me')
  //     cy.get('#create-button').click()

  //     cy.get('#blog-tile').get('#view-button').click()
  //     cy.get('#delete-button').click()
  //     cy.on('window:confirm', () => true)
  //     cy.get('#blog-list').should('not.contain','CYPRESS TEST TITLE')
  //   })
  // })


  // describe('When logged in as a different user', function() {
  //   beforeEach(function() {
  //     const differentUser = {
  //       name: 'pedro',
  //       username: 'Pedro',
  //       password: 'Olgar'
  //     }
  //     cy.request('POST', 'http://localhost:3003/api/users/', differentUser)
  //     cy.request('POST', 'http://localhost:3003/api/login', {
  //       username: 'Luis', password: 'Diego'
  //     }).then(response => {
  //       localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
  //       cy.visit('http://localhost:3000')
  //     })
  //   })

  //   it('Create a blog and try to delete as a different user', function() {
  //     cy.contains('Create blog').click()
  //     cy.get('#title').type('CYPRESS TEST TITLE')
  //     cy.get('#author').type('AUTHORTEST')
  //     cy.get('#url').type('http://test.me')
  //     cy.get('#create-button').click()
  //     cy.contains('LOGOUT').click()

  //     cy.get('#username').type('Pedro')
  //     cy.get('#password').type('Olgar')
  //     cy.get('#login-button').click()
  //     cy.get('#blog-tile').get('#view-button').click()
  //     cy.get('#blog-list').should('not.contain','#delete-button')
  //   })
  // })

  Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { author, title, url, likes },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })

    cy.visit('http://localhost:3000')
  })

  describe('Like sorting algorithm', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Luis', password: 'Diego'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
      cy.createBlog({ author: 'cypress1', title: 'test1', url: 'http://test.com/1', likes: 1 })
      cy.createBlog({ author: 'cypress2', title: 'test2', url: 'http://test.com/2', likes: 10 })
      cy.createBlog({ author: 'cypress3', title: 'test3', url: 'http://test.com/3', likes: 10 })
    })

    it('Confirm sorted blogs', function() {
      cy.get('#blog-tile').contains('cypress2').get('#view-button').click()
      cy.get('#blog-tile').contains('cypress2').get('#like-button').click()
      cy.get('.blog-tile').then( blog => {

        return(
          blog.map((i,el) => el.innerText)
        )
      })
        .should('contain',['test2 view\n\ncypress2\n\nhttp://test.com/2\n\nLikes: 10 like\n\nDELETE','test3 view\n\ncypress3','test1 view\n\ncypress1'])
    })
  })
})
