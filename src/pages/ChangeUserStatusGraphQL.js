import React, { useState } from 'react';

function ChangeUserStatus() {
  const haveToken = !!process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
  const [ emoji, setEmoji ] = useState("");
  const [ message, setMessage ] = useState("");

  return (
    <div>
      {haveToken ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          setEmoji("");
          setMessage("");
        }}>
          <div>
            <input
              type="text"
              placeholder="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}

export default ChangeUserStatus;
