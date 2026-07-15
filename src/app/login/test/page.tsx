'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function TestAuth() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? `에러: ${error.message}` : `가입 성공: ${data.user?.email}`)
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? `에러: ${error.message}` : `로그인 성공: ${data.user?.email}`)
  }

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={handleLogin}>로그인</button>
      <p>{message}</p>
    </div>
  )
}