import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  // Variável privada
  #videos = new Map()

  // Set: array que não aceita valores duplicados
  // Map: api melhor para trabalhar com objetos

  list(search) {
    // Retorna apenas os objetos
    // return Array.from(this.#videos.values())

    // Apresenta o ID dos objetos dentro do array
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter(video => {
        if(search) {
          return video.title.includes(search)
        }

        return true
      })
  }

  create(video) {
    const videoId = randomUUID()
    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}