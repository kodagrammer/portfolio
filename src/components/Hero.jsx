export default function Hero({ profile }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
          {profile.name}
        </h1>

        <p className="text-xl md:text-2xl text-gradient font-semibold mb-4">
          {profile.title}
        </p>

        <p className="whitespace-pre-line text-gray-600 dark:text-gray-300 mb-8">
          {profile.subtitle}
        </p>

        <div className="flex justify-center gap-4">
          <a
            href={`mailto:${profile.contacts.email}`}
            className="px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition"
          >
            Email
          </a>
          <a
            href={`https://${profile.contacts.github}`}
            target="_blank"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-card transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
