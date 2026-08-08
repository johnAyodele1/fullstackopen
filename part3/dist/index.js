"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
morgan_1.default.token('body', (req) => JSON.stringify(req.body));
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
let persons = [
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
];
app.get('/api/persons', (_req, res) => {
    res.json(persons);
});
app.get('/info', (_req, res) => {
    res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find((p) => p.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).json({ error: 'person not found' });
    }
});
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter((p) => p.id !== id);
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }
    if (persons.some((p) => p.name === name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const newPerson = {
        id: String(Math.floor(Math.random() * 1000000) + 1),
        name,
        number
    };
    persons = persons.concat(newPerson);
    res.status(201).json(newPerson);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
