export type MockUser = {
  username: string;
  password: string;
  role: 'user' | 'admin';
  details?: {
    location: string;
    phone: string;
  };
};

export const mockUsers: MockUser[] = [
  {
    username: 'Prajwal',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Admin',
    password: 'adminpwd',
    role: 'admin',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Sudeep',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Shreyas',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Anil',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Neha',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Sanjay',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Manoj',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Lisa',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Yash',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Raj',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Briana',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Shobha',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  },
  {
    username: 'Pavan',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Bengaluru, India', phone: '+91 9876543210' },
  },
  {
    username: 'Amogh',
    password: 'userpwd',
    role: 'user',
    details: { location: 'Mumbai, India', phone: '+91 9123456780' },
  }
];