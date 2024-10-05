import { NextFunction } from 'express';

const decodedJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

export function loggerRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.get('authorization');

  if (authorization) {
    const token = decodedJwt(authorization);

    req.headers.set('x-request-sub', token.sub);
    req.headers.set('x-request-user-id', token.user_id);
    req.headers.set('x-request-username', token.username);
  }

  next();
}
