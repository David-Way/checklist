import "./list.scss";

// Define the prop types using an interface
export interface ListProps {
  as: string;
  children: Node;
}

const List: React.FC<ListProps> = ({ as: Element = "ul", children }) => {
  return <Element className="c-list">{children}</Element>;
};

export default List;
