import Carta from "../Carta/Carta";
import Baralho from "../Baralho/Baralho";

class Jogador {
    nome: string;
    cartas: Carta[];
    pontuacao: number;
    vitorias: number;

    constructor(Nome: string){
        this.nome = Nome;
        this.cartas = [];
        this.pontuacao = 0;
        this.vitorias = 0;
    }

    pedeCarta = (baralho: Baralho) => {
        let cartaPedida: Carta = baralho.retornaCarta();
        this.cartas.push(cartaPedida);
        this.pontuacao += cartaPedida.valorCarta;
    }

    limpaCartas = () => {
        this.cartas = [];
    }

    limpaPontuacao = () => {
        this.pontuacao = 0;
    }
}

export default Jogador;