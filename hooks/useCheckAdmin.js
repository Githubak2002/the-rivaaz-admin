
/**
'use client'   
import { useUser } from '@clerk/nextjs';

const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export function isAdmin() {
  const { user } = useUser();
  return user && user.emailAddresses.some(email => email.emailAddress === ALLOWED_EMAIL);
}
 */


'use client'; // Ensure this is at the top if you are using Next.js with client-side rendering

import { useUser } from '@clerk/nextjs';

const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export function useIsAdmin() {
  const { user } = useUser();
  
  return user && user.emailAddresses.some(email => email.emailAddress === ALLOWED_EMAIL);
}
