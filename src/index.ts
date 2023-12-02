import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { gql } from 'graphql-tag';

const query = gql`
  fragment Films on Root {
    allFilms(first: 1) {
      edges {
        node {
          title
        }
      }
    }
  }

  query getFilms {
    allPeople(first: 1) {
      edges {
        node {
          name
        }
      }
    }
    ...Films
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  }),
  cache: new InMemoryCache(),
});

console.log(await client.query({ query }));
