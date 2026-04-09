export function Search() {
    const pictures = document.querySelectorAll('.picture')
    console.log("Найдено обложек:", pictures.length)

    function filterItems(arr, query) {
        return arr.filter((pic) => !pic.toLowerCase().includes(query.toLowerCase()))
    }
    const allCovers = [];
    pictures.forEach(pic => {
        allCovers.push(pic.getAttribute('data-id'));
    })
    const uniqueCovers = [...new Set(allCovers)];
    console.log(uniqueCovers);
    console.log(filterItems(uniqueCovers,"ар"));

    const searchCover = document.getElementById('coverSearch');
    searchCover.addEventListener('input', function(e) {
        const hiddenCovers = filterItems(uniqueCovers,e.target.value);
        console.log(hiddenCovers);
    })
}