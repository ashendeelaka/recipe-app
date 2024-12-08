import { Button, Card, Typography } from 'antd'
import React, { useState } from 'react'
import InputField from '../InputField'
import { useRouter } from 'next/navigation'
import * as Yup from "yup";


const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
    });

    const handleValidation = async () => {
        try {
            await validationSchema.validate(
                { email, password, },
                { abortEarly: false }
            );
            setErrors({});
            return true;
        } catch (err: any) {
            const validationErrors: Record<string, string> = {};
            err.inner.forEach((e: any) => {
                validationErrors[e.path] = e.message;
            });
            setErrors(validationErrors);
            return false;
        }
    };
    const handleLogin = async () => {
        const isValid = await handleValidation();
        if (!isValid) return;
        try {
            setError(null);
            setLoading(true)
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
                setError(data.message || "Invalid email or password");
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            console.log("Login error: ", error)
            setError("An error occurred during login. Please try again.");
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: "500px", padding: "50px 25px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src='/cook-logo.png' alt='Logo' width={100} height={50} />
                </div>
                <Typography.Title level={3}>Login</Typography.Title>
                <InputField error={errors.email} lableName='Email Address' placeHolder='Enter your email' value={email} setValue={setEmail} />
                <InputField error={errors.password} lableName='Password' placeHolder='Enter your password' value={password} setValue={setPassword} />
                <Button loading={loading} type='primary' style={{ backgroundColor: "#ff0066", width: "100%", paddingTop: "20px", paddingBottom: "20px", marginTop: "20px" }} onClick={() => handleLogin()}>SIGN IN</Button>
                {error && (
                    <Typography.Text type="danger" style={{ display: "block", marginTop: "10px" }}>
                        {error}
                    </Typography.Text>
                )}
                <Typography.Paragraph style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px" }}>Don't have an account? <Typography.Paragraph style={{ color: "#ff0066", cursor: "pointer" }} onClick={() => router.push('/sign-up')}>Create an account</Typography.Paragraph></Typography.Paragraph>
            </Card>
        </div>
    )
}

export default LoginForm