
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateTodo} from '../../../services/todo';

export default function handler(req, res) {
  if (req.method === 'POST') {
    let body = {...req.body, todoId: req.query.id, checked: req.body.checked || false}

    updateTodo(body)

    if (`${req.headers['Content-Type']}` === 'application/json') {
      res.status(201).json(body);
    } else {
      res.redirect(302, '/')
    }
  } else {
    res.status(501).send()
  }
}
