function showPass(ipt_pass, ipt_confirm) {
    // Selecionando elementos pelo id
    let pass = document.getElementById(ipt_pass)
    let confirm = document.getElementById(ipt_confirm)

    // Validando o tipo do elemento, se for senha troca para text e muda o icon, se for text muda para senha e muda o icon
    if (pass.type == 'password') {
        pass.type = 'text'
        confirm.classList.replace('ph-eye', 'ph-eye-slash')
    } else {
        pass.type = 'password'
        confirm.classList.replace('ph-eye-slash', 'ph-eye')
    }
}