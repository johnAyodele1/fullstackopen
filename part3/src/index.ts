import express, { Request, Response } from 'express'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

morgan.token('body', (req: express.Request) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

interface Person {
  id: string
  name: string
  number: string
}

let persons: Person[] = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.get('/api/persons', (_req: Request, res: Response<Person[]>) => {
  res.json(persons)
})

app.get('/info', (_req: Request, res: Response) => {
  res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`)
})

app.get('/api/persons/:id', (req: Request, res: Response<Person | { error: string }>) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req: Request, res: Response<Person | { error: string }>) => {
  const { name, number } = req.body as Partial<Person>

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson: Person = {
    id: String(Math.floor(Math.random() * 1000000) + 1),
    name,
    number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
