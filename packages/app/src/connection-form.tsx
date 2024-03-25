import React from 'react'
import { z } from 'zod'

import { AppForm, fields } from './form'

const connectionFormSchema = z.object({
  label: fields.text.describe('Connection Label'),
  host: fields.url.describe('Websocket URL // wss://demo-remote.verse.link').toLowerCase(),
  path: fields.path.describe('Path/Location (optional) // Root Location'),
})

export function ConnectionForm({
  onSubmit,
  defaultValues,
  submitButton,
}: {
  onSubmit: (values: z.infer<typeof connectionFormSchema>) => void
  defaultValues: z.infer<typeof connectionFormSchema>
  submitButton: (input: { submit: () => void }) => React.ReactNode
}) {
  return (
    <AppForm
      schema={connectionFormSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      renderAfter={submitButton}
    >
      {
        /* @ts-ignore */
        (fields) => <>{Object.values(fields)}</>
      }
    </AppForm>
  )
}
