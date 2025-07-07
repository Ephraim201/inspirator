import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import frases from './data/frases'
import autores from './data/autores'
import './App.css'
import { motion } from 'framer-motion'

function generarContenidoAleatorio() {
  const frase = frases[Math.floor(Math.random() * frases.length)]
  const autor = autores[Math.floor(Math.random() * autores.length)]

  return {
    texto: frase.texto,
    nombre: autor.nombre,
    imagen: autor.imagen
  }
}

function App() {

  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)

  const [contenido, setContenido] = useState(() => generarContenidoAleatorio())

  const clickAudioRef = useRef(null)

  useEffect(() => {
    clickAudioRef.current = new Audio('/inspirator/sounds/fino.mp3')
  }, [])

  const handleNuevaFrase = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0
      clickAudioRef.current.play()
    }

    setContenido(generarContenidoAleatorio())
  }

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="app">
      <div className="bg" ref={vantaRef}></div>

      <img
        src="/inspirator/logo2.png"
        alt="Logo"
        className="logo"
      />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <motion.h1
          key={contenido.texto}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Edu NSW ACT Cursive', cursive", fontSize: '2rem', marginBottom: '10px' }}
        >
          “{contenido.texto}”
        </motion.h1>

        <motion.h1
          key={contenido.nombre}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontSize: '1.2rem', color: '#ddd', marginBottom: '20px' }}
        >
          — {contenido.nombre}
        </motion.h1>

        <motion.img
          key={contenido.imagen}
          src={contenido.imagen}
          alt={contenido.nombre}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(0,0,0,0.5)',
            marginBottom: '30px'
          }}
        />

        {/* Botón */}
        <button
          className="boton-frase"
          onClick={handleNuevaFrase}
        >
          Siguiente frase inspiradora 😍
        </button>
      </div>
    </div>
  )
}

export default App
