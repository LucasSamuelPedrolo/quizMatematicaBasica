const questao = document.getElementById('question');
const respostas = document.querySelectorAll('#btn-question');
const certaResposta = document.getElementById('result');
let operacao = geradorQuestao();
const timer = document.getElementById('timer');
const pontuacao = document.getElementById('pontuacao');
const btnIniciar = document.getElementById('start-btn');

const segundos = 1;
let timerStart;
let displayTempo = 5;
let pontos = 0;

questao.innerHTML = `Qual o resultado dessa questão? ${operacao}`;

btnIniciar.addEventListener('click', () => {
    btnIniciar.style.visibility = 'hidden';
    inicializadorContagem(segundos);
});

btnCorrect();

for (const botao of respostas) {
    if (!botao.innerHTML) {
        botao.innerHTML = criaFalsaRespostas(Number(eval(operacao)));
    }
    botao.addEventListener('click', (e) => {
        const el = e.target;
        verificaJogada(el.innerHTML, operacao);
    })
}

function novoJogo() {
    for (const botao of respostas) {
        if (!botao.innerHTML) {
            botao.innerHTML = Number(criaFalsaRespostas(Number(eval(operacao))));
        }
    }

    displayTempo = 10;
}

function verificaJogada(escolha1, RespCorreta) {
    if (Number(escolha1) === Number(eval(RespCorreta))) {
        certaResposta.innerHTML = "";
        certaResposta.innerHTML = "Anterior : Certa resposta +1 ponto";
        certaResposta.style.color = 'green'
        pontuacaoUser(+1);
        operacao = geradorQuestao();
        btnCorrect();
        novoJogo();
        questao.innerHTML = `Qual o resultado dessa questão? ${operacao}`;
    } else {
        certaResposta.innerHTML = "";
        certaResposta.innerHTML = `Anterior : Resposta Errada -1 Correta anterior: ${eval(operacao)}`;
        pontuacaoUser(-1);
        certaResposta.style.color = 'red';
        operacao = geradorQuestao();
        btnCorrect();
        novoJogo();
        questao.innerHTML = `Qual o resultado dessa questão? ${operacao}`;
    }

    displayTempo = 5;

}

function btnCorrect() {
    for (const botao of respostas) {
        botao.innerHTML = "";
    }
    const botaoEscolhido = respostas[Math.floor(Math.random() * respostas.length)];
    botaoEscolhido.innerHTML = Number(eval(operacao));
}

function geradorQuestao() {
    const ope = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * (20 - 1) + 1);
    const num2 = Math.floor(Math.random() * (20 - 1) + 1);
    const opechoice = ope[Math.floor(Math.random() * ope.length)];
    console.log(num1, num2, opechoice);
    return `${num1} ${opechoice} ${num2}`;
}

function criaFalsaRespostas(resultadoOriginal) {
    const resultadoFalso = resultadoOriginal - Math.floor(Math.random() * (10 - 2) + 1);
    return resultadoFalso;
}

function inicializadorContagem(seg) {
    const segundos = seg * 1000;

    timerStart = setInterval(() => {
        timer.innerHTML = --displayTempo;

        if (displayTempo === 0) {
            certaResposta.innerHTML = `Anterior : Tempo esgotado -1 pontos, Correta anterior : ${eval(operacao)} `;
            pontuacaoUser(-1);
            certaResposta.style.color = 'red';
            displayTempo = 0;
            operacao = geradorQuestao();
            questao.innerHTML = `Qual o resultado dessa questão? ${operacao}`;
            btnCorrect();
            novoJogo();
        }
    }, segundos);

}

function pontuacaoUser(valor) {
    if (valor < 0) {
        console.log('passou negativo')
        --pontos;
    }
    if (valor > 0) {
        console.log('passou positivo')
        ++pontos;
    }
    if (pontos < 0) {
        pontos = 0;
        btnIniciar.style.visibility = 'visible';
        btnIniciar.innerHTML = '<button>iniciar novo jogo</button>';
        clearInterval(timerStart);
        operacao = geradorQuestao();
        btnCorrect();
        novoJogo();
        questao.innerHTML = `Qual o resultado dessa questão? ${operacao}`;
    }

    pontuacao.innerHTML = `pontuacao : ${pontos} pontos`;

}
