import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { mockUsers } from '../../../lib/mockusers';

const SECRET = process.env.JWT_SECRET!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.auth;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, SECRET) as { username: string; role: string };
    const userRec = mockUsers.find(u => u.username === payload.username)!;

    if (payload.role === 'admin') {
      // If Admin : Return all user's details and password
      const users = mockUsers.map(u => ({
        username: u.username,
        role: u.role,
        details: u.details,
        password: u.password,
      }));
      return res.status(200).json({ users });
    } else {
      // If User : Return only own details
      return res.status(200).json({
        user: {
          username: payload.username,
          role: payload.role,
          details: userRec.details,
          password: userRec.password,
        },
      });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
