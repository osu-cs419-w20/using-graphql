import React from 'react';

// import UserIssues from './pages/UserIssues';
import UserIssues from './pages/UserIssuesWithGraphQL';
import ChangeUserStatus from './pages/ChangeUserStatusGraphQL';

function App() {
  return (
    <div>
      {/* <UserIssues /> */}
      <ChangeUserStatus />
    </div>
  );
}

export default App;
