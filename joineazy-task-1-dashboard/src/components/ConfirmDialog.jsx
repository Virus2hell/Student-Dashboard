export default function ConfirmDialog({ open, step, onCancel, onNext, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="card w-full max-w-md p-5">
        {step === 1 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">Confirm submission</h3>
            <p className="mb-4 text-sm text-gray-600">Have you submitted your work to the provided Drive folder?</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={onNext}>Yes, I have submitted</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">Final confirmation</h3>
            <p className="mb-4 text-sm text-gray-600">This will mark the assignment as submitted. Continue?</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-outline" onClick={onCancel}>Go back</button>
              <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
