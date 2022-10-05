import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const uri = process.env.BE_MONK_HTTP || 'http://localhost:8080'
const url = process.env.BE_MONK_WS || 'ws://localhost:8080'
const httpLink = new HttpLink({uri:uri+'/graphql'})
const wsLink = new GraphQLWsLink(createClient({url:url+'/subscriptions'}))
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({ link: splitLink, cache: new InMemoryCache() })
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
reportWebVitals(console.log)