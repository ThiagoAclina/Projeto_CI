class Pagamento {
    preencherDetalhesPagamento(cardName, cardNumber, cardCvc, cardExpMonth, cardExpYear) {
        cy.get('[data-qa="name-on-card"]').type(cardName);
        cy.get('[data-qa="card-number"]').type(cardNumber);
        cy.get('[data-qa="cvc"]').type(cardCvc);
        cy.get('[data-qa="expiry-month"]').type(cardExpMonth);
        cy.get('[data-qa="expiry-year"]').type(cardExpYear);
    }

    confirmarPagamento() {
        cy.get('[data-qa="pay-button"]').click();
    }

    verificarPedidoConfirmado() {
        cy.contains('Order Placed!').should('be.visible');
    }

    excluirConta() {
        cy.contains('Delete Account').click();
    }

    verificarContaExcluida() {
        cy.contains('Account Deleted!').should('be.visible');
    }
}

export default new Pagamento();
