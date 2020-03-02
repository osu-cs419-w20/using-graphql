const ApolloClient = require('apollo-boost').default;
const { gql } = require('apollo-boost');
const fetch = require('isomorphic-unfetch');

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  },
  fetch: fetch
});

const GET_USER_DATA = gql`
query {
  user(login: "octocat") {
    name
    url
    avatarUrl
  }
}
`;

console.log("GET_USER_DATA:", GET_USER_DATA);
client.query({ query: GET_USER_DATA })
  .then(response => console.log(response));
