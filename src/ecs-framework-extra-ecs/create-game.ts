import { GameLoop } from 'extra-game-loop'
import { StructureOfArrays, double, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
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

  let boxes: number = 0

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
    for (const entityId of queryBox.findAllEntityIds()) {
      updatePreviousPosition(entityId)
      Position.arrays.x[entityId] += Velocity.arrays.x[entityId] * deltaTime
      Position.arrays.y[entityId] += Velocity.arrays.y[entityId] * deltaTime
    }
  }

  function updatePreviousPosition(entityId: number): void {
    const previousX = Position.arrays.x[entityId]
    const previousY = Position.arrays.y[entityId]
    PreviousPosition.upsert(entityId, {
      x: previousX
    , y: previousY
    })
  }

  function directorSystem(deltaTime: number): void {
    const oldEntities = boxes
    for (const entityId of queryBox.findAllEntityIds()) {
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        Position.arrays.x[entityId] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        Position.arrays.y[entityId] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        Position.arrays.y[entityId] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        Position.arrays.x[entityId] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      const x = Position.arrays.x[entityId]
      const y = Position.arrays.y[entityId]
      const width = Size.arrays.width[entityId]
      const height = Size.arrays.height[entityId]
      if (
        x > SCREEN_WIDTH_PIXELS ||
        y > SCREEN_HEIGHT_PIXELS ||
        (x + width) < 0 ||
        (y + height) < 0
      ) {
        removeBox(entityId)
      }
    }

    if (loop.getFramesOfSecond() >= MIN_GAME_FPS) {
      const removedEntities = oldEntities - boxes
      for (let i = removedEntities + 1; i--;) {
        addBox()
      }
    }
  }

  function renderingSystem(alpha: number): void {
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, SCREEN_WIDTH_PIXELS, SCREEN_HEIGHT_PIXELS)
    ctx.restore()

    ctx.save()
    for (const entityId of queryBox.findAllEntityIds()) {
      const color = Style.arrays.color[entityId]
      ctx.fillStyle = COLORS[color]
      const previousX = PreviousPosition.arrays.x[entityId]
      const previousY = PreviousPosition.arrays.y[entityId]
      const currentX = Position.arrays.x[entityId]
      const currentY = Position.arrays.y[entityId]
      const x = lerp(alpha, previousX, currentX)
      const y = lerp(alpha, previousY, currentY)
      const width = Size.arrays.width[entityId]
      const height = Size.arrays.height[entityId]
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
      const text = `Boxes: ${boxes}`
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

  function addBox(): void {
    const x = random(0, SCREEN_WIDTH_PIXELS)
    const y = random(0, SCREEN_HEIGHT_PIXELS)

    const entityId = world.createEntityId()
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
    , [PreviousPosition, { x, y }]
    )

    boxes++
  }

  function removeBox(entityId: number): void {
    world.removeEntityId(entityId)

    boxes--
  }
}
