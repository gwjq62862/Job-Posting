
import { SignIn } from "@clerk/nextjs"; 

import React from 'react'

const SignInCompnent = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
  <div className="w-full max-w-sm">
    <SignIn
      appearance={{
        elements: {
          card: 'shadow-xl rounded-xl',
          
        },
      }}
    />
  </div>
</div>
  )
}

export default SignInCompnent