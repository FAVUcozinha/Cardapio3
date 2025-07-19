const botaoPedido = document.getElementById('botao-pedido');
const popup = document.getElementById('popup-pedido');
const fecharPopup = document.getElementById('fechar-popup');
const enviarPedido = document.getElementById('enviar-pedido');
const resumo = document.getElementById('resumo');
const resumoItens = resumo.querySelector('.resumo-itens');
const resumoTotal = document.getElementById('resumo-total');

botaoPedido.addEventListener('click', () => {
    // Verificar se tem algum item selecionado
    const quantidades = document.querySelectorAll('input[type="number"]');
    let temItem = false;
    quantidades.forEach(input => {
        if (parseInt(input.value) > 0) {
            temItem = true;
        }
    });
    if (!temItem) {
        alert('Por favor, selecione ao menos um item para fazer o pedido.');
        return;
    }
    popup.style.display = 'flex';
});

fecharPopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fechar popup clicando fora do conteúdo
window.addEventListener('click', e => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

enviarPedido.addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const pagamento = document.getElementById('pagamento').value;

    if (!nome || !data || !hora || !pagamento) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Montar o resumo do pedido
    const quantidades = document.querySelectorAll('input[type="number"]');
    let itensSelecionados = [];
    let total = 0;

    quantidades.forEach(input => {
        let qtd = parseInt(input.value);
        if (qtd > 0) {
            let tr = input.closest('tr');
            let nomeItem = tr.querySelector('.item-nome').textContent;
            let precoUnit = parseFloat(input.getAttribute('data-preco'));
            let precoTotal = precoUnit * qtd;
            itensSelecionados.push(`${nomeItem} - ${qtd} x R$ ${precoUnit.toFixed(2)} = R$ ${precoTotal.toFixed(2)}`);
            total += precoTotal;
        }
    });

    resumoItens.innerHTML = itensSelecionados.map(item => `<p>${item}</p>`).join('');
    resumoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Mostrar resumo
    resumo.style.display = 'block';

    // Fechar popup
    popup.style.display = 'none';

    // Limpar campos do popup e inputs de quantidade
    document.getElementById('nome').value = '';
    document.getElementById('data').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('pagamento').value = '';
    quantidades.forEach(input => input.value = 0);
});
