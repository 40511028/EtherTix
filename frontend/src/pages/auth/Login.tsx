import React, {useState, useEffect} from 'react'

type LoginProps = {
  email: string
  password: string
}

// @description: Login Component
const Login: React.FC<LoginProps> = ({email, password}) => {

  return (
    <>
   
    <div>
       Login Page
    </div>

    </>
  )
}

export default Login