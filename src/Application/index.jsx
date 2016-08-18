// Styles
import style from './style';

// Component
const Application = ({ children }) => (
  <div className={style.tag}>
    <header className={style.header}>
      Site Header
    </header>

    <main className={style.body}>
      {children}
    </main>

    <footer className={style.footer}>
      Site Footer
    </footer>
  </div>
);

// Property types
const { PropTypes } = React;
Application.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Application;
