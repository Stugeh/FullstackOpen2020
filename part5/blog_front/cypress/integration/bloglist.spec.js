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
            c
        })
    
        it('fails with wrong credentials', function() {
          // ...
        })
  
    })
})