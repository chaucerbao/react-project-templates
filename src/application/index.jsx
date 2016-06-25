// Styles
import './style';

// Component
const Application = ({ children }) => (
  <div className="site">
    <header className="site__header"></header>
    <main className="site__body">{children}</main>
    <footer className="site__footer"></footer>
  </div>
);

// Property types
const { PropTypes } = React;
Application.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Application;
