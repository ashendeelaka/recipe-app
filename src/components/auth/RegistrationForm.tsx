import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import InputField from '../InputField'
import { useRouter } from 'next/navigation'
import * as Yup from "yup";

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d+$/, "Phone number must contain only digits")
            .required("Phone number is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    });
    const handleValidation = async () => {
        try {
            await validationSchema.validate(
                { firstName, lastName, email, phone, password, confirmPassword },
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
                    <InputField error={errors.firstName} lableName='First Name' value={firstName} setValue={setFirstName} placeHolder='Enter first name'></InputField>
                    <InputField error={errors.lableName}  lableName='Last Name' value={lastName} setValue={setLastName} placeHolder='Enter last name'></InputField>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                    <InputField error={errors.email}  lableName='Email' value={email} setValue={setEmail} placeHolder='Enter email'></InputField>
                    <InputField error={errors.phone}  lableName='Phone Number' value={phone} setValue={setPhone} placeHolder='Enter phone number'></InputField>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                    <InputField error={errors.password}  lableName='Password' value={password} setValue={setPassword} placeHolder='Enter password'></InputField>
                    <InputField error={errors.confirmPassword}  lableName='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} placeHolder='Confirm your password'></InputField>
                </div>
                <Button type='primary' onClick={() => handleLogin()}>Create Account</Button>
            </Card>
        </div>
    )
}

export default RegistrationForm