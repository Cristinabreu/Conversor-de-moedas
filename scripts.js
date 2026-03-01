// Seleciona os elementos do DOM que vamos manipular
// Seleciona elementos DOM
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const yourCurrencySelect = document.querySelector(".selct-your-currency"); // Repare que no HTML está "selct-your-currency"
const currencyName = document.getElementById("currency-name");
const currencyImage = document.querySelector(".flag-currency");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value");

const currencyToConvertImage = document.querySelector(".currency-box img"); // primeira imagem da section
const currencyToConvertName = document.querySelector(".currency-box .currency"); // primeira moeda na section

// Objeto com taxas de câmbio (valores em real)
const taxas = {
  dolar: 5.50,
  euro: 6.20,
  libra: 7.20,
  bitcoin: 350000,
  real: 1.00
};

// Função para retornar o nome da moeda pelo value do select
const nomesMoedas = {
  real: "Real Brasileiro",
  dolar: "Dólar americano",
  euro: "Euro",
  libra: "Libra Esterlina",
  bitcoin: "Bitcoin"
};

// Função para retornar o caminho da imagem da moeda
const imagensMoedas = {
  real: "./assets/real.png",
  dolar: "./assets/dolar.png",
  euro: "./assets/euro.png",
  libra: "./assets/libra.png",
  bitcoin: "./assets/bitcoin.png"
};

// Atualiza moeda e imagem da moeda de destino
function changeCurrency() {
  const moedaSelecionada = currencySelect.value;

  currencyName.innerHTML = nomesMoedas[moedaSelecionada];
  currencyImage.src = imagensMoedas[moedaSelecionada];

  // Atualiza conversão ao mudar moeda
  convertValues();
}

// Atualiza moeda e imagem da moeda de origem
function changeYourCurrency() {
  const moedaSelecionada = yourCurrencySelect.value;

  currencyToConvertName.innerHTML = nomesMoedas[moedaSelecionada];
  currencyToConvertImage.src = imagensMoedas[moedaSelecionada];

  // Atualiza conversão ao mudar moeda
  convertValues();
}

// Função que converte os valores
function convertValues() {
  const valorDigitado = Number(inputCurrency.value);
  if (!valorDigitado) {
    currencyValueToConvert.innerHTML = "R$ 0,00";
    currencyValueConverted.innerHTML = "—";
    return;
  }

  // Moedas selecionadas
  const fromCurrency = yourCurrencySelect.value;
  const toCurrency = currencySelect.value;

  // Formata valor digitado na moeda origem
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: fromCurrency === "dolar" ? "USD" :
              fromCurrency === "euro" ? "EUR" :
              fromCurrency === "libra" ? "GBP" :
              fromCurrency === "bitcoin" ? "BTC" : "BRL"
  }).format(valorDigitado);

  // Converte valor para real (se for moeda diferente de real)
  const valorEmReal = fromCurrency === "real" ? valorDigitado : valorDigitado * taxas[fromCurrency];

  // Converte valor em real para moeda destino
  let valorConvertido = toCurrency === "real" ? valorEmReal : valorEmReal / taxas[toCurrency];

  // Formata valor convertido
  if (toCurrency === "bitcoin") {
    currencyValueConverted.innerHTML = valorConvertido.toFixed(6) + " BTC";
  } else {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: toCurrency === "dolar" ? "USD" :
                toCurrency === "euro" ? "EUR" :
                toCurrency === "libra" ? "GBP" : "BRL"
    }).format(valorConvertido);
  }
}

// Eventos para atualizar moeda origem e destino
currencySelect.addEventListener("change", changeCurrency);
yourCurrencySelect.addEventListener("change", changeYourCurrency);
convertButton.addEventListener("click", convertValues);

// Inicializa com valores padrão
changeCurrency();
changeYourCurrency();