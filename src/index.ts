import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { resolvers } from '@generated/type-graphql'


const BASIC_LOGGING = {
    requestDidStart(requestContext) {
        console.log("request started");
        console.log(requestContext.request.query);
        console.log(requestContext.request.variables);
        return {
            didEncounterErrors(requestContext) {
                console.log("an error happened in response to query " + requestContext.request.query);
                console.log(requestContext.errors);
            }
        };
    },

    willSendResponse(requestContext) {
        console.log("response sent", requestContext.response);
    }
};


const app = async () => {
  const schema = await tq.buildSchema({
    resolvers,
  })

  new ApolloServer({ schema, context: context, plugins: [BASIC_LOGGING] }).listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`,
    ),
  )
}

app()
