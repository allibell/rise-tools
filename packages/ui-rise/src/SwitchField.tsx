import { ComponentProps } from '@react-native-templates/core'
import React from 'react'
import { Label, Spinner, Switch, XStack } from 'tamagui'
import { z } from 'zod'

const SwitchFieldProps = z.object({
  value: z.boolean().nullable().optional(),
  label: z.string().optional(),
  onValue: z.string().or(z.array(z.string())).nullable().optional(),
})

export function SwitchField(props: z.infer<typeof SwitchFieldProps> & ComponentProps) {
  let content = <Spinner />
  if (typeof props.value === 'boolean') {
    content = (
      <Switch
        marginVertical={'$4'}
        checked={props.value}
        onCheckedChange={(value) => {
          // tbd: this results in onTemplateEvent called twice. Can we change this?
          // handleEvent(props.onTemplateEvent, props.onValue, 'switch', value)
          props.onTemplateEvent('update', value)
        }}
      >
        <Switch.Thumb animation="quick" />
      </Switch>
    )
  }
  return (
    <XStack alignItems="center" justifyContent="space-between">
      <Label>{props.label}</Label>
      {content}
    </XStack>
  )
}

SwitchField.validate = (props: any) => {
  return SwitchFieldProps.parse(props)
}
