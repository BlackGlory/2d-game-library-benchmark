import { GameLoop } from 'extra-game-loop'
import { StructureOfResizableArrays } from 'structure-of-arrays'
import { RecyclableQuery as Query, RecyclableWorld as World, allOf } from 'extra-ecs'
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

  const world = new World()

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

  const StyleSoA = new StructureOfResizableArrays({
    structure: {
      color: Uint8Array
    }
  , maxCapacity: 100000
  })
  const Style = StyleSoA.arrays

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

  function renderingSystem(alpha: number): void {
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, SCREEN_WIDTH_PIXELS, SCREEN_HEIGHT_PIXELS)
    ctx.restore()

    ctx.save()
    for (const entityId of queryObject.findAllEntityIdsAscending()) {
      const color = Style.color[entityId]
      ctx.fillStyle = COLORS[color]
      const previousX = PreviousPosition.x[entityId]
      const previousY = PreviousPosition.y[entityId]
      const currentX = Position.x[entityId]
      const currentY = Position.y[entityId]
      const x = lerp(alpha, [previousX, currentX])
      const y = lerp(alpha, [previousY, currentY])
      const width = Size.width[entityId]
      const height = Size.height[entityId]
      ctx.fillRect(x, y, width, height)
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
    const vx = randomFloat(-0.01, 0.01)
    const vy = randomFloat(-0.01, 0.01)
    const width = randomIntInclusive(1, 100)
    const height = randomIntInclusive(1, 100)
    const colorIndex = randomInt(0, COLORS.length)

    const entityId = world.createEntityId()
    world.addComponentIds(entityId, [
      ComponentId.Position
    , ComponentId.Velocity
    , ComponentId.Size
    , ComponentId.Style
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

    StyleSoA.ensure(entityId)
    Style.color[entityId] = colorIndex

    PreviousPositionSoA.ensure(entityId)
    PreviousPosition.x[entityId] = x
    PreviousPosition.y[entityId] = y

    objects++
  }

  function removeObject(entityId: number): void {
    world.removeEntityId(entityId)

    objects--
  }
}
