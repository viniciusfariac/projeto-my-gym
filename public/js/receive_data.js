function listar() {
    fetch("/muscle/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((muscles) => {
                muscles.forEach((muscle) => {
                    muscle_group.push(muscle)
                });
            })
            console.log(resposta.json())
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        })
}