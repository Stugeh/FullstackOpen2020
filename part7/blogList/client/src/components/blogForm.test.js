import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, findByText } from '@testing-library/react'
import BlogForm from './blogForm'

describe('BLOG FORM TESTS', () => {
  test('checking that create blog function is called correctly', () => {
    const mockCreate = jest.fn()

    const component = render(
      <BlogForm createBlog={mockCreate}/>
    )

    const result =[
      [
        {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 0
        }
      ]
    ]

    const title = component.getByPlaceholderText('title')
    const author = component.getByPlaceholderText('author')
    const url = component.getByPlaceholderText('url')

    const submit = component.getByText('save')

    fireEvent.change(title,{
      target:{ value: 'new title' }
    })
    fireEvent.change(author,{
      target:{ value: 'new author' }
    })
    fireEvent.change(url,{
      target:{ value: 'new url' }
    })

    fireEvent.click(submit)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls).toEqual(result)
  })
})
