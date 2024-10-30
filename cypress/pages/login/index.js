class Login {
    fazerLogin(email, password) {
        
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
        cy.get('[data-qa="login-button"]').click();
    }

    verificarLogin(firstName, lastName) {
        // Certifica-se de que o usuário está logado corretamente
        cy.get('i.fa-user').parent().should('contain', `${firstName} ${lastName}`);
    }

    fazerLogout() {
        // Aguarda o botão de Logout estar visível antes de clicar
        cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('contain', 'login');
    }

    fazerLoginInvalido(email, password) {
        
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
        cy.get('[data-qa="login-button"]').click();
        cy.get('.login-form form p').should('contain', 'Your email or password is incorrect!');
    }
}

export default new Login();
