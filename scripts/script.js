// Variáveis de controle
let precoCompraValue = 0;
let precoVendaValue = 0;
let frete = 0;
let lucro = 0;

// Elementos do DOM
const precoCompraInput = document.getElementById("precoCompra");
const freteInput = document.getElementById("frete");
const precoVendaInput = document.getElementById("precoVenda");
const taxaMLInput = document.getElementById("taxaML");
const embalagemInput = document.getElementById("embalagem");
const impostoInput = document.getElementById("imposto");
const resultsTable = document.getElementById("results-table");

// Valores padrão
const defaultTaxaML = "13% + R$ 6,00";
const defaultEmbalagem = "R$ 1,00";

taxaMLInput.value = defaultTaxaML;
embalagemInput.value = defaultEmbalagem;
impostoInput.value = "4%";

// Configuração dos event listeners
precoCompraInput.addEventListener("input", (event) => {
  precoCompraValue = parseFloat(event.target.value) || 0;
});

precoVendaInput.addEventListener("input", (event) => {
  precoVendaValue = parseFloat(event.target.value) || 0;
  atualizarFrete();
  calcularTotal(event);
});

freteInput.addEventListener("input", (event) => {
  frete = parseFloat(event.target.value.replace("R$ ", "")) || 0;
  calcularTotal(event);
});

if (!freteInput.value) setFreteValue(0);

function atualizarFrete() {
  frete = precoVendaValue && precoVendaValue >= 79 ? 24 : 0;
  setFreteValue(frete);
}

function calcularTotal(event) {
  event ?? event.preventDefault();
  if (!precoCompraValue || !precoVendaValue) return;
  // Obter valores dos inputs
  const embalagem = parseFloat(embalagemInput.value.replace("R$ ", "")) || 0;
  const imposto = parseFloat(impostoInput.value) || 0;
  const taxaML = precoCompraValue * 0.13 + 6;

  // Cálculo do custo total e lucro
  const totalParcial = precoCompraValue + frete + taxaML + embalagem;
  const total = totalParcial + (totalParcial * (imposto / 100));
  lucro = precoVendaValue - total || 0;

  // Escolher a classe de estilo correta para o lucro
  const lucroClass = lucro >= 0 ? "positive" : "negative";

  // Atualizar a tabela de resultados
  resultsTable.innerHTML = `
    <tr><td>Valor do Produto</td><td>R$ ${precoCompraValue.toFixed(2)}</td></tr>
    <tr><td>Frete</td><td>R$ ${frete.toFixed(2)}</td></tr>
    <tr><td>Imposto</td><td>${imposto.toFixed(2)}%</td></tr>
    <tr><td>Taxa Fixa ML</td><td>R$ ${taxaML.toFixed(2)}</td></tr>
    <tr><td>Embalagem</td><td>R$ ${embalagem.toFixed(2)}</td></tr>
    <tr><td>Custo Total</td><td>R$ ${total.toFixed(2)}</td></tr>
    <tr><td>Lucro</td><td class="${lucroClass}">R$ ${lucro.toFixed(2)}</td></tr>
  `;
}

function resetCalculations() {
  // Limpar os campos de entrada
  precoCompraInput.value = "";
  precoVendaInput.value = "";
  setFreteValue(0);

  precoCompraValue = 0;
  precoVendaValue = 0;
  frete = 0;

  // Reverter para os valores fixos padrão
  taxaMLInput.value = defaultTaxaML;
  embalagemInput.value = defaultEmbalagem;

  // Limpar a tabela e o total
  resultsTable.innerHTML = "";
}

function setFreteValue(value) {
  freteInput.value = `R$ ${value.toFixed(2)}`;
}
