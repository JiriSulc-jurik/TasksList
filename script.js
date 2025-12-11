document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.querySelector('#task');
    const submitButton = document.querySelector('#submit');
    const tasksList = document.querySelector('#tasks');

    // 1) Načtení úkolů nebo vytvoření prázdného pole
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 2) Zobrazení existujících úkolů
    tasks.forEach(text => {
        addTaskToList(text);
    });

    submitButton.disabled = true;

    taskInput.onkeyup = () => {
        submitButton.disabled = taskInput.value.trim().length === 0;
    };

    // 3) Přidání nového úkolu
    document.querySelector('form').onsubmit = (event) => {
        event.preventDefault();

        const text = taskInput.value.trim();
        if (text === '') return;

        addTaskToList(text);
        tasks.push(text);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
        submitButton.disabled = true;
    };

    // 🔹 Funkce, která vytvoří <li> s textem i tlačítkem "smazat"
    function addTaskToList(text) {
        const li = document.createElement('li');

        // Text úkolu
        const span = document.createElement('span');
        span.textContent = text;

        // Tlačítko smazat
        const btn = document.createElement('span');
        btn.textContent = "❌";
        btn.className = "delete-btn";

        // Funkce mazání
        btn.onclick = () => {
            // Smazat z HTML
            li.remove();

            // Smazat z pole tasks
            tasks = tasks.filter(t => t !== text);

            // Aktualizovat localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.append(span, btn);
        tasksList.append(li);
    }
});
