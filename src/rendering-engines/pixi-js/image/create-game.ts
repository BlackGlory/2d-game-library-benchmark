import { GameLoop } from 'extra-game-loop'
import { StructureOfResizableArrays } from 'structure-of-arrays'
import { RecyclableQuery as Query, RecyclableWorld as World, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { randomFloat, randomInt, randomIntInclusive } from 'extra-rand'
import { SyncDestructor } from 'extra-defer'
import * as PIXI from 'pixi.js'
import { go } from '@blackglory/prelude'
import { lerp } from 'extra-utils'
import items from '@src/assets/items.png'
import { loadImage } from '@utils/load-image'
import { Sampler } from '@utils/sampler'

const MIN_GAME_FPS = 30
const PHYSICS_FPS = 50
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080

export async function createGame(canvas: HTMLCanvasElement): Promise<GameLoop<number>> {
  const fpsSampler = new Sampler(60)
  const entityIdToSprite = new Map<number, PIXI.Sprite>()
  const keyStateObserver = new KeyStateObserver([canvas])

  PIXI.AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio
  PIXI.TextureSource.defaultOptions.scaleMode = 'nearest'

  const tiles = await go(async () => {
    const image = await loadImage(items)
    const texture = new PIXI.ImageSource({ resource: image })
    const tileSize = 16

    const promises: PIXI.Texture[] = []
    for (let y = 0; y < texture.height; y += tileSize) {
      for (let x = 0; x < texture.width; x += tileSize) {
        promises.push(new PIXI.Texture(
          {
            source: texture.source
          , frame: new PIXI.Rectangle(x, y, tileSize, tileSize)
          }
        ))
      }
    }

    return Promise.all(promises)
  })

  const renderer = await PIXI.autoDetectRenderer({
    canvas
  , width: SCREEN_WIDTH_PIXELS
  , height: SCREEN_HEIGHT_PIXELS
  , antialias: false
  })
  const stage = new PIXI.Container()

  enum ComponentId {
    PreviousPosition
  , Position
  , Size
  , Velocity
  }

  const world = new World<ComponentId>()

  const PreviousPositionSoA = new StructureOfResizableArrays({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , maxCapacity: 100000
  })
  const PreviousPosition = PreviousPositionSoA.arrays

  const PositionSoA = new StructureOfResizableArrays({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , maxCapacity: 100000
  })
  const Position = PositionSoA.arrays

  const SizeSoA = new StructureOfResizableArrays({
    structure: {
      width: Uint8Array
    , height: Uint8Array
    }
  , maxCapacity: 100000
  })
  const Size = SizeSoA.arrays

  const VelocitySoA = new StructureOfResizableArrays({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , maxCapacity: 100000
  })
  const Velocity = VelocitySoA.arrays

  const queryObject = new Query(world, allOf(
    ComponentId.Position
  , ComponentId.Velocity
  , ComponentId.Size
  ))

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
    for (const entityId of queryObject.findAllEntityIdsAscending()) {
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
    for (const entityId of queryObject.findAllEntityIdsAscending()) {
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
    for (const entityId of queryObject.findAllEntityIdsAscending()) {
      const previousX = PreviousPosition.x[entityId]
      const previousY = PreviousPosition.y[entityId]
      const currentX = Position.x[entityId]
      const currentY = Position.y[entityId]

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
    const tile = randomInt(0, tiles.length)

    const entityId = world.createEntityId()
    world.addComponentIds(entityId, [
      ComponentId.Position
    , ComponentId.Velocity
    , ComponentId.Size
    , ComponentId.PreviousPosition
    ])

    PositionSoA.ensure(entityId)
    Position.x[entityId] = x
    Position.y[entityId] = y

    VelocitySoA.ensure(entityId)
    Velocity.x[entityId] = vx
    Velocity.y[entityId] = vy

    SizeSoA.ensure(entityId)
    Size.width[entityId] = width
    Size.height[entityId] = height

    PreviousPositionSoA.ensure(entityId)
    PreviousPosition.x[entityId] = x
    PreviousPosition.y[entityId] = y

    const sprite = new PIXI.Sprite({
      texture: tiles[tile]
    , x: 0
    , y: 0
    , width: width
    , height: height
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
