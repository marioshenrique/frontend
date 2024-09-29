function loadContent(elementId, file, callback) {
    fetch(file)
        .then(response => {
            if (response.ok) {
                return response.text()
            } else {
                throw new Error(`Erro ao carregar o conteúdo ${file}`)
            }
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data
            if (callback) {
                callback()
            }
        })
}
function toggleMenu() {
    const navList = document.getElementById('nav-list')
    const menuClose = document.getElementById('menu-close')
    const menuIcon = document.getElementById('menu-icon')
    navList.classList.toggle("show")
    menuClose.classList.toggle("show")
    menuIcon.classList.toggle("show")
}
document.addEventListener("DOMContentLoaded", function() {
    function addLinkListeners() {
        const links = document.querySelectorAll("a[data-page]")
        console.log(`Links encontrados após carregar o cabeçalho: ${links}`)
        links.forEach(link => {
            console.log(`Link encontrado: ${link.getAttribute("data-page")}`)
        })
        if (links.length === 0) {
            console.error("Nenhum link encontrado após carregar o cabeçalho")
        }
        links.forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault()
                const pageMap = {
                    "inicio": "inicio.html",
                    "sobre": "menu/sobre/sobre.html",
                    "cursos": "menu/cursos/cursos.html",
                    "bibliografia": "menu/bibliografia/bibliografia.html",
                    "materiais-didaticos": "menu/materiais-didaticos/materiais-didaticos.html"
                }
                const pageMapUrl = pageMap[link.getAttribute("data-page")]
                if (pageMapUrl) {
                    loadContent("main", pageMapUrl)
                    toggleMenu()
                } else {
                    console.error(`Página não encontrada para o link ${link.getAttribute("data-page")}`)
                }
            })
        })
    }
    // carregar o cabeçalho
    loadContent("header", "header.html", addLinkListeners)
    loadContent("main", "inicio.html")
})
