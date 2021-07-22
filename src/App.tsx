import React, { useEffect } from 'react';
import './App.css';
import Baralho from './Baralho/Baralho';
import Jogador from './Jogador/Jogador';

function App() {
  const [baralho, setBaralho] = React.useState<Baralho>(new Baralho);
  const [jogadores, setJogadores] = React.useState<Jogador[]>([]);
  const [jogadorDaVez, setJogadorDaVez] = React.useState<number>(0);

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
    setTimeout(() => {
      alert(msg);
      iniciaBaralho();
      jogadores.forEach(jg => {
        jg.limpaCartas();
        jg.limpaPontuacao();
      })

      jogadorDaVez === 0 ? setVez(1) : setVez(0);
    }, 1000);

  }

  const jogar = async (jogador: number) => {
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
      <button style={{ background: jogador === 0 ? 'black' : 'red', color: jogador === 0 ? 'white' : 'black' }} onClick={() => jogar(jogador)}>jogar</button>
    );
  }

  const btnParar = (jogador: number): JSX.Element => {
    return (
      <button style={{ background: jogador === 0 ? 'black' : 'red', color: jogador === 0 ? 'white' : 'black' }} onClick={() => parar(jogador)}>parar</button>
    );
  }

  const mostrarCartasp1 = (): JSX.Element[] => {
    let el: JSX.Element[] = [];

    jogadores[0]?.cartas.map((carta, i) => {
      el.push(<div className="parent carta" key={i}>
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
      el.push(<div className="parent carta" key={i}>
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
      <div className="parent-btn">
        <div className="div1-btn" style={{ opacity: jogadorDaVez === 0 ? '1' : '0.4', pointerEvents: jogadorDaVez === 0 ? 'all' : 'none' }}>
          <div className="vezTexto" style={{ background: 'black', color: 'white' }}><label>Jogador 1</label></div>
          {btnJogar(0)}
          {btnParar(0)}
        </div>
        <div className="div3-btn" style={{ opacity: jogadorDaVez === 1 ? '1' : '0.4', pointerEvents: jogadorDaVez === 1 ? 'all' : 'none' }}>
          <div className="vezTexto" style={{ background: 'red' }}><label>Jogador 2</label></div>
          {btnJogar(1)}
          {btnParar(1)}
        </div>
      </div>

      <div className="container-cartas">
        {mostrarCartasp1()}
      </div>
      <div className="container-cartas">
        {mostrarCartasp2()}
      </div>

      <div className="pontuacao">
        <label>JOGADOR 1: <label style={{ color: "red", fontSize: 'large', padding: '1rem' }}>{jogadores[0]?.pontuacao}</label></label>
        <label>JOGADOR 2: <label style={{ color: "red", fontSize: 'large', padding: '1rem' }}>{jogadores[1]?.pontuacao}</label></label>
      </div>

      {/* <figure>
        <audio
          controls
          loop
          autoPlay
          src="https://r5---sn-bg07dn6k.googlevideo.com/videoplayback?expire=1627013687&ei=1-35YJiEL4jK1wKHjI-oBw&ip=5.178.34.250&id=o-AO_EGP1j3Y5DTz30Z_kAOZ7hppQn_YUwX23VU9RroSuD&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=sCkxh7P6suItK1WtlnGzICIG&gir=yes&clen=175776058&ratebypass=yes&dur=3866.377&lmt=1538856315965172&fexp=24001373,24007246&c=WEB&txp=5531432&n=GBn-l41DKOl1q1XxW44&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgNpWX0GFY2QBWrKkCfpXoJOKwrvyrvNCczODcScYAZqECIB8qOZEsUhK6KFdiFp_tQ0H0VX3-Nl4w4U3TMa2Bv8Jk&rm=sn-5hnel676&req_id=7e1577a2659ca3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-8p8v-bg0se6&cms_redirect=yes&mh=mb&mip=2804:431:cff2:60f0:9d1d:97fc:b965:d054&mm=29&mn=sn-bg07dn6k&ms=rdu&mt=1626991998&mv=m&mvi=5&pl=49&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPSBwZ5fEzxv5SRTKtNxfIPYqxarH2jcCoGmj03M_6e0AiArxzUHwTebOiz0oN6QKxxedc5B8wZ53qnMuDGwxipwXA%3D%3D">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure> */}


      {/* <div className="parent-placar">
        <div className="div1-placar">Pontuação jogador 1: <label style={{ color: "red", fontSize: 'xx-large' }}>{jogadores[0]?.pontuacao}</label></div>
        <div className="div2-placar">Pontuação jogador 2: <label style={{ color: "red", fontSize: 'xx-large' }}>{jogadores[1]?.pontuacao}</label></div>
        <div className="div3-placar">Vitórias: {jogadores[0]?.vitorias}</div>
        <div className="div4-placar">Vitórias: {jogadores[1]?.vitorias}</div>
      </div> */}

    </div>
  );
}

export default App;
