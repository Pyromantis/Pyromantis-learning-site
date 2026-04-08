function Greetings() {
    const hour = new Date().getHours();
    let greeting;
    switch (true) {
        case (hour >= 5 && hour < 12):
        greeting = "Доброе утро";
        break;
    case (hour >= 12 && hour < 17):
        greeting = "Добрый день";
        break;
    case (hour >= 17 && hour < 23):
        greeting = "Добрый вечер";
        break;
    default:
        greeting = "Доброй ночи";
    }
    return greeting;
}

export function GreetUpdate() {
    const greetElement = document.getElementById('GreetUser');
    if (greetElement) {
        greetElement.innerText = Greetings() +", бандиты";
    }
}
