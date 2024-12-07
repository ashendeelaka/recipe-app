import { Input, Typography } from 'antd'
import React from 'react'

interface InputFieldProps {
    lableName?: string,
    placeHolder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}
const InputField = (props: InputFieldProps) => {
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Typography.Paragraph>{props.lableName!}</Typography.Paragraph>
            <Input placeholder={props.placeHolder} value={props.value} onChange={(e) => props.setValue(e.target.value)} style={{marginBottom:"20px"}}/>
        </div>
    )
}

export default InputField