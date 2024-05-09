function Header({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 flex h-16 items-center gap-2 border-b bg-white px-2">
      <h1 className="text-lg font-semibold">
        {title}
      </h1>
      <div className="flex-1" />
      {actions}
    </div>
  );
}

export default Header;
