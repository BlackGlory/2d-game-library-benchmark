import { GameLoop } from 'extra-game-loop'
import { StructureOfArrays, double, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { random, randomInt, randomIntInclusive } from 'extra-rand'
import { truncateArrayRight } from '@blackglory/structures'

const GAME_FPS = 60
const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT= 1080

const COLORS = [
  '#505050'
, '#002090'
, '#1000c0'
, '#3000c0'
, '#600080'
, '#700030'
, '#700000'
, '#501000'
, '#203000'
, '#104000'
, '#005000'
, '#004010'
, '#003040'
, '#000000'
, '#a0a0a0'
, '#0050ff'
, '#3030ff'
, '#7010ff'
, '#b000f0'
, '#d00070'
, '#c02010'
, '#a04000'
, '#606000'
, '#208000'
, '#009000'
, '#009020'
, '#007090'
, '#ffffff'
, '#40a0ff'
, '#8080ff'
, '#c050ff'
, '#ff40ff'
, '#ff50d0'
, '#ff6050'
, '#ff9000'
, '#b0c000'
, '#70e000'
, '#30f000'
, '#20f060'
, '#20d0f0'
, '#404040'
, '#b0e0ff'
, '#c0c0ff'
, '#e0b0ff'
, '#ffb0ff'
, '#ffb0f0'
, '#ffc0b0'
, '#ffd080'
, '#e0e070'
, '#c0f070'
, '#a0ff90'
, '#90f0c0'
, '#a0f0f0'
, '#b0b0b0'
]

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsRecords: number[] = []
  const keyStateObserver = new KeyStateObserver(document.documentElement)

  canvas.width = SCREEN_WIDTH
  canvas.height = SCREEN_HEIGHT
  const ctx = canvas.getContext('2d')!

  const world = new World()

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
  , render() {
      renderingSystem()
    }
  })

  return loop

  function movementSystem(deltaTime: number): void {
    for (const entityId of queryBox.findAllEntityIds()) {
      Position.arrays.x[entityId] += Velocity.arrays.x[entityId] * deltaTime
      Position.arrays.y[entityId] += Velocity.arrays.y[entityId] * deltaTime
    }
  }

  function directorSystem(deltaTime: number): void {
    const oldEntities = entities
    for (const entityId of queryBox.findAllEntityIds()) {
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        Position.arrays.x[entityId] -= 1 * deltaTime
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        Position.arrays.y[entityId] -= 1 * deltaTime
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        Position.arrays.y[entityId] += 1 * deltaTime
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        Position.arrays.x[entityId] += 1 * deltaTime
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

  function renderingSystem(): void {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    ctx.save()
    for (const entityId of queryBox.findAllEntityIds()) {
      const color = Style.arrays.color[entityId]
      ctx.fillStyle = COLORS[color]
      const x = Position.arrays.x[entityId]
      const y = Position.arrays.y[entityId]
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
    world.addComponents(
      entityId
    , [Position, {
        x: random(0, SCREEN_WIDTH)
      , y: random(0, SCREEN_HEIGHT)
      }]
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
    entities++
  }

  function removeBox(entityId: number): void {
    world.removeEntityId(entityId)
    entities--
  }
}
