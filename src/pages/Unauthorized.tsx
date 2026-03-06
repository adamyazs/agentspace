export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="bg-card border border-border rounded-md p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-lg text-muted-foreground mb-6">You do not have access to this page.</p>
        <a href="/" className="text-primary underline text-sm">Go to Dashboard</a>
      </div>
    </div>
  );
}
