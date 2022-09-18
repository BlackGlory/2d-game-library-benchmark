import React from 'react'
import * as PhysicsEngineBox2D from './physics-engine-box2d'
import * as PhysicsEngineRapier from './physics-engine-rapier'
import * as RenderingEngine from './rendering-engine'
import { Tab } from '@headlessui/react'
import { Game } from './game'
import classNames from 'classnames'

export function App() {
  const tabs = [
    {
      tabName: 'Rendering Engine Benchmark (PixiJS)'
    , tabPanel: <Game createGame={RenderingEngine.createGame} />
    }
  , {
      tabName: 'Physcis Engine Benchmark (Rapier)'
    , tabPanel: <Game createGame={PhysicsEngineRapier.createGame} />
    }
  , {
      tabName: 'Physcis Engine Benchmark (Box2D)'
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
