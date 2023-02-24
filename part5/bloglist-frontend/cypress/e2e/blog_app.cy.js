describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'tester',
      password: 't3st3rp@ss',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('t3st3rp@ss')
      cy.get('#login-btn').click()

      cy.get('.notification')
        .contains('log in successful')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('invalid')
      cy.get('#login-btn').click()

      cy.get('.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 't3st3rp@ss' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('New Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#submit-btn').click()

      cy.contains('New Blog Author')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'New Blog',
          author: 'Author',
          url: 'http://localhost:3000',
        })
      })

      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#blog-list').should('not.contain', 'New Blog')
      })

      it('it cannot be deleted by another user', function() {
        const user = {
          name: 'Other User',
          username: 'otheruser',
          password: 'oth3rp@ss',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'otheruser', password: 'oth3rp@ss' })
        cy.contains('view').click()
        cy.get('#blog-list').should('not.contain', 'remove')
      })
    })

    describe('and multiple blogs are ordered as initially created, if getting likes', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog_1',
          author: 'Author',
          url: 'http://localhost:3000',
        })
        cy.createBlog({
          title: 'Blog_2',
          author: 'Author',
          url: 'http://localhost:3000',
        })
        cy.createBlog({
          title: 'Blog_3',
          author: 'Author',
          url: 'http://localhost:3000',
        })

        cy.get('.blog').eq(0).contains('view').click()
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(2).contains('view').click()

        cy.get('.blog').eq(0).contains('like')
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)
        cy.get('.blog').eq(1).contains('like')
          .click()
          .wait(500)
        cy.get('.blog').eq(2).contains('like')
          .click()
          .wait(500)
          .click()
          .wait(500)
      })

      it('the blogs are ordered according to likes', function() {
        cy.get('.blog').eq(0).should('contain', 'likes 3')
          .should('contain', 'Blog_1')
        cy.get('.blog').eq(1).should('contain', 'likes 2')
          .should('contain', 'Blog_3')
        cy.get('.blog').eq(2).should('contain', 'likes 1')
          .should('contain', 'Blog_2')
      })
    })
  })
})