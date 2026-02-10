export default function Experience({ workExperience }) {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-12">
          Experience
        </h2>

        <div className="space-y-10">
          {workExperience.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border"
            >
              <div className="flex justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-xl font-semibold">
                  {exp.company}
                </h3>
                <span className="text-sm text-gray-500">
                  {exp.period}
                </span>
              </div>

              <p className="font-medium mb-1">
                {exp.position}
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
