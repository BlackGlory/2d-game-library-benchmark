import * as ECSFrameworkExtraECSStructureOfArrays from './ecs-framework-extra-ecs-structure-of-arrays'
import * as ECSFrameworkExtraECSStructureOfSparseMaps from './ecs-framework-extra-ecs-structure-of-sparsemaps'
import * as ECSFrameworkBitECS from './ecs-framework-bit-ecs'
import * as ECSFrameworkThingECS from './ecs-framework-thing-ecs'
import * as PhysicsEngineBox2D from './physics-engine-box2d'
import * as PhysicsEngineRapier from './physics-engine-rapier'
import * as RenderingEngineCanvas2DShape from './rendering-engine-canvas2d-shape'
import * as RenderingEnginePixiJSShape from './rendering-engine-pixi-js-shape'
import * as RenderingEngineCanvas2DImage from './rendering-engine-canvas2d-image'
import * as RenderingEnginePixiJSImage from './rendering-engine-pixi-js-image'
import { Tab } from '@headlessui/react'
import { Game } from './game'
import classNames from 'classnames'

export function App() {
  const tabs = [
    {
      tabName: 'ECS Framework: extra-ecs (StructureOfArrays)'
    , tabPanel: <Game createGame={ECSFrameworkExtraECSStructureOfArrays.createGame} />
    }
  , {
      tabName: 'ECS Framework: extra-ecs (StructureOfSparseMaps)'
    , tabPanel: <Game createGame={ECSFrameworkExtraECSStructureOfSparseMaps.createGame} />
    }
  , {
      tabName: 'ECS Framework: BitECS (buggy)'
    , tabPanel: <Game createGame={ECSFrameworkBitECS.createGame} />
    }
  , {
      tabName: 'ECS Framework: @thi.ng/ecs'
    , tabPanel: <Game createGame={ECSFrameworkThingECS.createGame} />
    }
  , {
      tabName: 'Rendering Engine: Canvas2D (shape)'
    , tabPanel: <Game createGame={RenderingEngineCanvas2DShape.createGame} />
    }
  , {
      tabName: 'Rendering Engine: PixiJS (shape)'
    , tabPanel: <Game createGame={RenderingEnginePixiJSShape.createGame} />
    }
  , {
      tabName: 'Rendering Engine: Canvas2D (image)'
    , tabPanel: <Game createGame={RenderingEngineCanvas2DImage.createGame} />
    }
  , {
      tabName: 'Rendering Engine: PixiJS (image)'
    , tabPanel: <Game createGame={RenderingEnginePixiJSImage.createGame} />
    }
  , {
      tabName: 'Physics Engine: Rapier'
    , tabPanel: <Game createGame={PhysicsEngineRapier.createGame} />
    }
  , {
      tabName: 'Physics Engine: Box2D'
    , tabPanel: <Game createGame={PhysicsEngineBox2D.createGame} />
    }
  ]

  return (
    <div className='w-[1920px] mx-auto my-2'>
      <Tab.Group>
        <Tab.List className='flex my-2 space-x-2'>
          {tabs.map(({ tabName }, index) => (
            <Tab
              key={index}
              className={({ selected }) => classNames(
                'flex-1 border px-2 py-1'
              , selected ? 'bg-neutral-200': 'bg-white hover:bg-neutral-100'
              )}
            >{tabName}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(({ tabPanel }, index) => (
            <Tab.Panel key={index}>{tabPanel}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
