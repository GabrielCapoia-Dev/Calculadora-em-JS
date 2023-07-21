//Variaveis que puxam os valores das Div do HTML
const texto_operacao_anterior = document.querySelector("#operacao-anterior");
const texto_operacao_atual = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#botoes button");


//Objeto Calculadora
class Calculadora {
    //As propriedades do objeto
    constructor(texto_operacao_anterior, texto_operacao_atual) {
        this.texto_operacao_anterior = texto_operacao_anterior;
        this.texto_operacao_atual = texto_operacao_atual;
        this.operacao_atual = "";
    }

    //Parametro que permite o ponto ser digitado uma unica vez
    addDigit(digit) {
        console.log(digit);
        if (digit === "." && this.texto_operacao_atual.innerText.includes(".")) {
            return;
        }
        this.operacao_atual = digit;
        this.updateScreen();
    }

    //Parametro das operacoes
    processoOperacional(operacao) {
        //Consição que permite o usuario mudar de operação sem gerar erro ou fazer calculo entre as operacoes, permitindo tambem o usuario limpar o codigo
        if (this.texto_operacao_atual.innerText === "" && operacao !== "C") {
            if (this.texto_operacao_anterior.innerText !== "") {
                this.mudarOperacao(operacao);//Parametro que diz quando mudar de operacao
            }
            return;
        }

        let valor_Operacao;
        const valor_anteiror = +this.texto_operacao_anterior.innerText.split(" ")[0];
        const valor_atual = +this.texto_operacao_atual.innerText;

        //Condiconal para cada operacao que usuario inserir
        switch (operacao) {
            case "+":
                valor_Operacao = valor_anteiror + valor_atual;
                this.updateScreen(valor_Operacao, operacao, valor_atual, valor_anteiror);
                break;
            case "-":
                valor_Operacao = valor_anteiror - valor_atual;
                this.updateScreen(valor_Operacao, operacao, valor_atual, valor_anteiror);
                break;
            case "/":
                valor_Operacao = valor_anteiror / valor_atual;
                this.updateScreen(valor_Operacao, operacao, valor_atual, valor_anteiror);
                break;
            case "*":
                valor_Operacao = valor_anteiror * valor_atual;
                this.updateScreen(valor_Operacao, operacao, valor_atual, valor_anteiror);
                break;
            case "DEL":
                this.Operacao_Delete();
                break;
            case "CE":
                this.Operacao_Limpar_Atual();
                break;
            case "C":
                this.Operacao_Limpar_Tudo();
                break;
            case "=":
                this.Operacao_Igual();
                break;
            default:
                return;
        }
    }


    //Atualiza a tela com as novas informações sempre que o usuario fizer uma acao
    updateScreen(
        valor_Operacao = null,
        operacao = null,
        valor_atual = null,
        valor_anteiror = null
    ) {
        //Consição que faz a troca da operacao atual pra operacao anterior, liberando espaco pra nova opercao
        if (valor_Operacao === null) {
            this.texto_operacao_atual.innerText += this.operacao_atual;
        } else {
            if (valor_anteiror === 0) {
                valor_Operacao = valor_atual;
            }

            this.texto_operacao_anterior.innerText = `${valor_Operacao} ${operacao}`;
            this.texto_operacao_atual.innerText = "";
        }
    }

    //Parametro que diz quando mudar de operacao
    mudarOperacao(operacao) {
        const operacoesMatematicas = ["*", "/", "+", "-"];

        if (operacoesMatematicas.includes(operacao)) {
            return;
        }
        this.texto_operacao_anterior.innerText = this.texto_operacao_anterior.innerText.slice(0, -1) + operacao;// Concatenação que junta os numeros da operacao com o operador na parte de cima

    }
    //Deleta o ultimo numero digitado
    Operacao_Delete() {
        this.texto_operacao_atual.innerText = this.texto_operacao_atual.innerText.slice(0, -1);
    }
    //Limpa a sequencia de muneros da operacao atual
    Operacao_Limpar_Atual() {
        this.texto_operacao_atual.innerText = "";
    }
    //Limpa toda a calculadora
    Operacao_Limpar_Tudo() {
        this.texto_operacao_anterior.innerText = "";
        this.texto_operacao_atual.innerText = "";
    }
    //Botao de igual exibe o resultado igual, transformando o resultado da operacao aterior na opercao atual
    Operacao_Igual(){
        const operacao = texto_operacao_anterior.innerText.split(" ")[1];

        this.processoOperacional(operacao);
        texto_operacao_anterior.innerText = this.texto_operacao_anterior.innerText.slice(0, -1);
        texto_operacao_atual.innerText = texto_operacao_anterior.innerText; 
        texto_operacao_anterior.innerText = "";
        
    }

}
//Passa a um constante o valor obejto calculadora com seus parametros
const calc = new Calculadora(texto_operacao_anterior, texto_operacao_atual);


//Reconhece quando o usuario clica em um operador ou um numero
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processoOperacional(value);
        }
    });
});