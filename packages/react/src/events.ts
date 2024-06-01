import type { ReactElement } from 'react'

import { ServerResponseDataState } from './response'
import { ActionDataState, DataState, EventDataState, isEventDataState, JSONValue } from './template'

/** Server data state*/
export type ServerDataState = DataState | ServerEventDataState
export type RuntimeServerDataState = Exclude<ServerDataState, ReactElement>

type ServerHandlerReturnType = ServerResponseDataState | JSONValue | void
export type ServerHandlerFunction = (
  args: any
) => Promise<ServerHandlerReturnType> | ServerHandlerReturnType
export type ServerEventDataState = EventDataState & {
  handler: ServerHandlerFunction
}
export function isServerEventDataState(obj: RuntimeServerDataState): obj is ServerEventDataState {
  return isEventDataState(obj) && 'handler' in obj && typeof obj.handler === 'function'
}

export function event(
  func: ServerHandlerFunction,
  opts?: {
    actions?: ActionDataState[]
    timeout?: number
  }
): ServerEventDataState {
  return {
    $: 'event',
    handler: func,
    actions: opts?.actions,
    timeout: opts?.timeout,
  }
}

export function action<T = any>(name: T): ActionDataState<T> {
  return {
    $: 'action',
    name,
  }
}
