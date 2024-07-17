import { GameLoop } from 'extra-game-loop'
import {
  createWorld
, defineComponent
, defineQuery
, addEntity
, addComponent
, removeEntity
, Types
} from 'bitecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { random, randomInt, randomIntInclusive } from 'extra-rand'
import { truncateArrayRight } from '@blackglory/structures'
import { pass } from '@blackglory/prelude'
import { COLORS } from './colors'
import { lerp } from '@utils/lerp'

const MIN_GAME_FPS = 60
const PHYSICS_FPS = 50
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsRecords: number[] = []
  const keyStateObserver = new KeyStateObserver(canvas)

  canvas.width = SCREEN_WIDTH_PIXELS
  canvas.height = SCREEN_HEIGHT_PIXELS
  const ctx = canvas.getContext('2d')!

  const world = createWorld()

  const PreviousPosition = defineComponent({
    x: Types.f64
  , y: Types.f64
  })
  const Position = defineComponent({
    x: Types.f64
  , y: Types.f64
  })
  const Style = defineComponent({
    color: Types.ui8
  })
  const Size = defineComponent({
    width: Types.ui8
  , height: Types.ui8
  })
  const Velocity = defineComponent({
    x: Types.f64
  , y: Types.f64
  })

  const queryObject = defineQuery([Position, Velocity, Size, Style])

  let objects: number = 0

  const loop = new GameLoop({
    fixedDeltaTime: 1000 / PHYSICS_FPS
  , maximumDeltaTime: 1000 / (PHYSICS_FPS / 2)
  , update(deltaTime: number): void {
      directorSystem(deltaTime)
    }
  , fixedUpdate(deltaTime: number): void {
      physicsSystem(deltaTime)
    }
  , lateUpdate(deltaTime: number): void {
      pass()
    }
  , render(alpha: number) {
      renderingSystem(alpha)
    }
  })

  return loop

  function physicsSystem(deltaTime: number): void {
    for (const entityId of queryObject(world)) {
      updatePreviousPosition(entityId)
      Position.x[entityId] += Velocity.x[entityId] * deltaTime
      Position.y[entityId] += Velocity.y[entityId] * deltaTime
    }
  }

  function updatePreviousPosition(entityId: number): void {
    const previousX = Position.x[entityId]
    const previousY = Position.y[entityId]
    PreviousPosition.x[entityId] = previousX
    PreviousPosition.y[entityId] = previousY
  }

  function directorSystem(deltaTime: number): void {
    const oldObjects = objects
    for (const entityId of queryObject(world)) {
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        Position.x[entityId] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        Position.y[entityId] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        Position.y[entityId] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        Position.x[entityId] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      const x = Position.x[entityId]
      const y = Position.y[entityId]
      const width = Size.width[entityId]
      const height = Size.height[entityId]
      if (
        x > SCREEN_WIDTH_PIXELS ||
        y > SCREEN_HEIGHT_PIXELS ||
        (x + width) < 0 ||
        (y + height) < 0
      ) {
        removeObject(entityId)
      }
    }

    const currentFPS = loop.getFramesOfSecond()
    if (currentFPS >= MIN_GAME_FPS) {
      const removedObjects = oldObjects - objects
      const newObjects = Math.max(
        Math.ceil(removedObjects + (currentFPS - MIN_GAME_FPS))
      , 10
      )
      for (let i = newObjects; i--;) {
        addObject()
      }
    }
  }

  function renderingSystem(alpha: number): void {
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, SCREEN_WIDTH_PIXELS, SCREEN_HEIGHT_PIXELS)
    ctx.restore()

    ctx.save()
    for (const entityId of queryObject(world)) {
      const color = Style.color[entityId]
      ctx.fillStyle = COLORS[color]
      const previousX = PreviousPosition.x[entityId]
      const previousY = PreviousPosition.y[entityId]
      const currentX = Position.x[entityId]
      const currentY = Position.y[entityId]
      const x = lerp(alpha, previousX, currentX)
      const y = lerp(alpha, previousY, currentY)
      const width = Size.width[entityId]
      const height = Size.height[entityId]
      ctx.fillRect(x, y, width, height)
    }
    ctx.restore()

    {
      fpsRecords.push(loop.getFramesOfSecond())
      truncateArrayRight(fpsRecords, PHYSICS_FPS)
      const fps = Math.floor(fpsRecords.reduce((acc, cur) => acc + cur) / fpsRecords.length)
      const text = `FPS: ${fps}`
      ctx.save()
      ctx.font = '48px sans'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      const width = ctx.measureText(text).width
      ctx.fillRect(0, 0, width, 48)
      ctx.fillStyle = 'white'
      ctx.fillText(text, 0, 0)
      ctx.restore()
    }

    {
      const text = `Objects: ${objects}`
      ctx.save()
      ctx.font = '48px sans'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      const width = ctx.measureText(text).width
      const x = SCREEN_WIDTH_PIXELS - width
      ctx.fillRect(x, 0, width, 48)
      ctx.fillStyle = 'white'
      ctx.fillText(text, x, 0)
      ctx.restore()
    }
  }

  function addObject(): void {
    const x = random(0, SCREEN_WIDTH_PIXELS)
    const y = random(0, SCREEN_HEIGHT_PIXELS)

    const entityId = addEntity(world)

    addComponent(world, Position, entityId)
    Position.x[entityId] = x
    Position.y[entityId] = y
    
    addComponent(world, Velocity, entityId)
    Velocity.x[entityId] = random(-0.01, 0.01)
    Velocity.y[entityId] = random(-0.01, 0.01)

    addComponent(world, Size, entityId)
    Size.width[entityId] = randomIntInclusive(1, 100)
    Size.height[entityId] = randomIntInclusive(1, 100)

    addComponent(world, Style, entityId)
    Style.color[entityId] = randomInt(0, COLORS.length)

    addComponent(world, PreviousPosition, entityId)
    PreviousPosition.x[entityId] = x
    PreviousPosition.y[entityId] = y

    objects++
  }

  function removeObject(entityId: number): void {
    removeEntity(world, entityId)

    objects--
  }
}
