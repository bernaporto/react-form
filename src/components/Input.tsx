import React from 'react';

export type InputType = React.ReactElement<InputProps, typeof Input>;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
};

const Input: React.FunctionComponent<InputProps> = (props) => {
    const { id, className, style, name, value, onChange, type = "text" } = props;
    const inputProps = { id, className, style, name, value, onChange, type };

    const { label, children } = props;
    
    return (
        <label>
            {label}
            
            {/* TODO: Styling needs improvement. Currently it's only applied to '<input>' */}
            <input {...inputProps}/>

            {children}
        </label>
    )
};

export default Input;
