const itensBoloTradicional = [
    { nome: "Bolo de Bem-Casado", tamanho: "P (1.5 KG)", preco: 85.00 },
    { nome: "Bolo de Bem-Casado", tamanho: "M (2.5 KG)", preco: 140.00 },
    { nome: "Bolo de Bem-Casado", tamanho: "G (3.5 KG)", preco: 195.00 }
];

const itensBoloEspecial = [
    { nome: "Bolo de Ameixa", tamanho: "P (1.5 KG)", preco: 105.00 },
    { nome: "Bolo de Ameixa", tamanho: "M (2.5 KG)", preco: 175.00 },
    { nome: "Bolo de Ameixa", tamanho: "G (3.5 KG)", preco: 245.00 }
];

const itensPratoSalgado = [
    { nome: "Escondidinho de Frango", tamanho: "P (1 KG)", preco: 60.00 },
    { nome: "Escondidinho de Frango", tamanho: "M (2 KG)", preco: 110.00 },
    { nome: "Escondidinho de Frango", tamanho: "G (3 KG)", preco: 160.00 }
];

function carregarTabela(idTabela, itens) {
    const tabela = document.getElementById(idTabela);
    itens.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.tamanho}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td><input type="number" min="0" value="0" class="quantidade"></td>
        `;
        tabela.appendChild(row);
    });
}

function calcularResumo() {
    let total = 0;
    const resumoItens = document.getElementById("resumo-itens");
    resumoItens.innerHTML = "";

    document.querySelectorAll("tbody tr").forEach(row => {
        const nome = row.children[0].innerText;
        const preco = parseFloat(row.children[2].innerText.replace("R$ ", ""));
        const quantidade = parseInt(row.children[3].querySelector("input").value);

        if (quantidade > 0) {
            total += preco * quantidade;
            const resumoLinha = document.createElement("p");
            resumoLinha.innerText = `${nome}: ${quantidade} unidade(s) - R$ ${(preco * quantidade).toFixed(2)}`;
            resumoItens.appendChild(resumoLinha);
        }
    });

    document.getElementById("resumo-total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function fazerPedido() {
    alert("Pedido realizado com sucesso!");
}

function voltar() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTabela("tabela-bolo-tradicional", itensBoloTradicional);
    carregarTabela("tabela-bolo-especial", itensBoloEspecial);
    carregarTabela("tabela-prato-salgado", itensPratoSalgado);

    document.querySelectorAll(".quantidade").forEach(input => {
        input.addEventListener("input", calcularResumo);
    });
});
