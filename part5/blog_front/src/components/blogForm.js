import React from 'react'


//
// displays the form  the addition of new blogs
//


// Hndlr functions = ({ target }) => setAttribute(target.value)
const blogForm = ({
    submitHndlr,
    titleHndlr,
    authorHndlr,
    urlHndlr,
    title,
    author,
    url }) => {

    return (
        <div>
            <form onSubmit={submitHndlr}>
                <h3>Add new blog</h3>

                <div>
                    Title:
                    <input
                        type='text'
                        value={title}
                        name='title'
                        onChange={titleHndlr}
                    />
                </div>

                <div>
                    Author:
                    <input
                        type='text'
                        value={author}
                        name='author'
                        onChange={authorHndlr}
                    />
                </div>

                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={urlHndlr}
                    />
                </div>

                <button type="submit">save</button>
            </form>
        </div>
    )
}
export default blogForm