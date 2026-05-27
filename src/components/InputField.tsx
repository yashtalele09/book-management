interface InputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const InputField = ({
    label,
    name,
    value,
    onChange,
}: InputProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                {label}
            </label>

            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-3 rounded-2xl bg-transparent text-white placeholder-slate-500 outline-none transition"
                style={{
                    background:
                        "rgba(255,255,255,0.04)",
                    border:
                        "1px solid rgba(34,211,238,0.18)",
                }}
            />
        </div>
    );
};

export default InputField;