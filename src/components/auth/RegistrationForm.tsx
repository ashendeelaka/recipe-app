import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import InputField from '../InputField'
import { useRouter } from 'next/navigation'

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const router = useRouter()

    const handleLogin = async () => {
        try {
            const response: Response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: password
                    
                }),
            });

            const data = await response.json();
            if (response.ok) {
                router.push("/sign-in");
            } else {
                alert(data.message);
            }
        }
        catch (err) {
            console.log("Registation err: ", err)
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src='/cook-logo.png' alt='Logo' width={100} height={50} />
                </div>
                <Typography.Title level={3}>Register</Typography.Title>
                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                    <InputField lableName='First Name' value={firstName} setValue={setFirstName} placeHolder='Enter first name'></InputField>
                    <InputField lableName='Last Name' value={lastName} setValue={setLastName} placeHolder='Enter last name'></InputField>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                    <InputField lableName='Email' value={email} setValue={setEmail} placeHolder='Enter email'></InputField>
                    <InputField lableName='Phone Number' value={phone} setValue={setPhone} placeHolder='Enter phone number'></InputField>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                    <InputField lableName='Password' value={password} setValue={setPassword} placeHolder='Enter password'></InputField>
                    <InputField lableName='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} placeHolder='Confirm your password'></InputField>
                </div>
                <Button type='primary' onClick={()=> handleLogin()}>Create Account</Button>
            </Card>
        </div>
    )
}

export default RegistrationForm