import React from 'react'
import * as ECSFrameworkExtraECS from './ecs-framework-extra-ecs'
import * as ECSFrameworkBitECS from './ecs-framework-bit-ecs'
import * as PhysicsEngineBox2D from './physics-engine-box2d'
import * as PhysicsEngineRapier from './physics-engine-rapier'
import * as RenderingEngineCanvas2D from './rendering-engine-canvas2d'
import * as RenderingEnginePixiJS from './rendering-engine-pixi-js'
import { Tab } from '@headlessui/react'
import { Game } from './game'
import classNames from 'classnames'

export function App() {
  const tabs = [
    {
      tabName: 'ECS Framework: extra-ecs'
    , tabPanel: <Game createGame={ECSFrameworkExtraECS.createGame} />
    }
  , {
      tabName: 'ECS Framework: BitECS (buggy)'
    , tabPanel: <Game createGame={ECSFrameworkBitECS.createGame} />
    }
  , {
      tabName: 'Rendering Engine: Canvas2D'
    , tabPanel: <Game createGame={RenderingEngineCanvas2D.createGame} />
    }
  , {
      tabName: 'Rendering Engine: PixiJS'
    , tabPanel: <Game createGame={RenderingEnginePixiJS.createGame} />
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
