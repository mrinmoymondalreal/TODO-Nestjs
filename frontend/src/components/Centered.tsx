const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      {children}
    </div>
  );
};

export default Centered;
