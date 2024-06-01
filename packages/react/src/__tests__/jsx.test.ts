import { createComponentDefinition, jsx } from '../jsx'
import { isComponentDataState, isEventDataState } from '../template'

const DummyComponent = createComponentDefinition('DummyComponent')

it('should create ComponentDataState', () => {
  const el = jsx(DummyComponent, { children: null })
  expect(isComponentDataState(el)).toBe(true)
})

it('should compose higher-order functions together', () => {
  const Screen = () => jsx(DummyComponent, { children: null })
  const el = jsx(Screen, { children: null })
  expect(isComponentDataState(el)).toBe(true)
})

it('should turn function into event', () => {
  const el = jsx(DummyComponent, {
    onPress: jest.fn(),
    children: null,
  })
  expect(isEventDataState(el.props!.onPress)).toBe(true)
})
