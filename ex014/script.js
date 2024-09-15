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
        .catch(error => console.error(error))
}

document.addEventListener("DOMContentLoaded", function() {
    function loadContentMain(page) {
        fetch(page)
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    throw new Error(`Erro ao carregar o conteúdo ${page}`)
                }
            })
            .then(data => {
                document.getElementById("main-section").innerHTML = data
            })
            .catch(error => {
                console.error(error)
            })
    }
    function addLinkListeners() {
        const links = document.querySelectorAll("a[data-page]") //armazena elementos a que possuem atributo 'data-page'
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
                    inicio: "menu/inicio.html",
                    sobre: "menu/sobremim.html",
                    formacao: "menu/formacao.html",
                    experiencia: "menu/experiencia.html",
                    habilidades: "menu/habilidades.html",
                    projetos: "menu/projetos.html"
                }
                const page = link.getAttribute("data-page")
                const pageMapUrl = pageMap[page]
                if (pageMapUrl) {
                    loadContentMain(pageMapUrl)
                } else {
                    console.error(`Página não encontrada para o identificador ${page}`)
                }
            })
        })
    }
    loadContentMain("menu/inicio.html")
    loadContent("header", "header.html", addLinkListeners)
    loadContent("footer", "footer.html")
})