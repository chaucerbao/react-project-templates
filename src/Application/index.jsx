/* @flow */

// Dependencies
import React from 'react'

// Styles
import style from './style.css'

// Property types
type Props = {
  children?: any
};

// Component
const Application = ({ children }: Props) => (
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
)

export default Application
