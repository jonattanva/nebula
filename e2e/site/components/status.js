const bg = {
    completed: 'bg-green-400',
    error: 'bg-red-400',
    pending: 'bg-yellow-400'
};

export default function Status(props) {
    // prettier-ignore
    const {
        status = 'pending'
    } = props

    return (
        <div className={`p-1.5 rounded text-slate-700 ${bg[status]}`}>
            {props.children}
        </div>
    );
}
