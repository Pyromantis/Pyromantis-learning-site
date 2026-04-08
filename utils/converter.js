const response = await fetch('../data/conversionRates.json')
const exchangeRates = await response.json()

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    document.getElementById('result').value = ''
    document.getElementById('result').value = convertedAmount.toFixed(2);
}

export function Convert() {
    document.getElementById('amount').addEventListener('input', convertCurrency);
    document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
    document.getElementById('toCurrency').addEventListener('change', convertCurrency);
    convertCurrency();
}