import { Info } from "lucide-react";

export default function MovieNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-destructive bg-background">
      <Info size={48} />
      <p className="text-xl font-medium">Movie not found!</p>
    </div>
  );
}
