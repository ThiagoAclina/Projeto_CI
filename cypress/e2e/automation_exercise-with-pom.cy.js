import cadastro from '../pages/cadastro';
import login from '../pages/login';
import contato from '../pages/contato';
import carrinho from '../pages/carrinho';
import pagamento from '../pages/pagamento';
import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {

    beforeEach(() => {
        
        cy.visit('/');

    });

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.internet.password();
    const company = faker.company.name();
    const address = faker.location.streetAddress();
    const address2 = faker.location.secondaryAddress();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobileNumber = faker.phone.number('###########');
    const cardName = `${firstName} ${lastName}`;
    const cardNumber = faker.finance.creditCardNumber();
    const cardCvc = faker.finance.creditCardCVV();
    const cardExpiration = '12/25';

    // Gera um novo email para cada teste
    const generateNewEmail = () => faker.internet.email();

    // Teste 1: Cadastrar Usuário
    it('Test Case 1: Register User', () => {
        const email = generateNewEmail();
        cadastro.preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);
        
        // Espera o botão 'continue-button' ser visível antes de prosseguir
        cy.get('[data-qa="continue-button"]').should('be.visible').click();
    });

    // Teste 2: Login com credenciais corretas
    it('Test Case 2: Login user with correct email and password', () => {
        const email = generateNewEmail();
        cadastro.preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);
        
        // Espera o botão 'continue-button' ser visível antes de prosseguir
        cy.get('[data-qa="continue-button"]').should('be.visible').click();

        // Realiza o logout antes de iniciar o próximo teste de login
        cy.get('a[href="/logout"]').should('be.visible').click();

        cy.get('a[href="/login"]').click();
        login.fazerLogin(email, password);
        login.verificarLogin(firstName, lastName);
    });

    // Teste 3: Login com credenciais incorretas
    it('Test Case 3: Login user with incorrect email and password', () => {
        login.fazerLoginInvalido(faker.internet.email(), faker.internet.password());
    });




    // Teste 4: Logout do usuário logado
    it('Test Case 4: Logout user', () => {
        const email = generateNewEmail();
        
        // Preenche o formulário de cadastro
        cadastro.preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);

        // Espera o botão 'continue-button' ser visível antes de prosseguir
        cy.get('[data-qa="continue-button"]').should('be.visible').click();

        // Verifica se o usuário foi logado corretamente
        cy.contains(`Logged in as ${firstName} ${lastName}`).should('be.visible');

        // Espera o botão "Logout" ser visível antes de clicar
        cy.get('a[href="/logout"]').should('be.visible').click();

        // Verifica se a URL contém 'login', confirmando que o usuário fez logout
        cy.url().should('contain', 'login');

        // Verifica se o botão de Login está visível, confirmando que o logout foi concluído
        cy.contains('Login').should('be.visible');
    });





    // Teste 5: Registrar usuário com e-mail existente
    it('Test Case 5: Register User with existing email', () => {
        const email = generateNewEmail();
        cadastro.preencherFormulario(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);

        // Espera o botão 'continue-button' ser visível antes de prosseguir
        cy.get('[data-qa="continue-button"]').should('be.visible').click();

        // Tentar registrar novamente com o mesmo e-mail
        cy.get('a[href="/logout"]').click();
        cy.get('a[href="/login"]').click();
        cadastro.registrarUsuarioComEmailExistente(firstName, lastName, email);
    });

    // Teste 6: Preencher e enviar o formulário de 'Contact Us'
    it('Test Case 6: Contact Us Form', () => {
        const email = generateNewEmail();
        contato.preencherFormularioContato(firstName, email, faker.lorem.sentence(), faker.lorem.paragraph());
    });

    // Teste 8: Verificar a página de 'All Products' e os detalhes de um produto
    it('Test Case 8: Verify All Products and product detail page', () => {
        carrinho.verificarProdutos();
    });

    // Teste 9: Buscar um produto e verificar os resultados
    it('Test Case 9: Search Product', () => {
        carrinho.buscarProduto('Shirt');
    });

    // Teste 10: Verificar a inscrição de e-mail na página inicial
    it('Test Case 10: Verify Subscription in home page', () => {
        const email = generateNewEmail();
        cadastro.verificarInscricaoEmail(email);
    });

    // Teste 15: Place Order: Register before Checkout
    it('Test Case 15: Place Order: Register before Checkout', () => {
        const email = generateNewEmail();
        cadastro.criarConta(firstName, lastName, email, password, company, address, address2, state, city, zipcode, mobileNumber);

        // Adicionar produto ao carrinho
        carrinho.adicionarProduto();

        // Acessar carrinho e prosseguir para checkout
        carrinho.acessarCarrinho();
        carrinho.prosseguirCheckout();

        // Preencher mensagem no pedido
        carrinho.preencherMensagem('Please deliver between 10 AM and 12 PM.');

        // Preencher detalhes do pagamento e confirmar
        pagamento.preencherDetalhesPagamento(cardName, cardNumber, cardCvc, '12', '2025');
        pagamento.confirmarPagamento();

        // Excluir conta e verificar exclusão
        pagamento.excluirConta();
        pagamento.verificarContaExcluida();
    });
});
