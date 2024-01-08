let carrinho = [];
limpar();

function adicionar() {
    // Obter os elementos do formulário
    const produtoSelecionado = document.getElementById("produto");
    const quantidadeInput = document.getElementById("quantidade");

    // Verificar se a quantidade é válida
    const quantidade = parseInt(quantidadeInput.value);
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Obter o valor do produto selecionado
    const produtoValor = parseFloat(produtoSelecionado.value.split(" - ")[1].replace("R$", "").replace(",", "."));

    // Calcular o subtotal do produto
    const subtotal = produtoValor * quantidade;

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.produto === produtoSelecionado.value);

    if (produtoExistente) {
        // Se o produto já existe, incrementar a quantidade e atualizar o subtotal
        produtoExistente.quantidade += quantidade;
        produtoExistente.subtotal += subtotal;
    } else {
        // Se o produto não existe, adicioná-lo ao carrinho
        carrinho.push({ produto: produtoSelecionado.value, quantidade, subtotal });
    }

    // Atualizar a exibição do carrinho
    exibirCarrinho();

    // Calcular e atualizar o valor total
    calcularTotal();

    // Resetar o campo de quantidade
    quantidadeInput.value = "1";
}

function limpar() {
    // Limpar a lista de produtos no carrinho
    carrinho = [];

    // Atualizar a exibição do carrinho
    exibirCarrinho();

    // Resetar o valor total
    calcularTotal();
}

function exibirCarrinho() {
    // Atualizar a exibição do carrinho na tela
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = "";

    for (const item of carrinho) {
        const novoProduto = document.createElement("section");
        novoProduto.classList.add("carrinho__produtos__produto");
        novoProduto.innerHTML = `<span class="texto-azul">${item.quantidade}x</span> ${item.produto} <span class="texto-azul">R$${item.subtotal.toFixed(2)}</span>`;
        listaProdutos.appendChild(novoProduto);
    }
}

function calcularTotal() {
    // Calcular o valor total somando os subtotais dos produtos no carrinho
    const listaProdutos = document.getElementById("lista-produtos");
    const produtos = listaProdutos.getElementsByClassName("carrinho__produtos__produto");
    let total = 0;

    for (const produto of produtos) {
        const subtotal = parseFloat(produto.textContent.match(/R\$(\d+\.\d+)/)[1]);
        total += subtotal;
    }

    // Atualizar o valor total na tela
    const valorTotal = document.getElementById("valor-total");
    valorTotal.textContent = `R$${total.toFixed(2)}`;
}
