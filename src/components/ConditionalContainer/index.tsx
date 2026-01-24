// Define the prop types using an interface
export interface ConditionalContainerProps {
  children: Node;
  condition: boolean;
  container: Function;
}

const ConditionalContainer: React.FC<React.FC<ConditionalContainerProps>> = ({
  condition,
  container,
  children,
}) => (condition ? container(children) : children);

export default ConditionalContainer;
