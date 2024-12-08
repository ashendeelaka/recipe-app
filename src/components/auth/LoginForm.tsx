import { Button, Card, Typography } from 'antd'
import React, { useState } from 'react'
import InputField from '../InputField'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("userId", data.userId)
                router.push('/')
            }
            else {
                console.log("problem in login")
            }
        }
        catch (error) {
            console.log("Login error: ", error)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: "500px", padding: "50px 25px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src='/cook-logo.png' alt='Logo' width={100} height={50} />
                </div>
                <Typography.Title level={3}>Login</Typography.Title>
                <InputField lableName='Email Address' placeHolder='Enter your email' value={email} setValue={setEmail} />
                <InputField lableName='Password' placeHolder='Enter your password' value={password} setValue={setPassword} />
                <Button type='primary' style={{ width: "100%", paddingTop: "20px", paddingBottom: "20px", marginTop: "20px" }} onClick={() => handleLogin()}>SIGN IN</Button>
            </Card>
        </div>
    )
}

export default LoginForm