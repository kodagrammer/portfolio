export default function DarkModeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 px-3 py-2 rounded bg-gray-200 dark:bg-dark-card"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}

