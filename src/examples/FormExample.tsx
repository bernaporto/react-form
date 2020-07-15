import React, { useState } from 'react';
import Form, { IFormData } from "../components/Form";
import Input from "../components/Input";

interface IDynamicField extends IFormData {
    name: string;
    label: string;
}

interface IDynamicFieldMap {
    [key: string]: IDynamicField;
}

export default function FormExample() {
    const [ fields, updateFields ] = useState<IDynamicFieldMap>(Object.create(null));

    const addField = (newField: IDynamicField) => {
        const { name } = newField;

        if (fields[name]) {
            alert(`Name '${name}' is already in use.`);
            return;
        }

        updateFields({
            ...fields,
            [name]: newField,
        });
    };

    const nameValidation = (value: string) => value.startsWith('name:');
    const noEmpty = (value: string) => value !== "";

    return (
        <div className="container">
            <div className="card">
                <h3>Static Form</h3>
                <p>Add a field to the form below.</p>

                <Form onSubmit={addField} validation={{
                    name: nameValidation,
                    label: noEmpty,
                }}>
                    <Input name="name" label="Field Name"/>
                    <Input name="label" label="Field Label"/>
                </Form>
            </div>

            <div className="card">
                <h3>Dyanamic Form</h3>
                <Form onSubmit={console.log} validation={noEmpty}>
                    {Object.values(fields).map(({ name, label }) => <Input key={name} name={name} label={label}/>)}
                </Form>
            </div>
        </div>
    );
}
