import { GameLoop } from 'extra-game-loop'
import { StructureOfArrays, double, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { random, randomInt, randomIntInclusive } from 'extra-rand'
import { truncateArrayRight } from '@blackglory/structures'
import { COLORS } from './colors'

const GAME_FPS = 60
const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT= 1080

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsRecords: number[] = []
  const keyStateObserver = new KeyStateObserver(document.documentElement)

  canvas.width = SCREEN_WIDTH
  canvas.height = SCREEN_HEIGHT
  const ctx = canvas.getContext('2d')!

  const world = new World()

  const PreviousPosition = new StructureOfArrays({
    x: double
  , y: double
  })
  const Position = new StructureOfArrays({
    x: double
  , y: double
  })
  const Style = new StructureOfArrays({
    color: uint8
  })
  const Size = new StructureOfArrays({
    width: uint8
  , height: uint8
  })
  const Velocity = new StructureOfArrays({
    x: double
  , y: double
  })

  const queryBox = new Query(world, allOf(Position, Velocity, Size, Style))

  let entities: number = 0

  const loop = new GameLoop({
    fixedDeltaTime: 1000 / GAME_FPS
  , maximumDeltaTime: 1000 / (GAME_FPS / 2)
  , fixedUpdate(deltaTime: number): void {
      movementSystem(deltaTime)
    }
  , update(deltaTime: number): void {
      directorSystem(deltaTime)
    }
  , render(alpha: number) {
      renderingSystem(alpha)
    }
  })

  return loop

  function movementSystem(deltaTime: number): void {
    for (const entityId of queryBox.findAllEntityIds()) {
      savePreviousPosition(entityId)
      Position.arrays.x[entityId] += Velocity.arrays.x[entityId] * deltaTime
      Position.arrays.y[entityId] += Velocity.arrays.y[entityId] * deltaTime
    }
  }

  function savePreviousPosition(entityId: number): void {
    PreviousPosition.arrays.x[entityId] = Position.arrays.x[entityId]
    PreviousPosition.arrays.y[entityId] = Position.arrays.y[entityId]
  }

  function directorSystem(deltaTime: number): void {
    const oldEntities = entities
    for (const entityId of queryBox.findAllEntityIds()) {
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        Position.arrays.x[entityId] -= 1 * deltaTime
        savePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        Position.arrays.y[entityId] -= 1 * deltaTime
        savePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        Position.arrays.y[entityId] += 1 * deltaTime
        savePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        Position.arrays.x[entityId] += 1 * deltaTime
        savePreviousPosition(entityId)
      }
      const x = Position.arrays.x[entityId]
      const y = Position.arrays.y[entityId]
      const width = Size.arrays.width[entityId]
      const height = Size.arrays.height[entityId]
      if (
        x > SCREEN_WIDTH ||
        y > SCREEN_HEIGHT ||
        (x + width) < 0 ||
        (y + height) < 0
      ) {
        removeBox(entityId)
      }
    }

    if (loop.getFramesOfSecond() >= GAME_FPS) {
      const removedEntities = oldEntities - entities 
      for (let i = removedEntities + 1; i--;) {
        addBox()
      }
    }
  }

  function renderingSystem(alpha: number): void {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    ctx.save()
    for (const entityId of queryBox.findAllEntityIds()) {
      const color = Style.arrays.color[entityId]
      ctx.fillStyle = COLORS[color]
      const x = lerp(alpha, PreviousPosition.arrays.x[entityId], Position.arrays.x[entityId])
      const y = lerp(alpha, PreviousPosition.arrays.y[entityId], Position.arrays.y[entityId])
      // const x = Position.arrays.x[entityId]
      // const y = Position.arrays.y[entityId]
      const width = Size.arrays.width[entityId]
      const height = Size.arrays.height[entityId]
      ctx.fillRect(x, y, width, height)
    }
    ctx.restore()

    {
      fpsRecords.push(loop.getFramesOfSecond())
      truncateArrayRight(fpsRecords, GAME_FPS)
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
      const text = `Entities: ${entities}`
      ctx.save()
      ctx.font = '48px sans'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      const width = ctx.measureText(text).width
      const x = SCREEN_WIDTH - width
      ctx.fillRect(x, 0, width, 48)
      ctx.fillStyle = 'white'
      ctx.fillText(text, x, 0)
      ctx.restore()
    }
  }

  function addBox(): void {
    const entityId = world.createEntityId()
    const x = random(0, SCREEN_WIDTH)
    const y = random(0, SCREEN_HEIGHT)
    world.addComponents(
      entityId
    , [Position, { x, y }]
    , [Velocity, {
        x: random(-0.01, 0.01)
      , y: random(-0.01, 0.01)
      }]
    , [Size, {
        width: randomIntInclusive(1, 100)
      , height: randomIntInclusive(1, 100)
      }]
    , [Style, {
        color: randomInt(0, COLORS.length)
      }]
    )
    PreviousPosition.upsert(entityId, { x, y })
    entities++
  }

  function removeBox(entityId: number): void {
    world.removeEntityId(entityId)
    entities--
  }
}

function lerp(alpha: number, previousValue: number, currentValue: number): number {
  return previousValue + (currentValue - previousValue) * alpha
}
