const Layout = (props) => {
  const { bkgColor } = props;
  const layoutStyle = {
    backgroundColor: bkgColor,
    color: bkgColor,
  };
  return (
    <div
      className="hidden fixed inset-0 flex items-center justify-center flex-col"
      style={layoutStyle}
    >
      {props.children}
    </div>
  );
};

export default Layout;
