export default function Row(props) {
    return (
        <div className="flex gap-4 items-center cursor-pointer hover:bg-gray-50 p-2">
            <img className="rounded-full h-12 w-12" src={props.avatar} />
            <div className="font-medium">
                <div className="text-slate-700">
                    {props.name} {props.lastname}
                </div>
                <div className="text-sm text-slate-500">{props.email}</div>
            </div>
        </div>
    );
}
