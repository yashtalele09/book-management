const InfoItem = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <div
        className="rounded-2xl p-5"
        style={{
            background: "rgba(255,255,255,.02)",
            border: "1px solid rgba(255,255,255,.06)",
        }}
    >
        <p className="text-slate-500 text-sm mb-1">
            {label}
        </p>

        <p className="text-white font-medium">
            {value}
        </p>
    </div>
);

export default InfoItem;