let precoCompraValue = 0;
let precoVendaValue = 0;
let frete = 0;
let lucro = 0;

const precoCompraInput = document.getElementById("precoCompra");
precoCompraInput.addEventListener("input", (event) => {
  precoCompraValue = parseFloat(event.target.value) || 0;
});

const freteInput = document.getElementById("frete");
if (!frete || frete === 0) {
  setFreteValue(frete);
}

const precoVendaInput = document.getElementById("precoVenda");
precoVendaInput.addEventListener("input", (event) => {
  precoVendaValue = parseFloat(event.target.value) || 0;
  console.log("precoVendaValue", precoVendaValue);
  if (precoCompraValue && precoVendaValue && precoVendaValue <= 79) {
    frete = 24;
  } else {
    frete = 0;
  }
  setFreteValue(frete);
});

const taxaMLInput = document.getElementById("taxaML");
const embalagemInput = document.getElementById("embalagem");
const impostoInput = document.getElementById("imposto");

const defaultTaxaML = `13% + R$ 6,00`;

taxaMLInput && (taxaMLInput.value = defaultTaxaML);
embalagemInput && (embalagemInput.value = `R$ 1,00`);
impostoInput && (impostoInput.value = `4%`);

function calcularTotal() {
  const embalagem = parseFloat(embalagemInput.value.replace("R$ ", "")) || 0;
  const imposto = parseFloat(impostoInput.value) || 0;

  const taxaML = precoCompraValue * 0.13 + 6;

  console.log("frete", frete);
  const totalParcial = precoCompraValue + frete + taxaML + embalagem;
  const total = totalParcial + totalParcial * 0.04;

  lucro = precoVendaValue - total || 0;

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(
    2
  )}`;

  // Preencher a tabela com os valores
  const tabela = document.getElementById("results-table");
  tabela.innerHTML = `
    <tr><td>Valor do Produto</td><td>R$ ${precoCompraValue.toFixed(2)}</td></tr>
    <tr><td>Frete</td><td>R$ ${frete.toFixed(2)}</td></tr>
    <tr><td>Imposto</td><td>${imposto.toFixed(2)}%</td></tr>
    <tr><td>Taxa Fixa ML</td><td>R$ ${taxaML.toFixed(2)}</td></tr>
    <tr><td>Embalagem</td><td>R$ ${embalagem.toFixed(2)}</td></tr>
    <tr><td>Custo Total</td><td>R$ ${total.toFixed(2)}</td></tr>
    <tr><td>Lucro</td><td>R$ ${lucro.toFixed(2)}</td></tr>
  `;
}

function calculateCosts(e) {
  e.preventDefault();
  calcularTotal();
}

function resetCalculations() {
  if (!precoCompraInput.value && !precoVendaInput.value) return;
  // Limpar os campos de entrada
  document.getElementById("precoCompra").value = "";
  document.getElementById("frete").value = "";
  precoVendaInput.value = "";
  setFreteValue(0);

  valorTotal = 0;
  frete = 0;

  // Limpar os valores fixos
  taxaMLInput.value = defaultTaxaML;
  embalagemInput.value = `R$ 1,00`;

  // Limpar a tabela
  document.getElementById("results-table").innerHTML = "";
  // Limpar o total
  document.getElementById("total").textContent = "";
}

function setFreteValue(value) {
  freteInput.value = `R$ ${value.toFixed(2)}`;
}
