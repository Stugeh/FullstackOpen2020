
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, findByText } from '@testing-library/react'
import Blog from './Blog'

describe('BLOG TESTS', () => {
  let component
  let blog
  const mockSetter = jest.fn()
  const mockLike = jest.fn()

  beforeEach(() => {
    blog = {
      title:'blog title',
      author:'blogs author',
      likes:10,
      url: 'www.test.com'
    }

    component = render(
      <Blog blog={blog} setBlogs={mockSetter} testHandler={mockLike}/>
    )

  })

  test('renders blog correctly', () => {
    expect(component.container).toHaveTextContent(
      'Title: blog title'
    )
    expect(component.container).toHaveTextContent(
      'Author: blogs author'
    )
    const div = component.container.querySelector('.togglableComponent')
    expect(div).not.toBeVisible()
  })

  test('renders extra info when expand button has been pressed.', () => {
    const showInfo = component.container.querySelector('.infoEnable')
    const extraInfo = component.container.querySelector('.togglableComponent')
    fireEvent.click(showInfo)
    expect(extraInfo).toBeVisible
  })

  test('The like button handler gets called the correct amount of times', () => {
    const showInfo = component.container.querySelector('.infoEnable')
    fireEvent.click(showInfo)
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLike.mock.calls).toHaveLength(2)
  })

})