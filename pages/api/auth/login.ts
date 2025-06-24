import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { mockUsers } from '../../../lib/mockusers';

const SECRET = process.env.JWT_SECRET!;
const EXPIRY = '1h';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { username, role: user.role },
    SECRET,
    { expiresIn: EXPIRY }
  );

  res.setHeader('Set-Cookie', serialize('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  }));

  res.status(200).json({ message: 'Logged in', role: user.role });
}
