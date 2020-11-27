import { gql } from "apollo-server-express";

export default gql`
    type User {id: ID!}
`;
// Add inside when implement
// extend type Query {}

// extend type Mutation {}