const express = require('express')
const app = express()
const port = 3000

// To store the to-do items in-memory
let todos = []
let idCounter = 1

app.use(express.json())

// Get all to-do items
app.get('/todos', (req, res) => {
  res.json(todos)
})

// Get a specific to-do item by id
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const todo = todos.find((todo) => todo.id === id)
  if (todo) {
    res.json(todo)
  } else {
    res.status(404).json({ message: 'The list is not found' })
  }
})

// Create a new to-do item
app.post('/todos', (req, res) => {
  const { title, description } = req.body
  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }
  const newTodo = { id: idCounter++, title, description, completed: false }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// Update an existing to-do item by id
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { title, description, completed } = req.body
  const todo = todos.find((todo) => todo.id === id)
  if (todo) {
    todo.title = title !== undefined ? title : todo.title
    todo.description =
      description !== undefined ? description : todo.description
    todo.completed = completed !== undefined ? completed : todo.completed
    res.json(todo)
  } else {
    res.status(404).json({ message: 'To-do not found' })
  }
})

// Delete a to-do item by id
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const index = todos.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
    res.status(204).send()
  } else {
    res.status(404).json({ message: 'To-do not found' })
  }
})

app.listen(port, () => {
  console.log(`To-do list API listening at http://localhost:${port}`)
})
