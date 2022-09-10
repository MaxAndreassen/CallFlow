// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        //@ts-ignore
        client = new MongoClient(uri as string, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    //@ts-ignore
    client = new MongoClient(uri as string, options)
    clientPromise = client.connect()
}

export default clientPromise