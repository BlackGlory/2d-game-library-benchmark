import { GameLoop } from 'extra-game-loop'
import { StructureOfArrays, float64, uint8 } from 'structure-of-arrays'
import { World, Query, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { randomFloat, randomInt, randomIntInclusive } from 'extra-rand'
import { SyncDestructor } from 'extra-defer'
import * as PIXI from 'pixi.js'
import { COLORS } from './colors'
import { lerp } from 'extra-utils'
import { Sampler } from '@utils/sampler'

const MIN_GAME_FPS = 30
const PHYSICS_FPS = 50
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080

export async function createGame(canvas: HTMLCanvasElement): Promise<GameLoop<number>> {
  const fpsSampler = new Sampler(60)
  const entityIdToSprite = new Map<number, PIXI.Sprite>()
  const keyStateObserver = new KeyStateObserver(canvas)

  PIXI.AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio
  PIXI.TextureSource.defaultOptions.scaleMode = 'nearest'

  const renderer = await PIXI.autoDetectRenderer({
    canvas
  , width: SCREEN_WIDTH_PIXELS
  , height: SCREEN_HEIGHT_PIXELS
  , antialias: true
  })
  const stage = new PIXI.Container()

  const world = new World()

  const PreviousPosition = new StructureOfArrays({
    x: float64
  , y: float64
  })
  const Position = new StructureOfArrays({
    x: float64
  , y: float64
  })
  const Size = new StructureOfArrays({
    width: uint8
  , height: uint8
  })
  const Velocity = new StructureOfArrays({
    x: float64
  , y: float64
  })

  const queryObject = new Query(world, allOf(Position, Velocity, Size))

  let objects: number = 0

  const loop = new GameLoop({
    fixedDeltaTime: 1000 / PHYSICS_FPS
  , maximumDeltaTime: 1000 / (PHYSICS_FPS / 2)
  , update(deltaTime: number): void {
      fpsSampler.sample(loop.getFramesOfSecond())

      directorSystem(deltaTime)
    }
  , fixedUpdate(deltaTime: number): void {
      physicsSystem(deltaTime)
    }
  , render(alpha: number) {
      stageUpdatingSystem(alpha)
      renderingSystem()
    }
  })

  return loop

  function physicsSystem(deltaTime: number): void {
    for (const entityId of queryObject.findAllEntityIds()) {
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
    const oldObjects = objects
    for (const entityId of queryObject.findAllEntityIds()) {
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
        removeObject(entityId)
      }
    }

    const currentFPS = Math.floor(fpsSampler.get())
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

  function stageUpdatingSystem(alpha: number): void {
    for (const entityId of queryObject.findAllEntityIds()) {
      const previousX = PreviousPosition.arrays.x[entityId]
      const previousY = PreviousPosition.arrays.y[entityId]
      const currentX = Position.arrays.x[entityId]
      const currentY = Position.arrays.y[entityId]

      const rect = entityIdToSprite.get(entityId)!
      rect.position.set(
        lerp(alpha, [previousX, currentX])
      , lerp(alpha, [previousY, currentY])
      )
    }
  }

  function renderingSystem(): void {
    const destructor = new SyncDestructor()
    {
      const text = new PIXI.Text({
        text: `FPS: ${Math.floor(fpsSampler.get())}`
      , style: {
          fontFamily: 'sans'
        , fontSize: 48
        , fill: 0xFFFFFF
        }
      })
      destructor.defer(() => text.destroy())
      text.position.x = 0
      text.position.y = 0

      const rect = new PIXI.Graphics()
        .rect(0, 0, text.width, text.height)
        .fill(0x000000)
      destructor.defer(() => rect.destroy())
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    {
      const text = new PIXI.Text({
        text: `Objects: ${objects}`
      , style: {
          fontFamily: 'sans'
        , fontSize: 48
        , fill: 0xFFFFFF
        }
      })
      destructor.defer(() => text.destroy())
      text.position.x = SCREEN_WIDTH_PIXELS - text.width
      text.position.y = 0

      const rect = new PIXI.Graphics()
        .rect(0, 0, text.width, text.height)
        .fill(0x000000)
      destructor.defer(() => rect.destroy())
      rect.position.x = text.position.x
      rect.position.y = text.position.y

      stage.addChild(rect, text)
      destructor.defer(() => stage.removeChild(rect, text))
    }

    renderer.render(stage)

    destructor.execute()
  }

  function addObject(): void {
    const x = randomFloat(0, SCREEN_WIDTH_PIXELS)
    const y = randomFloat(0, SCREEN_HEIGHT_PIXELS)
    const vx = randomFloat(-0.01, 0.01)
    const vy = randomFloat(-0.01, 0.01)
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

    const sprite = new PIXI.Sprite({
      texture: PIXI.Texture.WHITE
    , x: 0
    , y: 0
    , width: width
    , height: height
    , tint: COLORS[colorIndex]
    })

    stage.addChild(sprite)
    entityIdToSprite.set(entityId, sprite)

    objects++
  }

  function removeObject(entityId: number): void {
    const sprite = entityIdToSprite.get(entityId)!
    sprite.destroy()
    stage.removeChild(sprite)
    world.removeEntityId(entityId)
    entityIdToSprite.delete(entityId)

    objects--
  }
}
