import Carta from "../Carta/Carta";

import { getBaralhoBlackjack } from '../Services/BaralhoService';

class Baralho {
    cartas: Carta[] = [];

    iniciaBaralho = async () => {
        getBaralhoBlackjack().then(dt => {
            dt.length > 0 ? this.cartas = dt : this.cartas = [];
            console.log('Baralho: ', dt);
        });
    }

    removeCarta(carta: Carta) {
        this.cartas = this.cartas.filter(ca => ca !== carta);
    }

    retornaCarta = (): Carta => {
        let anyBaralhoValue = Math.floor(Math.random() * this.cartas.length);
        let carta: Carta = this.cartas.splice(anyBaralhoValue - 1, 1)[0];

        return carta;
    }
}

export default Baralho;