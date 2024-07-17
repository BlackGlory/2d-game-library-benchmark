import { GameLoop } from 'extra-game-loop'
import { ECS, GroupTuple } from '@thi.ng/ecs'
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
  enum Vector {
    x
  , y
  }

  enum SideLength {
    width
  , height
  }

  enum StyleIndex {
    color
  }

  const fpsRecords: number[] = []
  const keyStateObserver = new KeyStateObserver(canvas)

  canvas.width = SCREEN_WIDTH_PIXELS
  canvas.height = SCREEN_HEIGHT_PIXELS
  const ctx = canvas.getContext('2d')!

  interface ComponentSpec {
    Position: Float64Array
    PreviousPosition: Float64Array
    Style: Uint8Array
    Size: Uint8Array
    Velocity: Float64Array
  }

  const world = new ECS<ComponentSpec>({
    capacity: 100000
  })

  const PreviousPosition = world.defComponent({
    id: 'PreviousPosition'
  , type: 'f64'
  , size: 2
  })!

  const Position = world.defComponent({
    id: 'Position'
  , type: 'f64'
  , size: 2
  })!

  const Style = world.defComponent({
    id: 'Style'
  , type: 'u8'
  , size: 1
  })!

  const Size = world.defComponent({
    id: 'Size'
  , type: 'u8'
  , size: 2
  })!

  const Velocity = world.defComponent({
    id: 'Velocity'
  , type: 'f64'
  , size: 2
  })!

  const queryObject = world.defGroup([Position, Velocity, Size, Style])

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
    queryObject.forEach(entity => {
      updatePreviousPosition(entity)
      entity.Position[Vector.x] += entity.Velocity[Vector.x] * deltaTime
      entity.Position[Vector.y] += entity.Velocity[Vector.y] * deltaTime
    })
  }

  function updatePreviousPosition(entity: GroupTuple<ComponentSpec, 'Position'>): void {
    const previousX = entity.Position[Vector.x]
    const previousY = entity.Position[Vector.y]
    PreviousPosition.set(entity.id, [previousX, previousY])
  }

  function directorSystem(deltaTime: number): void {
    const oldObjects = objects
    queryObject.forEach(entity => {
      if (
         keyStateObserver.getKeyState(Key.A) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Left) === KeyState.Down
      ) {
        entity.Position[Vector.x] -= 1 * deltaTime
        updatePreviousPosition(entity)
      }
      if (
         keyStateObserver.getKeyState(Key.W) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Up) === KeyState.Down
      ) {
        entity.Position[Vector.y] -= 1 * deltaTime
        updatePreviousPosition(entity)
      }
      if (
         keyStateObserver.getKeyState(Key.S) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Down) === KeyState.Down
      ) {
        entity.Position[Vector.y] += 1 * deltaTime
        updatePreviousPosition(entity)
      }
      if (
         keyStateObserver.getKeyState(Key.D) === KeyState.Down ||
         keyStateObserver.getKeyState(Key.Right) === KeyState.Down
      ) {
        entity.Position[Vector.x] += 1 * deltaTime
        updatePreviousPosition(entity)
      }
      const x = entity.Position[Vector.x]
      const y = entity.Position[Vector.y]
      const width = entity.Size[SideLength.width]
      const height = entity.Size[SideLength.height]
      if (
        x > SCREEN_WIDTH_PIXELS ||
        y > SCREEN_HEIGHT_PIXELS ||
        (x + width) < 0 ||
        (y + height) < 0
      ) {
        removeObject(entity.id)
      }
    })

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
    queryObject.forEach(entity => {
      const color = entity.Style[StyleIndex.color]
      ctx.fillStyle = COLORS[color]
      const previousPosition = PreviousPosition.get(entity.id)!
      const previousX = previousPosition[Vector.x]
      const previousY = previousPosition[Vector.y]
      const currentX = entity.Position[Vector.x]
      const currentY = entity.Position[Vector.y]
      const x = lerp(alpha, previousX, currentX)
      const y = lerp(alpha, previousY, currentY)
      const width = entity.Size[SideLength.width]
      const height = entity.Size[SideLength.height]
      ctx.fillRect(x, y, width, height)
    })
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

    // @ts-ignore
    world.defEntity({
      Position: [x, y]
    , Velocity: [random(-0.01, 0.01), random(-0.01, 0.01)]
    , Size: [randomIntInclusive(1, 100), randomIntInclusive(1, 100)]
    , Style: [randomInt(0, COLORS.length)]
    , PreviousPosition: [x, y]
    })

    objects++
  }

  function removeObject(entityId: number): void {
    world.deleteID(entityId)

    objects--
  }
}
