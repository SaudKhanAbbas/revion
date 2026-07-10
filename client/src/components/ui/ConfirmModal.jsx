import Card from "./Card";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">

      <Card className="w-full max-w-md">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-4 text-zinc-400 leading-7">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="ghost"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>

        </div>

      </Card>

    </div>
  );
}