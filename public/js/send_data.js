function validating_week_day(day) {
    if (day == 'seg') {
        return "Segunda"
    }
    if (day == 'ter') {
        return "Terça"
    }
    if (day == 'qua') {
        return "Quarta"
    }
    if (day == 'qui') {
        return "Quinta"
    }

    if (day == 'sex') {
        return "Sexta"
    }
    if (day == 'sab') {
        return "Sabádo"
    }
    if (day == 'dom') {
        return "Domingo"
    }
}

function registerTraining() {
    let name = input_name.value
    let type = input_type.value
    let day = validating_week_day(listDay)
    let message_text = document.getElementById("message_text")

    if (!name || !type || listDay.length <= 0) {
        console.log("AAA")
        message_text.style.color = "#DC2626"
        message_text.innerHTML = "Preencha todos os campos"
        message_text.style.display = "Block"
        return
    }


    message_text.style.color = "#16A34A"
    message_text.innerHTML = "Treino cadastrado"
    message_text.style.display = "Block"

    fetch("/treinos/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idServer: sessionStorage.ID_USUARIO,
            nomeServer: name,
            typeServer: type,
            dayServer: day
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                div_response.style.display = "none";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    registerExercise()
}

function registerExercise() {

}


function makeLogin() {
    // Declarando as variáveis
    let full_name = ipt_name.value
    let mail = ipt_mail.value
    let pass = ipt_pass.value
    let confirm_pass = ipt_confirm_pass.value

    // Verificação de campos em branco
    if (validating_blank_field(full_name, mail, pass, confirm_pass)) {
        div_response.style.display = "block"
        error_response.innerHTML = "Todos os campos precisam estar preenchidos"
        return false
    }

    // Verificação de nome para até 3 caracteres
    if (validating_name(full_name)) {
        div_response.style.display = "block"
        error_response.innerHTML = "O campo nome deve ter pelo menos 3 caracteres"
        return false
    }

    // Validação de estrutura de email, com ponto e arroba
    if (validating_mail(mail)) {
        div_response.style.display = "block"
        error_response.innerHTML = "Digite uma estrutura de email válida"
        return false
    }

    // Validação de senha
    if (validating_pass(pass)) {
        div_response.style.display = "block"
        error_response.innerHTML = "Senha precisa ter: 8 caracteres, numeros, letra maiúscula, letra minúscula, caracter especial e não pode repetir caracter junto"
        return false
    }

    // Conferindo se as senhas coincidem
    if (validating_confirm_pass(pass, confirm_pass)) {
        div_response.style.display = "block"
        error_response.innerHTML = "As senhas precisam coincidir"
        return false
    }

    // Validando se a senha não tem o nome do usuário
    let pass_name = validating_pass_name(pass, full_name)
    if (pass_name.length > 0) {
        div_response.style.display = "block"
        error_response.innerHTML = `A senha não pode ter parte do seu nome, como por exemplo: ${pass_name}`
        return false
    }

    // Aplicando display none se tudo estiver correto
    div_response.style.display = "none"

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: full_name,
            emailServer: mail,
            senhaServer: pass
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                div_response.style.display = "none";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}