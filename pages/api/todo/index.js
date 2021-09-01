// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getTodos, addTodo} from '../../../services/todo';

export default function handler(req, res) {
  if (req.method === 'POST') {
    let body = req.body

    addTodo(body);

    if (`${req.headers['Content-Type']}` === 'application/json') {
      res.status(201).json(body);
    } else {
      res.redirect(302, '/')
    }

  } else if (req.method === 'GET') {
    res.status(200).send(getTodos())
  }
}
