class Contato {
    preencherFormularioContato(firstName, email, assunto, mensagem) {
        
        cy.contains('Contact us').click();

        // Verifica que a página de contato está visível
        cy.get('.contact-form h2').should('be.visible').and('have.text', 'Get In Touch');
        cy.get('[data-qa="name"]').type(firstName);
        cy.get('[data-qa="email"]').type(email);
        cy.get('[data-qa="subject"]').type(assunto);
        cy.get('[data-qa="message"]').type(mensagem);
        
        cy.fixture('example.json').as('arquivo');
        cy.get('input[name="upload_file"]').selectFile('@arquivo');
        cy.get('[data-qa="submit-button"]').click();

        // Verifica o sucesso do envio
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    }
}

export default new Contato();
