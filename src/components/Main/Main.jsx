import { useEffect, useState } from "react";
import "./Main.css";
import { words } from "../../Data/words";

const Main = () => {
  const [palabraJugar, setPalabraJugar] = useState("");
  const [letrasJugadas, setLetrasJugadas] = useState([]);
  const [letraInput, setLetraInput] = useState("");
  const [intentos, setIntentos] = useState(5);
  const [letrasJugadaError, setLetrasJugadasError] = useState([]);
  const [mensaje, setMensaje] = useState("Vamos a jugar, elige una letra");
  const [newGame, setNewGame] = useState(false);
  const [definicion, setDefinicion] = useState("");
  const [help,setHelp]=useState(false)

  useEffect(() => {
    const numRandom = Math.floor(Math.random() * words.length);

    const palabraElejida =  words[numRandom].palabra.toLowerCase();
    const pista = words[numRandom].definicion;
    // setDefinicion(definicion);
    setPalabraJugar(palabraElejida);
    setDefinicion(pista)
  }, [newGame]);
  const reset = () => {
    setIntentos(6),
      setNewGame(true),
      setLetrasJugadas([]),
      setLetrasJugadasError([]),
      setMensaje("vamos a jugar, elige una letra");
      setHelp(false)
  };

  const jugarLetra = () => {
    if (
      (letraInput && letrasJugadas.includes(letraInput)) ||
      letrasJugadaError.includes(letraInput)
    ) {
      console.log("ya has jugado esa letra");
      setMensaje("esta letra ya la has usado, elige otra letra");
    } else if (
      letraInput &&
      !letrasJugadas.includes(letraInput) &&
      palabraJugar.split("").includes(letraInput)
    ) {
      // letra Valida
      setMensaje("muy bien...");
      console.log("letra valida");
      const nuevasLetrasAdivinadas = [...letrasJugadas, letraInput];
      setLetrasJugadas(nuevasLetrasAdivinadas);
    } else {
      setMensaje("ohh mala suerte, elige una letra");
      console.log("letra incorrecta");
      setIntentos(intentos - 1);
      setLetrasJugadasError([...letrasJugadaError, letraInput]);
      console.log("letra no valida");
      // console.log(intentos)
    }

    setLetraInput("");
  };
  const handlePista=()=>{
setHelp(true)
    
  }
  

  const palabraMostrada = palabraJugar
    .split("")
    .map((letra) => (letrasJugadas.includes(letra) ? letra : "_,"));

  return (
    <main>
      {intentos <= 0 ? (
        <div className="fg-general-container">
          <section className="fg-window-game">
            <h2>game over</h2>
            <h3>la palabra secreta era...</h3>
            <h1>{palabraJugar}</h1>
            <p>{definicion}</p>
            <div className="fg-icono"><img src="/src/img/state_5.png" alt="icono final" />
              </div>
            
          </section>
        
          <section className="fg-new-game">
            <button onClick={reset}>Volver a jugar</button>
          </section>
        </div>
      ) : (
        <div className="fg-general-container">
          <section className="fg-window-game">
            <h3>{mensaje}</h3>
            <h1>{palabraMostrada}</h1>
            {help==true? <p>{definicion}</p>:<p></p>}
           
            {intentos == 5 ? (
              <div className="fg-icono">
              </div>
            ) : intentos == 4 ? (
              <div className="fg-icono">
                <img src="/src/img/state_0.png" alt="icono1" />
              </div>
            ) : intentos == 3 ? (
              <div className="fg-icono">
                <img src="/src/img/state_2.png" alt="icono1" />
              </div>
            ) : intentos == 2 ? (
              <div className="fg-icono">
                <img src="/src/img/state_3.png" alt="icono1" />
              </div>
            ) : intentos == 1 ? (
              <div className="fg-icono">
                <img src="/src/img/state_4.png" alt="icono1" />
              </div>
            ) : intentos == 1 ? (
              <div className="fg-icono">
                <img src="/src/img/state_5.png" alt="icono1" />
              </div>
            ) : (
              <div></div>
            )}
          </section>

          <section className="fg-input-container">
            <div className="fg-time">
              <p>te quedan</p>
              <h2>{intentos}</h2>
              <button onClick={handlePista}>pista</button>
            </div>
            <div className="fg-controler">
              <input
                type="text"
                value={letraInput}
                onChange={(ev) => setLetraInput(ev.target.value)}
                maxLength={1}
              />
              <button onClick={jugarLetra}>jugar</button>
            </div>
            <div className="fg-letters">
              {letrasJugadaError.map((letra, index) => (
                <p className="fg-letter" key={index}>
                  {letra}
                </p>
              ))}
              {/* <button onClick={handlePista}>pista</button> */}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Main;
