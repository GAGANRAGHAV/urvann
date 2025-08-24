export default function Stats() {
  const stats = [
    { number: "50+", label: "Plant Varieties" },
    { number: "1000+", label: "Happy Customers" },
    { number: "95%", label: "Survival Rate" },
    { number: "24/7", label: "Plant Care Support" },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-[#e2f89c]">Urvann</span>?
          </h2>
          <p className="text-xl text-[#fcfaf5]/80 max-w-2xl mx-auto">
            We're committed to bringing you the healthiest plants with expert care guidance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#e2f89c] mb-2 font-mono">{stat.number}</div>
              <div className="text-lg text-[#fcfaf5]/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
