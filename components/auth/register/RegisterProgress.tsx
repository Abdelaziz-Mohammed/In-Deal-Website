export default function RegisterProgress({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center mb-6 gap-4">
      <h3 className="text-black text-xl font-semibold">Create your account</h3>
      <div className="grid grid-cols-3 gap-5 w-full max-w-3/5">
        <div className={`h-1 rounded-lg ${step >= 1 ? "bg-primary" : "bg-light-gray"}`}></div>
        <div className={`h-1 rounded-lg ${step >= 2 ? "bg-primary" : "bg-light-gray"}`}></div>
        <div className={`h-1 rounded-lg ${step >= 3 ? "bg-primary" : "bg-light-gray"}`}></div>
      </div>
      <p className="text-[13px] text-light-gray text-center">Step {step} of 3</p>
    </div>
  );
}
