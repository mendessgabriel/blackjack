export const getBaralhoBlackjack = async () => {
    try {
        const response = await fetch('http://localhost:3001/blackjack')

        if (!response.ok) {
            return new Error('falhou a requisição')
        }

        if (response.status === 404) {
            return new Error('não encontrou qualquer resultado')
        }

        const cards = await response.json();

        return cards['response'] ? cards['response'] : null;
    }
    catch (error: any) {
        throw new Error('Algo deu errado');
    }
}