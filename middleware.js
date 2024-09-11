import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import toast from 'react-hot-toast'

const isProtectedRoute = createRouteMatcher(['/addproduct(.*)','/allproduct(.*)'])
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// export default clerkMiddleware()

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect()
//   }
// })

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    toast.loading("Please login with admin id.")

    return auth().redirectToSignIn()
    // return auth().redirectToSignIn('/sign-in')
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}