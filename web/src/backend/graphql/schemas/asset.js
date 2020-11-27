import { gql } from "apollo-server-express"

export default gql`
	type Asset {
		id: ID!
	}
`

// Add inside when implement
// extend type Query {}

// extend type Mutation {}
