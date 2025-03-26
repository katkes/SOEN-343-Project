export default function Badge({
  label,
  className,
  display,
}: {
  label: string;
  className?: string;
  display?: string;
  width?: string;
}) {
  return (
    <div
      className={`badge ${className ? className : ''} flex justify-center items-center`}
      style={{ display: display, width: 'fit-content' }}
    >
      <div className="font-bold text-[#273266]">{label}</div>
    </div>
  );
}
