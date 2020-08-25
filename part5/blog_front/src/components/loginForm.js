import React from 'react'

//
// Renders the login form
//

// Hndlr functions = ({ target }) => setAttribute(target.value)
const loginForm = ({
    usrHndlr,
    pwHndlr,
    submitHndlr,
    username,
    password
}) => (
        <form onSubmit={submitHndlr}>
            <div>
                username:
                    <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={usrHndlr}
                />
            </div>
            <div>
                password:
                    <input
                    type="text"
                    value={password}
                    name="password"
                    onChange={pwHndlr}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

export default loginForm