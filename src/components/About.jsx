export default function About({ about }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-8">
          About
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
          {about.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {about.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gray-50 dark:bg-dark-card text-center"
            >
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {item.number}
              </div>
              <div className="text-sm font-semibold mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
