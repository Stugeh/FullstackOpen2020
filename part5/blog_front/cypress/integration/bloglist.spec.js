describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/tests/reset')
      const newUser = {
          username: 'testUser',
          password: 'testPassword',
          name: 'test real name'
      }
      cy.createUser(newUser)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get('#username')
      cy.get('#password')
      cy.contains('login')
    })
    
    
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            const credentials = {
                username: 'testUser',
                password: 'testPassword'
            }
            cy.login(credentials)
            cy.contains('login')
        })
    
        it('fails with wrong credentials', function() {
          const credentials = {
            username: 'testUser',
            password: 'wrongPassword'
          }
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/login',
            body: credentials,
            failOnStatusCode: false
          })
          .then(res => {
              expect(res.status).to.eq(401)
          })
        })
    })
    
    
    describe('When logged in', function() {
      beforeEach(function() {
        const credentials = {
          username: 'testUser',
          password: 'testPassword'
        }
        cy.login(credentials)

        cy.contains('add a new blog').click()
        cy.get('#title').type('new blog')
        cy.get('#author').type('new writer')
        cy.get('#url').type('www.url.com')
        cy.contains('save').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog')
        cy.contains('new writer')
      })

      it('a blog can be liked', function(){
        cy.contains('expand').click({ force: true })
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })

      it('user can delete a blog', function() {
        cy.contains('expand').click({ force: true })
        cy.contains('delete').click({ force: true })
        cy.get('new blog').should('not.exist')
      })
      
      it('blogs are ordered by the amount of likes', function(){
        cy.get('#title').type('new blog2')
        cy.get('#author').type('new writer2')
        cy.get('#url').type('www.url2.com')
        cy.contains('save').click()
        cy.contains('new blog2').debug()
        // expand button
        cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .infoEnable').click()
        // like button
        cy.get(':nth-child(2) > :nth-child(2) > .togglableComponent > :nth-child(1)').click()
        cy.visit('http://localhost:3000')
        // check that the first blog in the list has been switched to the liked blog
        cy.get('.blogList > :nth-child(1)').contains('new blog2')

      })
    })
})