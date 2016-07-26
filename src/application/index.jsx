// Styles
import style from './style';

// Component
const Application = ({ children }) => (
  <div className={style.application}>
    <header className={style.header}>
    </header>

    <main className={style.body}>
      {children}
    </main>

    <footer className={style.footer}>
    </footer>
  </div>
);

// Property types
const { PropTypes } = React;
Application.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Application;
