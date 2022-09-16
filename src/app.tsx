import React, { useRef, useEffect, useCallback } from 'react'
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

  const onDoubleClick = useCallback(() => {
    if (screenfull.isEnabled && canvasRef.current) {
      screenfull.toggle(canvasRef.current)
    }
  }, [canvasRef.current])

  return (
    <div className='bg-black'>
      <canvas
        onDoubleClick={onDoubleClick}
        className='mx-auto'
        ref={canvasRef}
      />
    </div>
  )
}
