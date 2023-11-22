'use client';

import useForm from '@/hook/useForm';

export default function Page() {
    const users = getUser();

    const name = useForm();

    const onSubmit = () => {
        console.log('submit');
    };

    console.log(name);
    return (
        <main className="p-4 w-full md:w-1/2 md:mx-auto">
            <form className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="first-name"
                            autoComplete="given-name"
                            {...name}
                            className="block w-full rounded-md border-gray-300 border px-4 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="last-name"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-gray-300 border px-4 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-6">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-gray-300 border px-4 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </form>
            <div className="flex mb-6 items-center justify-end">
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-full md:w-1/6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {users.data.map((user) => (
                    <div
                        key={user.id}
                        className="flex gap-4 items-center cursor-pointer hover:bg-gray-50 p-2"
                    >
                        <img
                            className="rounded-full h-12 w-12"
                            src={user.avatar}
                        />
                        <div className="font-medium">
                            <div className="text-slate-700">
                                {user.first_name} {user.last_name}
                            </div>
                            <div className="text-sm text-slate-500">
                                {user.email}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

async function getUser() {
    const response = await fetch('https://reqres.in/api/users', {
        cache: 'force-cache'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}
