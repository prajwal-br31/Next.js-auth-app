import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const SECRET = process.env.JWT_SECRET!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  
  const token = cookies.auth;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, SECRET) as { username: string; role: string };
    res.status(200).json({ username: decoded.username, role: decoded.role });
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
