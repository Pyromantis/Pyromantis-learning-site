export function Calc() {
    const display = document.getElementById('display');
    display.value = '';

    const Buttons = document.querySelectorAll('#appender');
    Buttons.forEach(retard => {
        retard.addEventListener('click', () => {
            display.value += retard.innerHTML;
        });
    });

    const Clenex = document.getElementById('clearer');
    Clenex.onclick = () => {
        display.value = '';
    };

    const AsianKid = document.getElementById('calculator');
    AsianKid.onclick = () => {
        display.value = eval(display.value);
    };
}