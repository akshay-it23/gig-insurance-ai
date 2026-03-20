import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import { Shield, TrendingUp, Clock, Zap, Users, ChevronRight } from 'lucide-react'

const Landing = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">🎉 Join 10,000+ Gig Workers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Insurance for the <span className="text-blue-200">Gig Economy</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              GigShield provides flexible, affordable insurance coverage designed specifically for freelancers, delivery drivers, and gig workers. Get protected in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                    <ChevronRight size={20} className="ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ChevronRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <p className="text-blue-200 text-sm">✓ No credit card required • ✓ Instant approval • ✓ Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose GigShield?</h2>
            <p className="text-xl text-gray-600">Everything you need to protect your gig work income</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                Accident, liability, medical, and equipment damage coverage tailored for gig workers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Risk Scoring</h3>
              <p className="text-gray-600">
                Personalized insurance rates based on your unique work profile and risk assessment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-orange-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Insured in Minutes</h3>
              <p className="text-gray-600">
                Quick signup, instant approval, and immediate coverage. No paperwork hassle.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Coverage</h3>
              <p className="text-gray-600">
                Scale your coverage up or down based on your work schedule and income.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Dedicated support team available round the clock to help you file claims.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Claims</h3>
              <p className="text-gray-600">
                File and track claims directly through our app. Get decisions in days, not weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the right coverage for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">For occasional workers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <Button variant="outline" className="w-full mb-6">
                Choose Plan
              </Button>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>✓ $50K accident coverage</li>
                <li>✓ $100K liability protection</li>
                <li>✓ Mobile app access</li>
                <li>✓ Basic support</li>
              </ul>
            </div>

            {/* Plan 2 - Popular */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8 hover:shadow-lg transition transform hover:scale-105">
              <div className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="text-blue-100 mb-4">For active gig workers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-blue-100">/month</span>
              </div>
              <Button className="w-full mb-6 bg-white text-blue-600 hover:bg-blue-50">
                Choose Plan
              </Button>
              <ul className="space-y-3 text-sm">
                <li>✓ $150K accident coverage</li>
                <li>✓ $500K liability protection</li>
                <li>✓ Medical coverage up to $10K</li>
                <li>✓ Equipment protection</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            {/* Plan 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">For professional contractors</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <Button className="w-full mb-6">
                Choose Plan
              </Button>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>✓ $300K accident coverage</li>
                <li>✓ $1M liability protection</li>
                <li>✓ Medical coverage up to $25K</li>
                <li>✓ Full equipment protection</li>
                <li>✓ Income loss protection</li>
                <li>✓ 24/7 Premium support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Protected?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of gig workers who trust GigShield to protect their income and assets.
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="outline">
                Get Started Now
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Landing
