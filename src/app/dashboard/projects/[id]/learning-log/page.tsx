import { Button } from "@/components/ui/button";

export default function LearningLogPage() {
  // In a real app, you would check if there are any log entries.
  const isEmpty = true;

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Learning Log</h2>
        <p className="text-muted-foreground mt-1">
          A place to document insights, store AI prompts, and keep track of what
          you've learned.
        </p>
      </div>
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-6 min-h-[400px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground">
              Your learning log for this project is empty.
            </p>
            <Button>Add New Note</Button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          {/* This is where the list of learning log entries would be rendered */}
        </div>
      )}
    </div>
  );
}
