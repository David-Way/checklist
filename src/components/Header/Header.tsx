import './header.scss';

// Define the prop types using an interface
export interface HeaderProps {
  title: string,
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

export default Header;
