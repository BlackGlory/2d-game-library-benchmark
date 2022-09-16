import React, { useRef, useEffect, useCallback, MouseEventHandler } from 'react'
import { createGame } from './game'
import screenfull from 'screenfull'

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const game = createGame(canvasRef.current)
      game.start()
      return () => game.stop()
    }
  }, [canvasRef.current])

  const onClick: MouseEventHandler<HTMLCanvasElement> = useCallback(e => {
    if (e.detail % 2 === 0) {
      console.count('double click')
      if (screenfull.isEnabled && canvasRef.current) {
        screenfull.toggle(canvasRef.current)
      }
    }
  }, [canvasRef.current])

  return (
    <div className=''>
      <canvas
        onClick={onClick}
        className='mx-auto'
        ref={canvasRef}
      />
    </div>
  )
}
