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

function toggleSelectButton(type) {
    let day = document.getElementById(type)

    if (day.classList.contains("selected")) {
        day.classList.remove("selected")
        let index = listDay.indexOf(type)
        listDay.splice(index, 1)
    } else {
        day.classList.add("selected")
        listDay.push(type)

    }
    checkSecondCircle()
}

function checkFirstCircle() {
    let ipt_name = input_name.value
    let ipt_type = input_type.value
    let step = document.getElementById('step1')
    let circle = document.getElementById('circle1')

    if (ipt_name && ipt_type) {
        step.classList.remove("active")
        step.classList.add("completed")
        circle.innerHTML = "✔"
    } else {
        step.classList.remove("completed")
        step.classList.add("active")
        circle.innerHTML = "1"
    }
}

function checkSecondCircle() {
    let day_len = listDay.length
    let step = document.getElementById('step2')
    let circle = document.getElementById('circle2')

    if (day_len > 0) {
        step.classList.remove("active")
        step.classList.add("completed")
        circle.innerHTML = "✔"
    } else {
        step.classList.remove("completed")
        step.classList.add("active")
        circle.innerHTML = "1"
    }
}

function addOneMore() {
    let box = document.getElementById("box_exercise")
    let cards = document.querySelectorAll("#card_exercise")
    let len = cards.length
    box.insertAdjacentHTML('beforeend', `
                       <div class="card_exercise" id="card_exercise">
                        <div class="title_exercise">
                            <p id="title_exercise">Exercício ${len + 1}</p>
                        </div>
                        <div class="content_exercise">
                            <div class="container_choices">
                                <div class="choice_group">
                                    <span>Grupo muscular</span>
                                    <select id="">
                                        <option value="">Peito</option>
                                        <option value="">Ombro</option>
                                        <option value="">Triceps</option>
                                        <option value="">Quadriceps</option>
                                        <option value="">Glúteos</option>
                                        <option value="">Costas</option>
                                        <option value="">Bíceps</option>
                                        <option value="">Antebraço</option>
                                        <option value="">Panturrilha</option>
                                        <option value="">Adbomên</option>
                                    </select>
                                </div>
                                <div class="choice_group">
                                    <span>Exercício</span>
                                    <select id="">
                                        <option value="">Supino</option>
                                        <option value="">Pulley</option>
                                    </select>
                                </div>
                            </div>
                            <div class="choice_set">
                                <p>Séries para esse exercício</p>
                                <input type="number" id="ipt_exercise${len + 1}" oninput="checkThirdCircle()">
                            </div>
                        </div>
                    </div>
    `)
    checkThirdCircle()
}

function removeOneMore() {
    let box = document.getElementById("box_exercise")
    let cards = document.querySelectorAll("#card_exercise")
    let card = cards[cards.length - 1]
    card.remove()
    checkThirdCircle()
}

function checkThirdCircle() {
    let cards = document.querySelectorAll("#card_exercise")
    let step = document.getElementById('step3')
    let circle = document.getElementById('circle3')
    let count = 0
    for (let i = 1; i <= cards.length; i++) {
        const input = document.getElementById(`ipt_exercise${i}`)

        if (input.value) {
            count++
        }
    }

    if (count == cards.length) {
        step.classList.remove("active")
        step.classList.add("completed")
        circle.innerHTML = "✔"
    } else {
        step.classList.remove("completed")
        step.classList.add("active")
        circle.innerHTML = "3"
    }
}