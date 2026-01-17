import "./list-item.scss";

// Define the prop types using an interface
export interface ListItemProps {
  as: string;
  link: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  as: Element = "li",
  link = false,
  children,
}) => {
  return (
    <Element
      className={`c-list__list-item${link ? " c-list__list-item--link" : ""}`}
    >
      {children}
    </Element>
  );
};

export default ListItem;
