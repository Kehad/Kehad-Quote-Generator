interface LayoutProps {
  bkgColor: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { bkgColor } = props;
  const layoutStyle = {
    backgroundColor: bkgColor,
    color: bkgColor,
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center flex-col"
      style={layoutStyle}
    >
      {props.children}
    </div>
  );
};

export default Layout;
