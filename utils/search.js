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

    const searchCover = document.getElementById('coverSearch');
    searchCover.addEventListener('input', function(e) {
        pictures.forEach(pic => {
        pic.style.display='block';
        })
        const hiddenCovers = filterItems(uniqueCovers,e.target.value);
        hiddenCovers.forEach(pic => {
            const picId = '[data-id="'+pic+'"]'
            let picNeed = document.querySelectorAll(picId);
            picNeed.forEach(pic2 => {
                pic2.style.display = 'none';
            })
        })
    })
}