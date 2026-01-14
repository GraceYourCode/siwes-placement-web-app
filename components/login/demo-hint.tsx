export default function DemoHint() {
  return (
    <div className="card-elevated p-4 space-y-2 mt-6">
      <p className="text-caption font-medium text-muted-foreground">
        Demo Access
      </p>
      <p className="text-caption text-muted-foreground">
        Use any email containing: <span className="font-medium">student</span>,{" "}
        <span className="font-medium">supervisor</span>,{" "}
        <span className="font-medium">company</span>, or{" "}
        <span className="font-medium">admin</span>
      </p>
    </div>
  );
}
