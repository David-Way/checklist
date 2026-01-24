import classNames from "classnames";
import "./header.scss";

// Define the prop types using an interface
export interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <header className={classNames(["c-header", className])}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
