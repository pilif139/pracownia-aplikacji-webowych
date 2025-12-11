import { Request, Response } from 'express'

export default function createLog(req: Request, res: Response) {
  return {
    timestamp: new Date(),
    request: {
      method: req.method,
      url: req.url,
      path: req.path,
      query: req.query,
      params: req.params,
      body: req.body,
      headers: req.headers,
      ip: req.ip
    },
    response: {
      statusCode: res.statusCode
    }
  }
}
