var i = 1
while (i < 10) {


    alert("Nesse programa vamos fazer alguns calculos com base nas informações que voce passar")


    var n1 = Number(prompt("Primeiro digite um numero"))
    var n2 = Number(prompt("Digite um outro numero"))

    alert("Agora voce pode escolher qual calculo deseja fazer")
    var escolha = Number(prompt("Digite [1] para soma [2] para subtração [3] divisão [4] multiplicacao"))
    switch (escolha) {
        case 1:
            alert("A soma é")
            alert(n1 + n2)
            break;

        case 2:
            alert("A Subtração é")
            alert(n1 - n2)
            break;
        case 3:
            alert("A Divisão é")
            alert(n1 / n2)
            break;
        case 4:
            alert("A Multiplicação é")
            alert(n1 * n2)
            break;
    }
    i++;
}