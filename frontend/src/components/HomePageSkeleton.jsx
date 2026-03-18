export const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero section skeleton */}
      <div className="min-h-[100vh] bg-gradient-to-b from-background to-background/80 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-48 h-4 bg-muted rounded mx-auto" />
          <div className="w-80 h-16 bg-muted rounded mx-auto mt-8" />
          <div className="w-96 h-4 bg-muted rounded mx-auto mt-6" />
        </div>
      </div>
      
      {/* Sections skeleton */}
      <div className="space-y-32 py-24">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-gradient-to-r from-muted to-muted/50 rounded" />
        ))}
      </div>
    </div>
  );
};
