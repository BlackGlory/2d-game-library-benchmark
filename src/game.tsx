import { useRef, useEffect, useCallback, MouseEventHandler, useState } from 'react'
import screenfull from 'screenfull'
import { GameLoop } from 'extra-game-loop'
import { Awaitable } from '@blackglory/prelude'
import { useEffectAsync } from 'extra-react-hooks'

interface IGameProps {
  createGame: (canvas: HTMLCanvasElement) => Awaitable<GameLoop<number>>
}

export function Game({ createGame }: IGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameLoop, setGameLoop] = useState<GameLoop<number>>()

  useEffectAsync(async () => {
    const canvas = canvasRef.current
    if (canvas) {
      setGameLoop(await createGame(canvasRef.current))
    }
  }, [createGame])

  useEffect(() => {
    if (gameLoop) {
      gameLoop.start()
      return () => gameLoop.stop()
    }
  }, [gameLoop])

  const onClick: MouseEventHandler<HTMLCanvasElement> = useCallback(e => {
    if (e.detail % 2 === 0) {
      const canvas = canvasRef.current
      if (screenfull.isEnabled && canvas) {
        screenfull.toggle(canvas)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0} // 允许canvas获得焦点, 从而能够收到键盘事件
      onClick={onClick}
    />
  )
}
