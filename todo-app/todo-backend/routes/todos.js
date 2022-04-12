const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/:id', async (_, res) => {
  const todo = await Todo.findById(_.params.id)
  res.send(todo);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

singleRouter.put('/:id', async (req, res) => {
  const body = request.body
  const todoEdit = {
    text: body.text,
    done: body.done
  }
  
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, todoEdit, { new: true })
  res.json(updatedTodo.toJSON())
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
