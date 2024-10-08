import type { Component } from 'solid-js'
import 'src'
import styles from './App.module.css'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input-autosize value="hallo" />
      </header>
    </div>
  )
}

export default App
