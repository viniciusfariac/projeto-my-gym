function validating_name(name) {
    // Validação se nome tem menos que 3 caracteres
    if (name.length < 3) {
        return true
    }
    return false
}

function validating_mail(mail) {
    let arroba = mail.indexOf('@')
    let ponto = mail.lastIndexOf('.')
    
    // Validação se tem arroba e ponto + validação se posição do ponto é maior que arroba
    if (arroba > 0 && ponto > 0 && ponto > arroba) {
        return false
    }

    return true
}


function validating_confirm_pass(pass, confirm_pass) {
    // Validação se senhas coincidem
    if (pass == confirm_pass) {
        return false
    }
    return true
}

function validating_pass(pass) {
    // Declarando regex utilizados na confirmação de senha
    let regex_special = new RegExp('[^a-zA-Z0-9]')
    let regex_number = new RegExp('[1-9]')
    let regex_lower_case = new RegExp('[a-z]')
    let regex_upper_case = new RegExp('[A-Z]')
    // Declarando variável booleana para verificação de repetição
    let repeat = false

    // Verificando se tem repetição de letrar com loop for, se repetir caracteres juntos marca repeat como true
    for (let i = 0; i < pass.length - 1; i++) {
        const after = pass[i + 1];
        const current = pass[i]
        if (after == current) {
            repeat = true
        }
    }

    // Validando regex e repeat
    if (regex_special.test(pass) && regex_number.test(pass) && regex_lower_case.test(pass) && regex_upper_case.test(pass) && pass.length >= 8 && !repeat) {
        return false
    }


    return true
}

function validating_blank_field(name, mail, pass, confirm_pass) {
    // Validando se tem algum campo em branco
    if (name == "" || mail == "" || pass == "" || confirm_pass == "") {
        
        return true
    }
    return false
}


function validating_pass_name(pass, full_name) {

    // Limpando o nome completo, tirando espaço do começo e do final, colocando em caixa baixo e usando split para criar um array, caso tenha espaço
    let name = full_name.trim().toLowerCase().split(" ")

    // Deixando a senha em caixa baixo
    pass = pass.toLowerCase()

    // Criando variável que vai armazenar a repetição do nome
    let qtd = []

    for (let i = 0; i < name.length; i++) {
        const element = name[i];

        // Caso uma parte do nome tenha na senha envia para qtd
        if (pass.includes(element)) {
            qtd.push(element)
        }
    }

    // Retorna qtd sem nada ou com algum elemento
    return qtd
}
