interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => (
  <header className="flex sticky top-0 z-50 w-full">
    <nav className="flex w-full h-14 bg-primary justify-between py-2 px-4">{children}</nav>
  </header>
);

export default Header;
