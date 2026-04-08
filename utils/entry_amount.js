export function EntryAmnt() {

function updateVisitCounter(visits) {
    visits++
    localStorage.visit = visits;
    console.log(localStorage.getItem('visit'));
    document.getElementById('visitAmountUser').innerHTML = "Вы посетили сайт " + visits + " раз";
}
let visits = parseInt(localStorage.getItem('visit') || '0');
updateVisitCounter(visits)
}