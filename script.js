const prices = {
    'Bolinho de Bacalhau': 1.00,
    'Bolinho de Calabresa': 0.80,
    'Camarão Empanado': 1.40
};

const minQuantities = {
    'Bolinho de Bacalhau': 20,
    'Bolinho de Calabresa': 25,
    'Camarão Empanado': 25
};

document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('input', updateOrderSummary);
});

function updateOrderSummary() {
    const orderDetails = document.getElementById('orderDetails');
    const orderTotal = document.getElementById('orderTotal');
    let total = 0;
    let summary = '';
    let itemsSelected = false;

    document.querySelectorAll('.salty-table-row').forEach((row, index) => {
        const itemName = row.querySelector('.salty-name').textContent;
        const quantityInput = row.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        const price = prices[itemName];
        const minQuantity = minQuantities[itemName];

        // Verifica se a quantidade inserida é válida (não menor que a mínima)
        if (quantity >= minQuantity) {
            const itemTotal = price * quantity;
            total += itemTotal;
            summary += `<div class="order-item">${itemName}: ${quantity} x R$ ${price.toFixed(2)} = R$ ${itemTotal.toFixed(2)}</div>`;
            itemsSelected = true;
        } else if (quantity > 0) {
            // Caso a quantidade seja menor que a mínima, mostra um alerta
            quantityInput.value = minQuantity; // Ajusta a quantidade mínima automaticamente
            alert(`A quantidade mínima para ${itemName} é ${minQuantity}.`);
        }
    });

    if (itemsSelected) {
        orderDetails.innerHTML = summary;
        orderTotal.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
        document.getElementById('submitOrder').disabled = false;
    } else {
        orderDetails.innerHTML = 'Nenhum item selecionado.';
        orderTotal.innerHTML = '';
        document.getElementById('submitOrder').disabled = true;
    }
}

document.getElementById('submitOrder').addEventListener('click', function() {
    const message = encodeURIComponent(
        `Pedido de Salgados:\n\n${document.getElementById('orderDetails').innerText}\n\nTotal: R$ ${document.getElementById('orderTotal').innerText}`
    );
    const whatsappUrl = `https://wa.me/558199591775?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// Inicializar o resumo com todos os valores zerados
updateOrderSummary();
