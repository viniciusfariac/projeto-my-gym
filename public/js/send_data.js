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

async function validatingRegisterTrainingExercise() {
    let name = input_name.value
    let type = input_type.value
    let day = validating_week_day(listDay)
    let message_text = document.getElementById("message_text")

    let selects_exercises = document.querySelectorAll("#select_exercise")
    let sets = document.querySelectorAll("#ipt_exercise")

    let validate = false
    for (let i = 0; i < selects_exercises.length && i < sets.length; i++) {
        const exercise = selects_exercises[i].value;
        const set = sets[i].value

        if (exercise == 'default' || set <= 0) {
            validate = true
        }

    }

    console.log(validate, 'A')

    if (!name || !type || listDay.length <= 0 || validate) {
        message_text.style.color = "#DC2626"
        message_text.innerHTML = "Preencha todos os campos"
        message_text.style.opacity = "1"
        message_text.style.transform = "translateX(0)"
        return
    }

    console.log(name, type, day)
    let id_training = await registerTraining(name, type, day)

    if (typeof id_training != "number") {
        console.log(id_training)
        message_text.style.color = "#DC2626"
        message_text.innerHTML = "Treino não encontado"
        message_text.style.opacity = "1"
        message_text.style.transform = "translateX(0)"
        return
    }

    for (let i = 0; i < selects_exercises.length && i < sets.length; i++) {
        const exercise = selects_exercises[i].value;
        const set = sets[i].value

        console.log(exercise, set)

        let id_exercise = await registerExercise(id_training, exercise, set)

        console.log(id_exercise)

        if (typeof id_exercise != "number") {
            console.log(id_exercise)
            message_text.style.color = "#DC2626"
            message_text.innerHTML = "Exercicio não encontrado"
            message_text.style.opacity = "1"
            message_text.style.transform = "translateX(0)"
            return
        }
    }

    message_text.style.opacity = "1"
    message_text.style.transform = "translateX(0)"
    message_text.style.color = "#16A34A"
    message_text.innerHTML = "Treino cadastrado com sucesso"

}

async function registerTraining(name, type, day) {
    console.log(name, type, day)
    let response = await fetch("/treinos/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: sessionStorage.ID_USUARIO,
            nomeServer: name,
            typeServer: type,
            dayServer: day
        }),
    })
    let json_training = await response.json()

    if (!json_training.resultado) {
        return false
    }

    return json_training.insertId
}
async function registerExercise(id_training, id_exercise, set) {

    let response = await fetch("/user/exercise/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idTrainingServer: id_training,
            idExerciseServer: id_exercise,
            setServer: set
        }),
    })
    let json_exercise = await response.json()

    if (!json_exercise.resultado) {
        return false
    }

    return json_exercise.insertId

}

async function showFrequencyDay() {
    let response = await fetch(`/treinos/frequencia-mes/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await response.json()

    if (json.length <= 0) {
        return kpi_day.innerHTML = "Sem dados cadastrados"
    }

    if (!json[0].frequencia) {
        return kpi_day.innerHTML = "Sem dados cadastrados"
    }
    kpi_day.innerHTML = `${json[0].frequencia}x esse mês`
}

async function showFrequencyHour() {
    let response = await fetch(`/treinos/frequencia-horario/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await response.json()

    if (json.length <= 0) {
        return kpi_often.innerHTML = "Sem dados cadastrados"
    }

    if (!json[0].horario) {
        return kpi_often.innerHTML = "Sem dados cadastrados"
    }

    kpi_often.innerHTML = `${json[0].horario} horas`
}

async function showGoal() {
    let response = await fetch(`/treinos/frequencia-meta/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })


    let json = await response.json()

    if (json.length <= 0) {
        kpi_goal_progress.innerHTML = "Nos últimos 30 dias"
        return kpi_goal_month.innerHTML = "Sem treinos cadastrados"
    }


    if (!json[0].meta_mensal || !json[0].dias_treinados || !json[0].progresso) {
        kpi_goal_progress.innerHTML = "Nos últimos 30 dias"
        return kpi_goal_month.innerHTML = "Sem treinos cadastrados"
    }

    kpi_goal_month.innerHTML = `Você precisa treinar ${json[0].meta_mensal}x`
    kpi_goal_progress.innerHTML = `Seu progresso atual ${json[0].progresso}`
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

async function searchTrainingExercise(id_training) {
    let response = await fetch(`/user/exercise/listar/${id_training}`)

    let json = await response.json()

    return json
}

async function showUserTraining() {
    let json = await searchUserTraining()
    let validate = validatingUserTraining(json)

    if (!validate) {
        let content_choices = document.getElementById('content_choices')
        content_choices.innerHTML = `
        <h1>CADASTRE UM TREINO PRIMEIRO</h1>
        <h2>Clique logo abaixo: </h2><span><a href="./register_training.html">Cadastrar treino</a>`
        return
    }

    let element_html = document.getElementById('select_training')
    element_html.innerHTML = `<option value="default" selected disabled>Escolha o treino</option>`

    json.forEach((training) => {
        let name_training = training.name_training
        let id_training = training.id_training
        element_html.innerHTML += `<option value="${id_training}">${name_training}</option>`
    })
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

async function showTrainingExercise() {
    let select_training = document.getElementById("select_training")
    let id_training = select_training.value
    let select_exercise = document.getElementById("select_exercise")

    let json_exercise = await searchTrainingExercise(id_training)
    select_exercise.innerHTML = "<option value='default' selected disabled>Escolha um exercício</option>"

    json_exercise.forEach((exercise) => {
        let exercise_name = exercise.exercise_name
        let id_training_exercise = exercise.id_training_exercise

        select_exercise.innerHTML += `<option value="${id_training_exercise}">${exercise_name}</option>`
    })
}

async function searchProgressionWeight(id_training_exercise, id_user) {
    let response = await fetch(`/treinos/progressao-carga/${id_user}/${id_training_exercise}`)

    let json = await response.json()

    console.log(json)

    return json
}

async function searchProgressionRep(id_training_exercise, id_user) {
    let response = await fetch(`/treinos/progressao-rep/${id_user}/${id_training_exercise}`)

    let json = await response.json()

    console.log(json)

    return json
}

async function showGraphTraining(func, graph, data) {
    let select_training = document.getElementById("select_training")
    let select_exercise = document.getElementById("select_exercise")

    let id_exercise = select_exercise.value
    let id_user = sessionStorage.ID_USUARIO

    let json = await func(id_exercise, id_user)

    let grouped = []
    let datasets = []
    let labels_lines = []

    json.forEach((value) => {
        let training_date = value.training_date
        let date = new Date(training_date)
        let month = date.getMonth() + 1
        let formatted_date = new Intl.DateTimeFormat('pt-BR').format(date)

        let month_exist = false
        let index = -1

        for (let i = 0; i < grouped.length; i++) {
            const element = grouped[i];

            if (element.month == month) {
                month_exist = true
                index = i
                break
            }
        }

        if (!month_exist) {
            grouped.push({
                "month": month,
                "datas": []
            })
            index = grouped.length - 1
        }
        if (data == "average_rep") {
            grouped[index].datas.push(value.average_rep)
        } else if (data == "max_weight") {
            grouped[index].datas.push(value.max_weight)
        }

    })

    for (let i = 0; i < grouped.length; i++) {
        const element = grouped[i];

        let month = element.month
        let data_opt = element.datas

        datasets.push({
            label: `Progressão mês ${month}`,
            data: data_opt,
            borderWidth: 2
        })
    }

    let length_lines = 0

    datasets.forEach(value => {
        length_lines = length_lines > value.data.length ? length_lines : value.data.length
    })

    for (let i = 1; i <= length_lines; i++) {
        labels_lines.push(`${i}º Treino`)
    }

    console.log("labels_lines: ", labels_lines)

    graph.data = {
        "labels": labels_lines,
        "datasets": datasets
    };

    graph.update()
}

async function showDashTraining() {
    let display_dash = document.getElementById("display_dash")
    display_dash.style.display = "block"
    setTimeout(() => {
        display_dash.style.opacity = "1";
    }, 10)

    await showGraphTraining(searchProgressionWeight, chart_weight, "max_weight")
    await showGraphTraining(searchProgressionRep, chart_average, "average_rep")
    await showKpisTraining()
}

async function searchTotalWeight() {
    let id_user = sessionStorage.ID_USUARIO

    let response = await fetch(`/treino-registro/peso-total/${id_user}/30`)
    let json = await response.json()

    return json
}

async function showTotalWeight() {
    let json = await searchTotalWeight()

    if (json.length <= 0) {
        return kpi_total_weight.innerHTML = "Sem dados cadastrados"
    }

    if (!json[0].peso_total) {
        return kpi_total_weight.innerHTML = "Sem dados cadastrados"
    }

    kpi_total_weight.innerHTML = `${json[0].peso_total}kg`
}

async function searchComeDay() {
    let id_user = sessionStorage.ID_USUARIO

    let response = await fetch(`/treino-registro/dia-ido/${id_user}`)
    let json = await response.json()

    console.log('Month: ', json)

    return json
}

async function searchCompareExercise(id_training_exercise) {

    let response = await fetch(`/treino-registro/comparacao-treino/${id_training_exercise}`)
    let json = await response.json()

    console.log(json)

    return json
}

async function searchPr(id_training_exercise) {
    let response = await fetch(`/treino-registro/maximo-carga/${id_training_exercise}`)
    let json = await response.json()

    console.log(json)

    return json
}


async function showKpisTraining() {
    let id_training_exercise = select_exercise.value
    let json_compare = await searchCompareExercise(id_training_exercise)
    let json_pr = await searchPr(id_training_exercise)
    console.log(json_compare, json_pr, json_compare.length, json_pr.length)
    let volume;
    let reps;
    let pr;
    if (json_compare.length > 0) {
        volume = json_compare[0]["progresso_volume"]
        reps = json_compare[0]["progresso_reps"]
    }

    if (json_pr.length > 0) {
        pr = json_pr[0]["pr"]
    }


    let kpi_rep = document.getElementById("kpi-rep")
    let kpi_weight = document.getElementById("kpi-weight")
    let kpi_pr = document.getElementById("kpi-pr")

    kpi_rep.innerHTML = reps ? `${reps} reps` : "Sem dados"
    kpi_weight.innerHTML = volume ? volume : "Sem dados"
    kpi_pr.innerHTML = pr ? `${pr}kg` : "Sem dados"
}

async function searchFrequencyWeek() {
    let id_user = sessionStorage.ID_USUARIO

    let response = await fetch(`/treino-registro/frequencia-semana/${id_user}`)
    let json = await response.json()

    console.log(json)

    return json
}

async function searchWeekComparison() {
    let id_user = sessionStorage.ID_USUARIO

    let response = await fetch(`/treino-registro/comparacao-semana/${id_user}`)
    let json = await response.json()

    console.log(json)

    return json
}

async function showGraphFrequencyWeek() {
    let json = await searchFrequencyWeek()
    let graph = week_comparison_chart

    let datasets = []
    let labels_lines = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]
    let days_gone = []

    json.forEach((value) => {
        days_gone.push(value.frequencia_semana)
    })

    datasets.push({
        label: "Frequência",
        data: days_gone,
        backgroundColor: 'rgba(59,130,246,0.3)',
        borderColor: '#3b82f6',
        borderWidth: 2
    })

    console.log(datasets)
    graph.data = {
        "labels": labels_lines,
        "datasets": datasets
    };

    graph.update()
}

async function showGraphWeekComparison() {
    let json = await searchWeekComparison()
    let graph = weekly_frequency_chart

    let datasets = []
    let labels_lines = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo", "Domingo"]
    let frequency = new Array(7)
    console.log(frequency)

    json.forEach((value) => {
        frequency[value.dia_semana - 2] = value.frequencia
    })

    datasets.push({
        label: "Frequência",
        data: frequency,
        backgroundColor: 'rgba(59,130,246,0.3)',
        borderColor: '#3b82f6',
        borderWidth: 2
    })

    console.log(datasets)
    graph.data = {
        "labels": labels_lines,
        "datasets": datasets
    };

    graph.update()
}

async function showSetExercises() {
    const params = new URLSearchParams(window.location.search);

    const id_training = params.get("id");

    let json = await searchTrainingExercise(id_training)

    let container_exercise = document.getElementById("container_training")
    let container_title = document.getElementById("container_title")

    container_title.innerHTML = `
        <h1>CADASTRAR SESSÃO</h1>
        <h2>${json[0].name_training}</h2>
    `
    json.forEach((value) => {
        let div_set = "";
        for (let i = 1; i <= value.set_exercise; i++) {
            const qtd = value.set_exercise[i];
            const name_exercise = value.exercise_name.trim().replaceAll(' ', '_').toLowerCase()
            div_set += `
            <div class="input_set" id="${name_exercise}">
                <span>Serie ${i}</span>
                <input type="number" placeholder="120kg" id="${i}" class="${value.exercise_name.replaceAll(' ', '_').toLowerCase()}_weight">
                <input type="number" placeholder="10reps" id="${i}" class="${value.exercise_name.replaceAll(' ', '_').toLowerCase()}_rep">
            </div>
            `
        }
        container_exercise.innerHTML += `
        <section class="container_exercise">
                    <img src="${value.url_image}"
                        alt="Imagem de ${value.exercise_name}">
                    <div class="container_set" id="container_set">
                        <div class="content_header" id="content_header">
                            <h2 class="name_exercise" id="${value.id_training_exercise}">${value.exercise_name}</h2>
                            <p class="description_exercise" id="description_exercise">${value.description}</p>
                        </div>
                        <div class="content_main">
                            ${div_set}
                        </div>
                    </div>
                </section>`
    })

    container_exercise.innerHTML += `               
    <div class="button_input" id="button_input">
        <button class="button button_set" onclick="registerTrainingSet()">Registrar serie</button>
        <div class="container_message_text">
            <p class="message_text" id="message_text"></p>
        </div>
    </div>`
}

async function registerLog(id_training_exercise) {
    let response = await fetch("/treino-serie/cadastrar-log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idTrainingExerciseServer: id_training_exercise
        })
    })

    let json = await response.json()

    return json
}

async function registerSet(setOrder, idTrainingLog, rep, weight) {
    let response = await fetch("/treino-serie/cadastrar-serie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            setOrderServer: setOrder,
            idTrainingLogServer: idTrainingLog,
            repServer: rep,
            weightServer: weight,
        })
    })

    let json = await response.json()

    return json
}

async function registerTrainingSet() {
    let names_exercises = document.querySelectorAll(".name_exercise")
    let message_text = document.getElementById("message_text")


    let boolean = validatingRegisterTraining()
    if (!boolean) {
        message_text.style.color = "#DC2626"
        message_text.innerHTML = "Preencha todos os campos"
        message_text.style.opacity = "1"
        message_text.style.transform = "translateX(0)"
        return
    }

    for (let i = 0; i < names_exercises.length; i++) {
        const id_training_exercise = names_exercises[i].id;
        let json = await registerLog(id_training_exercise)
        let insertId = json.insertId
        let name = names_exercises[i].textContent.trim().replaceAll(" ", "_").toLowerCase()
        console.log(name)
        let name_weight = document.querySelectorAll(`.${name}_weight`)
        let name_rep = document.querySelectorAll(`.${name}_rep`)
        console.log(name_weight, name_rep)
        for (let i = 0; i < name_weight.length && i < name_rep.length; i++) {
            let setOrder = name_rep[i].id
            let rep = name_rep[i].value
            let weight = name_weight[i].value
            let json = await registerSet(setOrder, insertId, rep, weight)
        }
    }

    message_text.style.opacity = "1"
    message_text.style.transform = "translateX(0)"
    message_text.style.color = "#16A34A"
    message_text.innerHTML = "Treino cadastrado com sucesso"
}

function validatingRegisterTraining() {
    let names_exercises = document.querySelectorAll(".name_exercise")
    let boolean = true
    for (let i = 0; i < names_exercises.length; i++) {
        const id_training_exercise = names_exercises[i].id;
        let name = names_exercises[i].textContent.trim().replaceAll(" ", "_").toLowerCase()
        let name_weight = document.querySelectorAll(`.${name}_weight`)
        let name_rep = document.querySelectorAll(`.${name}_rep`)
        for (let i = 0; i < name_weight.length && i < name_rep.length; i++) {
            let setOrder = name_rep[i].id
            let rep = name_rep[i].value
            let weight = name_weight[i].value
            if (!setOrder || !rep || !weight || setOrder <= 0 || rep <= 0 || weight <= 0) {
                boolean = false
                return boolean
            }
        }
    }

    return boolean
}

function validatingUserTraining(json) {
    return json.length > 0 ? true : false
}

function showMonthCalendar() {
    let content = document.getElementById("content_graph_month")
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    const week_days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

    let current_date = new Date()
    let current_month = current_date.getMonth()
    let current_year = current_date.getFullYear()
    let first_day = new Date(`${current_year}-${current_month + 1}-01`)
    let first_week = first_day.getDay()

    const days = [31, (current_year % 4 == 0 && current_year % 100 != 0) || (current_year % 400 == 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let month = months[current_month]
    let day = days[current_month]

    for (let i = 0; i < first_week; i++) {
        content.innerHTML += `
        <div></div>
        `
    }
    for (let i = 1; i <= day; i++) {
        content.innerHTML += `
        <div class="chart_square" id="${i}">
            <p>${i}</p>
        </div>
        `
    }
}

async function plotCalendar() {
    showMonthCalendar()
    let json = await searchComeDay()

    let days = []
    let chart_square = document.querySelectorAll(".chart_square")
    json.forEach((value) => {
        days.push(value.dia)
    })

    chart_square.forEach((value) => {
        if (days.includes(Number(value.id))) {
            value.style.backgroundColor = "#16A34A"
        }
    })
}

async function initDash() {
    await showFrequencyDay()
    await showFrequencyHour()
    await showGoal()
    await showTotalWeight()
    await showListTraining()
    await showGraphFrequencyWeek()
    await showGraphWeekComparison()
    await plotCalendar()
}

async function initTrainingSet() {
    await showListTraining()
    await showSetExercises()
}

async function initDashTraining() {
    await showUserTraining()
    await showListTraining()
}

function logout() {
    sessionStorage.clear();
    window.location = "../login.html";
}