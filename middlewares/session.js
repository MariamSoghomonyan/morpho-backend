import session from 'express-session';

export default function sessionMiddleware() {
  return session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  });
}