import React, { useRef, useEffect } from 'react'
import { createGame } from './game'

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const game = createGame(canvasRef.current)
      game.start()
      return () => game.stop()
    }
  }, [canvasRef.current])

  return (
    <div className='bg-black'>
      <canvas
        className='mx-auto'
        ref={canvasRef}
      />
    </div>
  )
}
