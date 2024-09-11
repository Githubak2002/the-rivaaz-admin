'use client'   
import { useUser } from '@clerk/nextjs';

const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
// const ALLOWED_EMAIL = 'rivaazecommerce@gmail.com';

export function isAdmin() {
  const { user } = useUser();
  return user && user.emailAddresses.some(email => email.emailAddress === ALLOWED_EMAIL);
}