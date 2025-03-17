//  create a task route

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/todo-queries');
const authenticatedToken  = require('../middleware/auth-middleware');
const router = express.Router();

router.post('/create-task', authenticatedToken, async (req, res) => {

  const { title, description } = req.body;

  console.log(`title`, title);
  console.log(`description`, description);

  const user = req.user;
  console.log('user', user);

  const id = uuidv4();
  const task = {
    id,
    title,
    description,
    status: 'todo',
    user_id: user.id,
  }

  console.log(`task`, task);

  try {
  
  const taskCreated = await db.createTask(task);

  res.status(201).json({ task: taskCreated });
} catch (err) {
  console.log(`Could not create task: ${err}`);
  return res.status(500).send('Opps! Could not create task.');
}
});

module.exports = router;

