async function loadData() {
    await searchMuscle()
    await searchAllExercise()
    await showListTraining()
    init()
}

function init() {
    addOneMore()
}

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

    let selected = document.querySelectorAll('.selected')

    if (selected.length > 0) {
        selected[0].classList.remove('selected')
        listDay = ''
    }

    if (!day.classList.contains("selected")) {
        day.classList.add('selected')
        listDay = type
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
                                    <select id="select_muscle_group" class="exercise${len + 1}" oninput="showDinamicExercise('exercise${len + 1}', 'select_exercise${len + 1}'); checkThirdCircle()">
                                        <option value="default" selected disabled>Escolha um grupo muscular</option>
                                    </select>
                                </div>
                                <div class="choice_group">
                                    <span>Exercício</span>
                                    <select id="select_exercise" class="select_exercise${len + 1}" oninput="checkThirdCircle()">
                                    <option value="default" selected disabled>Escolha um exercício</option>
                                    </select>
                                </div>
                            </div>
                            <div class="choice_set">
                                <p>Séries para esse exercício</p>
                                <input type="number" id="ipt_exercise" oninput="checkThirdCircle()">
                            </div>
                        </div>
                    </div>
    `)
    showGroup()
    showRegisterExercise()
    checkThirdCircle()
}

function removeOneMore() {
    let box = document.getElementById("box_exercise")
    let cards = document.querySelectorAll("#card_exercise")
    if (cards.length === 1) {
        return
    }
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

        const select_exercise = document.getElementsByClassName(`select_exercise${i}`)[0].value
        const select_group = document.getElementsByClassName(`exercise${i}`)[0].value
        if (select_exercise != "default" || (select_group != "default" && select_exercise != "default")) {
            count++
        }
    }

    const input = document.querySelectorAll("#ipt_exercise")
    let filter_ipt = true

    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if (!element.value.length || element.value.length <= 0) {
            filter_ipt = false
            break
        }
    }

    if (count == cards.length && filter_ipt) {
        step.classList.remove("active")
        step.classList.add("completed")
        circle.innerHTML = "✔"
    } else {
        step.classList.remove("completed")
        step.classList.add("active")
        circle.innerHTML = "3"
    }
}

function showDashExercise(choice, className) {
    let select_training = document.getElementById(choice)
    let choice_class = document.getElementById(className)
    if (select_training.value != "default") {
        choice_class.style.display = 'flex'

        setTimeout(() => {
            choice_class.style.opacity = "1";
            choice_class.style.transform = "translateX(0)";
            choice_class.style.transform = "translateY(0)";
        }, 10)
    } else {
        choice_class.style.display = 'none'
    }
}

async function searchMuscle() {
    let response = await fetch("/muscle/listar", {
        method: "GET",
    })

    let json = await response.json()

    json.forEach((muscle) => {
        muscle_group.push(muscle)
    })
}

async function searchExerciseMuscle(select) {
    let select_muscle = document.getElementsByClassName(`${select}`)
    console.log(select_muscle[0].value)
    let response = await fetch(`/exercise/buscar/${select_muscle[0].value}`)

    let json = await response.json()
    return json
}

function showGroup() {
    let selects_muscles = document.querySelectorAll("#select_muscle_group")
    let select_muscle = selects_muscles[selects_muscles.length - 1]


    muscle_group.forEach((muscle) => {
        const nome = muscle.name_group
        const id = muscle.id_muscle

        select_muscle.innerHTML += `<option value="${id}">${nome}</option>`
    })
}

async function searchAllExercise() {
    let response = await fetch("/exercise/listar/", {
        method: "GET"
    })

    let json = await response.json()

    json.forEach((exercise) => {
        all_exercise.push(exercise)
    })
}

function showRegisterExercise() {
    let selects_exercises = document.querySelectorAll("#select_exercise")
    let select_exercise = selects_exercises[selects_exercises.length - 1]

    all_exercise.forEach((exercise) => {
        const nome = exercise.exercise_name
        const id = exercise.id_exercise

        select_exercise.innerHTML += `<option value="${id}">${nome}</option>`
    })
}

async function showDinamicExercise(select, exercise) {
    let json = await searchExerciseMuscle(select)
    let selects_exercises = document.getElementsByClassName(exercise)
    let select_exercise = selects_exercises[0]
    select_exercise.innerHTML = ""
    console.log(json)

    select_exercise.innerHTML = `<option value="default" selected disabled>Selecione ume exercício</option>`
    for (let i = 0; i < json.length; i++) {
        const json_exercise = json[i];
        const nome = json_exercise["exercise_name"]
        const id = json_exercise["id_exercise"]

        selects_exercises[0].innerHTML += `<option value="${id}">${nome}</option>`
    }
}


async function showListTraining() {
    let json = await searchUserTraining()
    let element_html = document.getElementById('list_training')

    json.forEach((training) => {
        let name_training = training.name_training
        let id_training = training.id_training
        element_html.innerHTML += ` <li class="item_list"><a href=training_set.html?id=${id_training} id="id_${id_training}">${name_training}</a></li>`
    })
}

async function searchUserTraining() {
    let response = await fetch(`/treinos/listar/${sessionStorage.ID_USUARIO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
    )

    let json = await response.json()

    return json
}