// import { createServer } from 'node:http' // fs file system; crypto hash. http http
//
// const server = createServer((request, response) => {
//   console.log('teste')
//   return response.end()
// })
//
// server.listen(3333)

import {fastify} from "fastify";
import {DatabaseMemory} from "./database-memory.js";
import {DatabasePostgress} from "./database-postgress.js";

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgress()

server.get('/', () => {
  return 'Hello Get'
})

server.post('/videos', async (request, reply) => {
   const { title, description, duration } = request.body

  await database.create({
    title: title,
    description: description,
    duration: duration,
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search

  return await database.list(search)
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoId, {
    title: title,
    description: description,
    duration: duration,
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})