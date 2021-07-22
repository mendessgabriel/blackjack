import Carta from "../Carta/Carta";
import { naipes } from "../enum/enum";

class Baralho {
    cartas: Carta[] = [];

    setNaipe = (naipeRandom: number): string => {
        if (naipeRandom === naipes.zap) {
            return 'paus';
        }
        else if (naipeRandom === naipes.copas) {
            return 'copas';
        }
        else if (naipeRandom === naipes.espadilha) {
            return 'espadas';
        }
        else {
            return 'ouros';
        }
    }

    iniciaBaralho = () => {
        for (var i = 0; i < 4; i++) {
            let naipe: string = this.setNaipe(i);
            for (var l = 1; l < 14; l++) {
                let carta: Carta;

                if (l === 1) {
                    carta = new Carta('A', naipe, 1);
                } else if (l === 11) {
                    carta = new Carta('J', naipe, 10);
                } else if (l === 12) {
                    carta = new Carta('Q', naipe, 10);
                } else if (l === 13) {
                    carta = new Carta('k', naipe, 10);
                } else {
                    carta = new Carta(l.toString(), naipe, l);
                }

                this.cartas.push(carta);
            }
        }
    }

    removeCarta(carta: Carta) {
        this.cartas = this.cartas.filter(ca => ca != carta);
    }

    retornaCarta = (): Carta => {
        let anyBaralhoValue = Math.floor(Math.random() * this.cartas.length);
        let carta: Carta = this.cartas.splice(anyBaralhoValue - 1, 1)[0];

        return carta;
    }
}

export default Baralho;