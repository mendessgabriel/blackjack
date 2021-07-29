import React, { useEffect } from 'react';
import './App.css';
import Baralho from './Baralho/Baralho';
import Jogador from './Jogador/Jogador';

function App() {
  const [baralho, setBaralho] = React.useState<Baralho>(new Baralho);
  const [jogadores, setJogadores] = React.useState<Jogador[]>([]);
  const [jogadorDaVez, setJogadorDaVez] = React.useState<number>(0);
  const [sistemMsg, setSistemMsg] = React.useState<string>('');

  const iniciaJogadores = () => {
    let jogadoresQueIniciaJogo: Jogador[] = [];

    for (var i = 0; i < 2; i++) {
      let jogador = new Jogador('Jogador ' + (i + 1).toString());
      jogadoresQueIniciaJogo.push(jogador);
    }

    setJogadores(jogadoresQueIniciaJogo);
    console.log('Jogadores: ', jogadoresQueIniciaJogo);
  }

  const iniciaBaralho = () => {
    let baralhoQueIniciaJogo = new Baralho();
    baralhoQueIniciaJogo.iniciaBaralho();

    setBaralho(baralhoQueIniciaJogo);
    console.log('Baralho: ', baralhoQueIniciaJogo.cartas);
  }

  const reiniciaJogo = (msg: string) => {
    setJogadorDaVez(-1);
    setSistemMsg(msg);
    sistemMessage(msg);
    
    setTimeout(() => {
      // alert(msg);
      iniciaBaralho();
      jogadores.forEach(jg => {
        jg.limpaCartas();
        jg.limpaPontuacao();
      })

      jogadorDaVez === 0 ? setVez(1) : setVez(0);
    }, 1000);

  }

  const jogar = async (jogador: number) => {
    if(sistemMsg.length > 0) setSistemMsg('');
    
    jogadores[jogador].pedeCarta(baralho);
    setJogadores([...jogadores]);

    if (jogadores[jogador].pontuacao === 21) {
      jogadores[jogador].vitorias += 1;
      reiniciaJogo('21!! VOCÊ VENCEU!!');

    } else if (jogadores[jogador].pontuacao > 21) {
      if (jogadorDaVez === 0) jogadores[1].vitorias += 1;
      else jogadores[0].vitorias += 1;

      reiniciaJogo("Limite de 21 foi passado, você perdeu! sua pontuação final: " + jogadores[jogador].pontuacao.toString());
    }

    if (jogadores[jogador].cartas.length === 5 || jogadores[jogador].pontuacao === 17) {
      parar(jogador);
    }
  }

  const setVez = (n: number) => {
    setJogadorDaVez(n);
  }

  const parar = (jogador: number) => {
    if (jogadores[jogador].pontuacao === 0) {
      alert('Jogue antes de passar a vez');
      return;
    };

    if (jogador === 0) {
      if (jogadores[1].pontuacao === 0) {
        setJogadorDaVez(1);
        return;
      }
    } else {
      if (jogadores[0].pontuacao === 0) {
        setJogadorDaVez(0);
        return;
      }
    }

    let msg: string = '';

    if (jogadores[0]?.pontuacao === jogadores[1]?.pontuacao) {
      reiniciaJogo('EMPATE! A CASA VENCEU!!');
      return;

    } else if (jogadores[0]?.pontuacao > jogadores[1]?.pontuacao) {
      msg = 'JOGADOR 1 VENCEU!! Jogador 1: ' + jogadores[0]?.pontuacao.toString() + ". Jogador 2: " + jogadores[1]?.pontuacao.toString() + ".";
      jogadores[0].vitorias += 1;

    } else {
      msg = 'JOGADOR 2 VENCEU!! Jogador 2: ' + jogadores[1]?.pontuacao.toString() + ". Jogador 1: " + jogadores[0]?.pontuacao.toString() + ".";
      jogadores[1].vitorias += 1;

    }

    reiniciaJogo(msg);
  }

  const btnJogar = (jogador: number): JSX.Element => {
    return (
      <button onClick={() => jogar(jogador)}>Jogar!</button>
    );
  }

  const btnParar = (jogador: number): JSX.Element => {
    return (
      <button onClick={() => parar(jogador)}>Parar!</button>
    );
  }

  const limpaSistemMsg = () => {
    setSistemMsg('');
  }

  const sistemMessage = (message?: string): JSX.Element => {
    let element: JSX.Element = (<div></div>);

    if (!message) return element;

    return (
      <div className="alert" onClick={limpaSistemMsg}>
        <span className="closebtn">&times;</span>
        {message}
      </div>
    )
  }

  const mostrarCartasp1 = (): JSX.Element[] => {
    let el: JSX.Element[] = [];

    jogadores[0]?.cartas.map((carta, i) => {
      el.push(<div className="parent carta " key={i}>
        <div className="div1" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.numero}</b></div>
        <div className="div2" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</b></div>
        <div className="div3" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.numero}</b> </div>
      </div >)

    })

    return el;
  }

  const mostrarCartasp2 = (): JSX.Element[] => {
    let el: JSX.Element[] = [];

    jogadores[1]?.cartas.map((carta, i) => {
      el.push(<div className="parent carta " key={i}>
        <div className="div1" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.numero}</b></div>
        <div className="div2" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</b></div>
        <div className="div3" style={{ color: carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red' }}><b>{carta.numero}</b> </div>
      </div >)
    })

    return el;
  }

  useEffect(() => {
    iniciaBaralho();
    iniciaJogadores();
  }, []);

  return (
    <div className="App">
      <div className="divjogo">
        <div className="player">
          <div className="playerdiv" style={{ opacity: jogadorDaVez === 0 ? '1' : '0.4', pointerEvents: jogadorDaVez === 0 ? 'all' : 'none' }}>
            <div className="placar">
              <div className="container-placar">
                <div className="placar-nome">
                  <span style={{ width: '90%' }}>Jogador 1</span>
                  <div className="placar-vitorias greenp1">
                    <span>{jogadores[0]?.vitorias}</span>
                  </div>
                </div>

              </div>
              <div className="divbotoes">
                {btnJogar(0)}
                {btnParar(0)}
              </div>
            </div>
            <div className="divcartas">
              {mostrarCartasp1()}
            </div>
            <div className="divpontuacao">
              <label>
                {jogadores[0]?.pontuacao}
              </label>
            </div>
          </div>
        </div>
        <div className="player">
          <div className="playerdiv" style={{ opacity: jogadorDaVez === 1 ? '1' : '0.4', pointerEvents: jogadorDaVez === 1 ? 'all' : 'none' }}>
            <div className="placar">
              <div className="container-placar">
                <div className="placar-nome">
                  <span style={{ width: '90%' }}>Jogador 2</span>
                  <div className="placar-vitorias greenp2">
                    <span>{jogadores[1]?.vitorias}</span>
                  </div>
                </div>
              </div>
              <div className="divbotoes">
                {btnJogar(1)}
                {btnParar(1)}
              </div>
            </div>
            <div className="divcartas">
              {mostrarCartasp2()}
            </div>
            <div className="divpontuacao greenp2">
              <label>
                {jogadores[1]?.pontuacao}
              </label>
            </div>
          </div>
        </div>
        {sistemMsg.length > 0 && sistemMessage(sistemMsg)}
      </div>
      <div className="divtexto">

      </div>
    </div>
  );
}

export default App;
