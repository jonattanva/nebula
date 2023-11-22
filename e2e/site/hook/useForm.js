import { useState } from 'react';

export default function (initial = '') {
    const [value, setValue] = useState(initial);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onClear = () => {
        setValue('');
    };

    return {
        onChange,
        onClear,
        value
    };
}
