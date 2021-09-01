
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateTodo} from '../../../services/todo';

export default function handler(req, res) {
  if (req.method === 'POST') {
    let body = {...req.body, todoId: req.query.id, checked: req.body.checked || false}

    updateTodo(body)

    res.redirect(302, 'http://localhost:3000/')
  } else {
    res.status(501).send()
  }
}
