import React from 'react'
import { Accordion } from 'semantic-ui-react'

const replies = (
  <div>
    <Accordion.Accordion panels={
        [
          { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },
          { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' },
        ]
      } />
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: 'Message 1', content: { content: replies } },
]

const AccordionExampleNested = () => <Accordion panels={rootPanels} styled />

export default AccordionExampleNested