import { GameLoop } from 'extra-game-loop'
import { StructureOfResizableSparseMaps } from 'structure-of-arrays'
import { NonRecyclableQuery as Query, NonRecyclableWorld as World, allOf } from 'extra-ecs'
import { KeyStateObserver, Key, KeyState } from 'extra-key-state'
import { randomFloat, randomInt, randomIntInclusive } from 'extra-rand'
import { COLORS } from './colors'
import { lerp } from 'extra-utils'
import { Sampler } from '@utils/sampler'

const MIN_GAME_FPS = 30
const PHYSICS_FPS = 50
const SCREEN_WIDTH_PIXELS = 1920
const SCREEN_HEIGHT_PIXELS = 1080

export function createGame(canvas: HTMLCanvasElement): GameLoop<number> {
  const fpsSampler = new Sampler(60)
  const keyStateObserver = new KeyStateObserver([canvas])

  canvas.width = SCREEN_WIDTH_PIXELS
  canvas.height = SCREEN_HEIGHT_PIXELS
  const ctx = canvas.getContext('2d')!

  enum ComponentId {
    PreviousPosition
  , Position
  , Style
  , Size
  , Velocity
  }

  const maxEntities = 50_0000
  const world = new World<ComponentId>()

  const PreviousPositionSoSM = new StructureOfResizableSparseMaps({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , keys: Uint32Array
  , maxCapacity: maxEntities
  })
  const PreviousPosition = PreviousPositionSoSM.arrays

  const PositionSoSM = new StructureOfResizableSparseMaps({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , keys: Uint32Array
  , maxCapacity: maxEntities
  })
  const Position = PositionSoSM.arrays

  const StyleSoSM = new StructureOfResizableSparseMaps({
    structure: {
      color: Uint8Array
    }
  , keys: Uint32Array
  , maxCapacity: maxEntities
  })
  const Style = StyleSoSM.arrays

  const SizeSoSM = new StructureOfResizableSparseMaps({
    structure: {
      width: Uint8Array
    , height: Uint8Array
    }
  , keys: Uint32Array
  , maxCapacity: maxEntities
  })
  const Size = SizeSoSM.arrays

  const VelocitySoSM = new StructureOfResizableSparseMaps({
    structure: {
      x: Float64Array
    , y: Float64Array
    }
  , keys: Uint32Array
  , maxCapacity: maxEntities
  })
  const Velocity = VelocitySoSM.arrays

  const queryObject = new Query(world, allOf(
    ComponentId.Position
  , ComponentId.Velocity
  , ComponentId.Size
  , ComponentId.Style
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
      renderingSystem(alpha)
    }
  })

  return loop

  function physicsSystem(deltaTime: number): void {
    for (const entityId of queryObject.findAllEntityIds()) {
      updatePreviousPosition(entityId)
      const index = PositionSoSM.getIndexByKey(entityId)!
      Position.x[index] += Velocity.x[index] * deltaTime
      Position.y[index] += Velocity.y[index] * deltaTime
    }
  }

  function updatePreviousPosition(entityId: number): void {
    const positionIndex = PositionSoSM.getIndexByKey(entityId)!
    const previousX = Position.x[positionIndex]
    const previousY = Position.y[positionIndex]

    const previousPositionIndex = PreviousPositionSoSM.getIndexByKey(entityId)!
    PreviousPosition.x[previousPositionIndex] = previousX
    PreviousPosition.y[previousPositionIndex] = previousY
  }

  function directorSystem(deltaTime: number): void {
    const oldObjects = objects
    for (const entityId of queryObject.findAllEntityIds()) {
      const indexOfPosition = PositionSoSM.getIndexByKey(entityId)!
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        Position.x[indexOfPosition] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        Position.y[indexOfPosition] -= 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        Position.y[indexOfPosition] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        Position.x[indexOfPosition] += 1 * deltaTime
        updatePreviousPosition(entityId)
      }
      const x = Position.x[indexOfPosition]
      const y = Position.y[indexOfPosition]

      const indexOfSize = SizeSoSM.getIndexByKey(entityId)!
      const width = Size.width[indexOfSize]
      const height = Size.height[indexOfSize]

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

  function renderingSystem(alpha: number): void {
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, SCREEN_WIDTH_PIXELS, SCREEN_HEIGHT_PIXELS)
    ctx.restore()

    ctx.save()
    for (const entityId of queryObject.findAllEntityIds()) {
      const indexOfStyle = StyleSoSM.getIndexByKey(entityId)!
      const color = Style.color[indexOfStyle]
      ctx.fillStyle = COLORS[color]

      const indexOfPreviousPosition = PreviousPositionSoSM.getIndexByKey(entityId)!
      const previousX = PreviousPosition.x[indexOfPreviousPosition]
      const previousY = PreviousPosition.y[indexOfPreviousPosition]

      const indexOfPosition = PositionSoSM.getIndexByKey(entityId)!
      const currentX = Position.x[indexOfPosition]
      const currentY = Position.y[indexOfPosition]

      const x = lerp(alpha, [previousX, currentX])
      const y = lerp(alpha, [previousY, currentY])

      const indexOfSize = SizeSoSM.getIndexByKey(entityId)!
      const width = Size.width[indexOfSize]
      const height = Size.height[indexOfSize]

      // ctx.fillRect(x, y, width, height)
    }
    ctx.restore()

    {
      const text = `FPS: ${Math.floor(fpsSampler.get())}`
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
    const x = randomFloat(0, SCREEN_WIDTH_PIXELS)
    const y = randomFloat(0, SCREEN_HEIGHT_PIXELS)

    const entityId = world.createEntityId()
    world.addComponentIds(entityId, [
      ComponentId.Position
    , ComponentId.Velocity
    , ComponentId.Size
    , ComponentId.Style
    , ComponentId.PreviousPosition
    ])

    PositionSoSM.register(entityId)
    Position.x[entityId] = x
    Position.y[entityId] = y

    VelocitySoSM.register(entityId)
    Velocity.x[entityId] = randomFloat(-0.01, 0.01)
    Velocity.y[entityId] = randomFloat(-0.01, 0.01)

    SizeSoSM.register(entityId)
    Size.width[entityId] = randomIntInclusive(1, 100)
    Size.height[entityId] = randomIntInclusive(1, 100)

    StyleSoSM.register(entityId)
    Style.color[entityId] = randomInt(0, COLORS.length)

    PreviousPositionSoSM.register(entityId)
    PreviousPosition.x[entityId] = x
    PreviousPosition.y[entityId] = y

    objects++
  }

  function removeObject(entityId: number): void {
    world.removeEntityId(entityId)

    PositionSoSM.unregister(entityId)
    VelocitySoSM.unregister(entityId)
    SizeSoSM.unregister(entityId)
    PreviousPositionSoSM.unregister(entityId)

    objects--
  }
}
