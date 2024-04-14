import '@testing-library/jest-dom'
import 'next-router-mock'

global.scrollTo = jest.fn()
Element.prototype.scroll = jest.fn()
Element.prototype.scrollBy = () => {}
Element.prototype.scrollIntoView = jest.fn()
global.open = jest.fn()

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('this is file content')
  })
) as jest.Mock

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

// Set test timeout to 2mins for slow devices
jest.setTimeout(240_000)
