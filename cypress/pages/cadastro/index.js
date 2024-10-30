class Cadastro {
    preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber) {
        
        cy.get('a[href="/login"]').click();

        // Preenche o formulário de cadastro completo
        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();

        cy.get('#id_gender1').should('be.visible').check();
        cy.get('[data-qa="name"]').type(firstName);
        cy.get('[data-qa="password"]').type(password, { log: false });
        cy.get('[data-qa="days"]').select('1');
        cy.get('[data-qa="months"]').select('1');
        cy.get('[data-qa="years"]').select('2000');
        cy.get('#newsletter').check();
        cy.get('#optin').check();

        // Preenche o formulário de endereço
        cy.get('[data-qa="first_name"]').type(firstName);
        cy.get('[data-qa="last_name"]').type(lastName);
        cy.get('[data-qa="company"]').type(company);
        cy.get('[data-qa="address"]').type(address);
        cy.get('[data-qa="address2"]').type(address2);
        cy.get('[data-qa="country"]').select('India');
        cy.get('[data-qa="state"]').type(state);
        cy.get('[data-qa="city"]').type(city);
        cy.get('[data-qa="zipcode"]').type(zipcode);
        cy.get('[data-qa="mobile_number"]').type(mobileNumber);

        // Espera o botão de criar conta ser visível e clica nele
        cy.get('[data-qa="create-account"]').click();
        cy.get('[data-qa="continue-button"]').should('be.visible');
    }

    verificarInscricaoEmail(email) {
        // Verifica a inscrição de e-mail na página inicial
        cy.visit('https://automationexercise.com/');
        cy.get('input#susbscribe_email').scrollIntoView().type(email);
        cy.get('button#subscribe').click();
        cy.contains('You have been successfully subscribed').should('be.visible');
    }

    registrarUsuarioComEmailExistente(firstName, lastName, email) {
        // Tenta registrar um usuário com um e-mail já existente
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();
        cy.get('.signup-form form p').should('contain', 'Email Address already exist!');
    }

    criarConta(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber) {
        // Método para criar uma conta (usado especificamente para Test Case 15)
        this.preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);

        // Aguardar a exibição da mensagem "Account Created!" antes de continuar
        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${firstName} ${lastName}`).should('be.visible');
    }
}

export default new Cadastro();
