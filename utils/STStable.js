let tableData = [];
let currentSort = {column:null, direction:'asc'};
async function loadJson() {
    try {
        const response = await fetch('../data/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Упс!',error);
        throw error;
    }
}

function sort(column, direction){
    const sortedData = [...tableData];
    sortedData.sort((a,b) => {
        let A = a[column];
        let B = b[column];

        if (column === 'cost') {
            return direction === 'asc' ? A - B : B - A;
        } else {
            A = String(A).toLowerCase();
            B = String(B).toLowerCase();
            return direction === 'asc' ? A.localeCompare(B, 'ru') : B.localeCompare(A, 'ru');
        }
    });
    return sortedData;
}

function renderTable() {
    const tbody = document.querySelector('#STS-table tbody')
    let dataToRen = tableData;
    if (currentSort.column) {
        console.log("Сортировка по:",currentSort.column)
        dataToRen = sort(currentSort.column, currentSort.direction);
    }
    const rows = dataToRen.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.char}</td>
            <td>${item.cost}</td>
            <td>${item.desc}</td>
        </tr>
        `).join('');

    tbody.innerHTML = rows;
}

function headClick(event) {
    const th = event.target.closest('th');
    if (!th){
        console.log("Не найден th");
        return;
    }
    const column = th.dataset.column;
    console.log("Колонка:", column);
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    renderTable();
}

async function lockNload() {
    const tbody = document.querySelector('#STS-table tbody');
    tbody.innerHTML = '<tr><td>Загрузка епт</td></tr>';

    try {
        const newData = await loadJson();
        tableData.length = 0;
        tableData.push(...newData);
        currentSort = { column:null, direction:'asc' };
        renderTable();
    } catch(error) {
        tbody.innerHTML = '<tr><td>Ошибка епт</td></tr>';
        console.error(error);
    }
}

 export function initTable() {
    lockNload();
    document.querySelectorAll('#STS-table th').forEach(header => {
        header.addEventListener('click', headClick);
    });
}