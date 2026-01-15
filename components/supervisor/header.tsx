interface HeaderProps {
  heading: string;
  subtitle: string;
}

export default function Header({ heading, subtitle }: HeaderProps) {
  return (
    <div>
      <h1 className="text-heading-1">{heading}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
