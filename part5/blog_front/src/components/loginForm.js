import React from 'react'

const loginForm = ({ usrHndlr, pwHndlr, submitHndlr, username, password }) => (
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