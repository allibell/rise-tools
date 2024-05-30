import { event, setStateAction, state } from '@final-ui/react'
import {
  Button,
  Sheet,
  SheetFrame,
  SheetHandle,
  SheetOverlay,
  Text,
  View,
  YStack,
} from '@final-ui/tamagui/server'

import { db } from './db'

export const models = {
  '': Root,
  item: Item,
}

async function Item() {
  return (
    <View>
      <Text>Item</Text>
    </View>
  )
}

async function Root() {
  const { data, error } = await db.from('inventory').select()
  if (error) {
    return (
      <View>
        <Text>There was an error loading: {error.message}</Text>
      </View>
    )
  }
  return (
    <View
      onPress={() => {
        console.log('pressed')
      }}
    >
      <Text>Items in inventory: {JSON.stringify(data)}</Text>
    </View>
  )
}
type DropdownButtonProps = {
  options: {
    key: string
    label: string
    icon: any
  }[]
  onSelect: (key: string) => void
}
export function DropdownButton({ options, onSelect }: DropdownButtonProps) {
  const isOpen = state(false)
  return (
    <>
      <Button onPress={setStateAction(isOpen, true)} />
      <Sheet
        forceRemoveScrollEnabled={isOpen}
        modal={true}
        open={isOpen}
        onOpenChange={setStateAction(isOpen)}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
      >
        <SheetOverlay animation="quick" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <SheetHandle />
        <SheetFrame padding="$4" justifyContent="center" space="$5">
          <YStack gap="$3">
            {options?.map((item) => {
              return (
                <Button
                  key={item.key}
                  onPress={event(
                    () => {
                      onSelect?.(item.key)
                    },
                    setStateAction(isOpen, false)
                  )}
                >
                  {item.label}
                </Button>
              )
            })}
          </YStack>
        </SheetFrame>
      </Sheet>
    </>
  )
}
