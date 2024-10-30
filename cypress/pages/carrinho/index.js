class Carrinho {
    verificarProdutos() {
        
        cy.contains('Products').should('be.visible').click();
        cy.url().should('contain', 'products');
        cy.get('.title').should('be.visible').and('contain', 'All Products');
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first().parent().contains('View Product').click();
        cy.get('.product-information > h2').should('be.visible');
        cy.get('.product-information > p').should('be.visible').and('have.length', 4);
        cy.get('.product-information > span span').should('be.visible');
    }

    buscarProduto(produto) {
        
        cy.contains('Products').click();

        cy.url().should('contain', 'products');
        cy.get('.title').should('be.visible').and('contain', 'All Products');
        cy.get('input#search_product').type(produto);
        cy.get('button#submit_search').click();

        cy.get('.title').should('be.visible').and('contain', 'Searched Products');
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1);
    }

    adicionarProduto() {
        // Adiciona o primeiro produto à lista
        cy.get('.features_items .product-image-wrapper').first().contains('Add to cart').click();

        // Confirma a ação no modal
        cy.get('.modal-content .btn-success').click();
    }

    acessarCarrinho() {
        cy.get('a[href="/view_cart"]').first().click();
        cy.url().should('contain', 'cart');
    }

    prosseguirCheckout() {
        cy.contains('Proceed To Checkout').click();
    }

    preencherMensagem(mensagem) {
        cy.get('textarea[name="message"]').type(mensagem);
        cy.contains('Place Order').click();
    }

    finalizarPedido() {
        cy.contains('Order Placed!').should('be.visible');
    }
}

export default new Carrinho();
