const routes = require('./server-routes.js');
const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const taskRoutes = require('./routes/task-routes.js');

const app = express();

app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// app.get('/', routes.getAllTodos);
// app.get('/:id', routes.getTodo);

// app.post('/', routes.postTodo);
// app.patch('/:id', routes.patchTodo);

// app.delete('/', routes.deleteAllTodos);
// app.delete('/:id', routes.deleteTodo);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;