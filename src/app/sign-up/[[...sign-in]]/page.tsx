import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpComponent = () => {
  return (
     <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm">
        <SignUp
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

export default SignUpComponent