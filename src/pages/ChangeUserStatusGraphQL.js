import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const CHANGE_USER_STATUS = gql`
mutation ChangeUserStatus($emoji: String!, $message: String!) {
  changeUserStatus(input: {
    clientMutationId: "cs419Lecture",
    emoji: $emoji,
    message: $message
  }) {
    status {
      updatedAt
    }
  }
}
`;

function ChangeUserStatus() {
  const haveToken = !!process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
  const [ emoji, setEmoji ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ changeUserStatus, { data } ] = useMutation(CHANGE_USER_STATUS);

  // changeUserStatus({ variables: {
  //   emoji: emoji,
  //   message: message
  // }});

  return (
    <div>
      {haveToken ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          // changeUserStatus({ variables: {
          //   emoji: emoji,
          //   message: message
          // }});
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
          {data && data.changeUserStatus.status && <p>Updated at: {data.changeUserStatus.status.updatedAt}</p>}
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
