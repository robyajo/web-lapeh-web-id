type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-380 w-full mx-auto px-4 2xl ">{children}</div>;
};

export default Container;
