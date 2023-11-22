'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import Row from '@/components/row';
import useForm from '@/hook/useForm';
import { useState } from 'react';

export default function Page() {
    const name = useForm();
    const email = useForm();
    const lastname = useForm();

    const [values, setValues] = useState([]);
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const onClear = () => {
        name.onClear();
        email.onClear();
        lastname.onClear();
    };

    const onSubmit = async () => {
        const value = {
            name: name.value,
            lastname: lastname.value,
            email: email.value
        };

        const validation = Object.keys(value)
            .filter((key) => value[key] === '')
            .map((key) => `The ${key} is required`);

        setMessage(validation);
        if (validation.length >= 1) {
            return;
        }

        setLoading(true);
        const request = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(value)
        });

        const response = await request.json();
        setValues((previous) => [
            {
                id: response.id,
                avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y',
                ...value
            },
            ...previous
        ]);

        onClear();
        setLoading(false);
    };

    return (
        <main className="p-4 w-full sm:w-9/12 sm:mx-auto">
            {message.length > 0 && (
                <div className="p-4 rounded-md bg-red-50 mb-4">
                    <h3 className="text-base text-red-800">{`There were ${message.length} errors with your submission`}</h3>
                    <div className="text-red-700 text-sm mt-2">
                        <ul className="list-disc pl-5" role="list">
                            {message.map((message, index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <form className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <Input
                    autoComplete="given-name"
                    disabled={loading}
                    label="First name"
                    name="first-name"
                    type="text"
                    {...name}
                />
                <Input
                    autoComplete="family-name"
                    disabled={loading}
                    label="Last name"
                    name="last-name"
                    type="text"
                    {...lastname}
                />
                <Input
                    autoComplete="email"
                    disabled={loading}
                    label="Email address"
                    name="email"
                    spaces={6}
                    type="email"
                    {...email}
                />
            </form>

            <div className="flex mb-6 items-center justify-end">
                <Button loading={loading} onClick={onSubmit}>
                    Save
                </Button>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {values.length === 0 && (
                    <div className="flex items-center justify-center text-slate-700">
                        No data
                    </div>
                )}
                {values.map((user) => (
                    <Row
                        avatar={user.avatar}
                        email={user.email}
                        key={user.id}
                        lastname={user.lastname}
                        name={user.name}
                    />
                ))}
            </div>
        </main>
    );
}
