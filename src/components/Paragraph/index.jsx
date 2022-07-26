import React from 'react'
import { Panel, PanelGroup } from 'rsuite';

export default function Paragraph() {
  return (
    <>
      <div className=''>
        <PanelGroup accordion bordered>
          <Panel defaultExpanded>
            <Paragraph />
          </Panel>
          <Panel>
            <Paragraph />
          </Panel>
          <Panel header="Panel 3">
            <Paragraph />
          </Panel>
        </PanelGroup>
      </div>
    </>
  )
}
