import {hues} from '@sanity/color'
import {Button, Flex, Label} from '@sanity/ui'
import pluralize from 'pluralize'
import React, {FC} from 'react'
import {useDispatch} from 'react-redux'

import useTypedSelector from '../../hooks/useTypedSelector'
import {dialogActions} from '../../modules/dialog'
import {assetsActions, selectAssetsPicked} from '../../modules/assets'

const PickedBar: FC = () => {
  // Redux
  const dispatch = useDispatch()
  const assetsPicked = useTypedSelector(selectAssetsPicked)

  // Callbacks
  const handlePickClear = () => {
    dispatch(assetsActions.pickClear())
  }

  const handleDeletePicked = () => {
    dispatch(dialogActions.showConfirmDeleteAssetsPicked({assetsPicked}))
  }

  if (assetsPicked.length === 0) {
    return null
  }

  return (
    <Flex
      align="center"
      justify="flex-start"
      paddingX={3}
      style={{
        background: hues.gray?.[900].hex,
        borderBottom: `1px solid ${hues.gray?.[900].hex}`,
        height: '2.0em',
        position: 'relative'
      }}
    >
      <Flex align="center">
        <Label
          size={0}
          style={{
            color: 'inherit'
          }}
        >
          {assetsPicked.length} {pluralize('asset', assetsPicked.length)} selected
        </Label>

        {/* Deselect button */}
        <Flex marginLeft={4} marginRight={3}>
          <Button
            mode="bleed"
            onClick={handlePickClear}
            style={{
              background: 'none'
            }}
          >
            <Label size={0}>Deselect</Label>
          </Button>
        </Flex>

        {/* Delete button */}
        <Button
          fontSize={1}
          mode="bleed"
          onClick={handleDeletePicked}
          style={{
            background: 'none'
          }}
          tone="critical"
        >
          <Label size={0}>Delete</Label>
        </Button>
      </Flex>
    </Flex>
  )
}

export default PickedBar
