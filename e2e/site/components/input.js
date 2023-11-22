const col = {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6'
};

export default function Input(props) {
    // prettier-ignore
    const {
        spaces = 3,
        disabled = false
    } = props

    return (
        <div className={`${col[spaces]}`}>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="mt-2">
                <input
                    autoComplete={props.autoComplete}
                    className="block w-full rounded-md border-gray-300 border px-4 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                    disabled={disabled}
                    name={props.name}
                    onChange={props.onChange}
                    type={props.type}
                    value={props.value}
                />
            </div>
        </div>
    );
}
