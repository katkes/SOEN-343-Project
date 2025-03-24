export default function Badge({ label, className }: { label: string; className?: string }) {
    return (
      <div className={`badge ${className ? className : ''}`}>
        <div className="font-bold text-[#273266]">{label}</div>
      </div>
    );
  }
  