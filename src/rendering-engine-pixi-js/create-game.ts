import { GameLoop } from 'extra-game-loop'
import { StructureOfArrays, double, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { random, randomInt, randomIntInclusive } from 'extra-rand'
import { truncateArrayRight } from '@blackglory/structures'
import { SyncDestructor } from 'extra-defer'
import * as PIXI from 'pixi.js'
import { pass } from '@blackglory/prelude'
import { COLORS } from './colors'
import { lerp } from '@utils/lerp'

const MIN_GAME_FPS = 60
const PHYSICS_FPS = 50
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsRecords: number[] = []
  const entityIdToSprite = new Map<number, PIXI.Sprite>()
  const keyStateObserver = new KeyStateObserver(canvas)

  PIXI.settings.RESOLUTION = window.devicePixelRatio
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

  const renderer = new PIXI.Renderer({
    view: canvas
  , width: SCREEN_WIDTH_PIXELS
  , height: SCREEN_HEIGHT_PIXELS
  , antialias: true
  })
  const stage = new PIXI.Container()
  const particleStage = new PIXI.ParticleContainer(100000)
  stage.addChild(particleStage)

  const world = new World()

  const PreviousPosition = new StructureOfArrays({
    x: double
  , y: double
  })
  const Position = new StructureOfArrays({
    x: double
  , y: double
  })
  const Size = new StructureOfArrays({
    width: uint8
  , height: uint8
  })
  const Velocity = new StructureOfArrays({
    x: double
  , y: double
  })

  const queryBox = new Query(world, allOf(Position, Velocity, Size))

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
      stageUpdatingSystem(alpha)
      renderingSystem()
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
    PreviousPosition.arrays.x[entityId] = previousX
    PreviousPosition.arrays.y[entityId] = previousY
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

  function stageUpdatingSystem(alpha: number): void {
    for (const entityId of queryBox.findAllEntityIds()) {
      const previousX = PreviousPosition.arrays.x[entityId]
      const previousY = PreviousPosition.arrays.y[entityId]
      const currentX = Position.arrays.x[entityId]
      const currentY = Position.arrays.y[entityId]

      const rect = entityIdToSprite.get(entityId)!
      rect.position.set(
        lerp(alpha, previousX, currentX)
      , lerp(alpha, previousY, currentY)
      )
    }
  }

  function renderingSystem(): void {
    const destructor = new SyncDestructor()
    {
      fpsRecords.push(loop.getFramesOfSecond())
      truncateArrayRight(fpsRecords, PHYSICS_FPS)
      const fps = Math.floor(fpsRecords.reduce((acc, cur) => acc + cur) / fpsRecords.length)

      const text = new PIXI.Text(`FPS: ${fps}`, {
        fontFamily: 'sans'
      , fontSize: 48
      , fill: 0xFFFFFF
      })
      destructor.defer(() => text.destroy())
      text.position.x = 0
      text.position.y = 0

      const rect = new PIXI.Graphics()
      destructor.defer(() => rect.destroy())
      rect.beginFill(0x000000)
      rect.drawRect(0, 0, text.width, text.height)
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    {
      const text = new PIXI.Text(`Boxes: ${boxes}`, {
        fontFamily: 'sans'
      , fontSize: 48
      , fill: 0xFFFFFF
      })
      destructor.defer(() => text.destroy())
      text.position.x = SCREEN_WIDTH_PIXELS - text.width
      text.position.y = 0

      const rect = new PIXI.Graphics()
      destructor.defer(() => rect.destroy())
      rect.beginFill(0x000000)
      rect.drawRect(0, 0, text.width, text.height)
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    renderer.render(stage)

    destructor.execute()
  }

  function addBox(): void {
    const x = random(0, SCREEN_WIDTH_PIXELS)
    const y = random(0, SCREEN_HEIGHT_PIXELS)
    const vx = random(-0.01, 0.01)
    const vy = random(-0.01, 0.01)
    const width = randomIntInclusive(1, 100)
    const height = randomIntInclusive(1, 100)
    const colorIndex = randomInt(0, COLORS.length)

    const entityId = world.createEntityId()
    world.addComponents(
      entityId
    , [Position, { x, y }]
    , [Velocity, { x: vx, y: vy }]
    , [Size, { width, height }]
    , [PreviousPosition, { x, y }]
    )

    const rect = new PIXI.Sprite(PIXI.Texture.WHITE)
    rect.x = 0
    rect.y = 0
    rect.width = width
    rect.height = height
    rect.tint = COLORS[colorIndex]

    particleStage.addChild(rect)
    entityIdToSprite.set(entityId, rect)

    boxes++
  }

  function removeBox(entityId: number): void {
    const rect = entityIdToSprite.get(entityId)!
    rect.destroy()
    particleStage.removeChild(rect)
    world.removeEntityId(entityId)
    entityIdToSprite.delete(entityId)

    boxes--
  }
}
