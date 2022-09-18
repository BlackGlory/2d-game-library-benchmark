import React, { useRef, useEffect, useCallback, MouseEventHandler } from 'react'
import screenfull from 'screenfull'
import { GameLoop } from 'extra-game-loop'

interface IGameProps {
  createGame: (canvas: HTMLCanvasElement) => GameLoop<number>
}

export function Game({ createGame }: IGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const game = createGame(canvasRef.current)
      game.start()
      return () => game.stop()
    }
  }, [createGame, canvasRef.current])

  const onClick: MouseEventHandler<HTMLCanvasElement> = useCallback(e => {
    if (e.detail % 2 === 0) {
      if (screenfull.isEnabled && canvasRef.current) {
        screenfull.toggle(canvasRef.current)
      }
    }
  }, [canvasRef.current])

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
    />
  )
}
