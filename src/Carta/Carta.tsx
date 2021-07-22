class Carta {
    numero: string;
    naipe: string;
    valorCarta: number;

    constructor(Numero: string, Naipe: string, ValorCarta: number){
        this.numero = Numero;
        this.naipe = Naipe;
        this.valorCarta = ValorCarta;
    }
}

export default Carta;