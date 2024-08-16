import './layout.css';

const Layout = (props) => {
  const { bkgColor } = props;
  const layoutStyle = {
    backgroundColor: bkgColor,
    color: bkgColor,
  };
  return (
    <div className="layout" style={layoutStyle}>
      {props.children}
    </div>
  );
};

export default Layout;
