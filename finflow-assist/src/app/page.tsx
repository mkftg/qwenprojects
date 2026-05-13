import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="text-2xl font-bold gradient-text">
              FinFlow Assist
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-700 hover:text-primary-600 transition-colors">
                Services
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-primary-600 transition-colors">
                Testimonials
              </Link>
              <Link href="#faq" className="text-gray-700 hover:text-primary-600 transition-colors">
                FAQ
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="#eligibility" className="btn-primary">
                Check Eligibility
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="heading-xl mb-6">
                Smart Loan{' '}
                <span className="gradient-text">Eligibility Review</span>{' '}
                & Documentation Assistance
              </h1>
              <p className="text-lg text-muted mb-8">
                Get expert assistance for your loan application. We review your eligibility, 
                help with documentation, and match you with the right banks and NBFCs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="#eligibility" className="btn-primary text-center">
                  Check Your Eligibility Free
                </Link>
                <Link href="#services" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>500+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trusted Partners</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up hidden md:block">
              <div className="glass rounded-2xl p-8 shadow-soft-lg">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Quick Eligibility Check</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Monthly Income"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      type="text"
                      placeholder="CIBIL Score (if known)"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                      <option value="" className="text-gray-800">Select Employment Type</option>
                      <option value="salaried" className="text-gray-800">Salaried</option>
                      <option value="self-employed" className="text-gray-800">Self-Employed</option>
                      <option value="business" className="text-gray-800">Business Owner</option>
                    </select>
                    <button type="submit" className="w-full bg-white text-primary-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                      Check Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-4 bg-yellow-50 border-y border-yellow-200">
        <div className="container-custom">
          <p className="text-center text-sm text-yellow-800">
            ⚠️ <strong>Disclaimer:</strong> We are not a bank or NBFC. Loan approval depends on lender's eligibility criteria.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Services</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Comprehensive loan assistance services to help you navigate the application process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '📋',
                title: 'Eligibility Review',
                description: 'Expert assessment of your loan eligibility based on multiple parameters',
              },
              {
                icon: '📄',
                title: 'Documentation Help',
                description: 'Complete assistance with document preparation and verification',
              },
              {
                icon: '🏦',
                title: 'Bank Matching',
                description: 'Connect with suitable banks and NBFCs based on your profile',
              },
              {
                icon: '💼',
                title: 'Consultation',
                description: 'One-on-one consultation with loan experts',
              },
            ].map((service, index) => (
              <div key={index} className="card-hover p-6 rounded-xl border border-gray-200 hover:border-primary-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="heading-sm mb-2">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Choose the plan that suits your needs. No hidden charges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="card-hover p-8 rounded-2xl border-2 border-gray-200 bg-white">
              <h3 className="heading-md mb-2">Basic Review</h3>
              <div className="text-4xl font-bold text-primary-600 mb-6">₹199</div>
              <ul className="space-y-4 mb-8">
                {[
                  'Eligibility Assessment',
                  'Document Checklist',
                  'Email Support',
                  '48-hour Turnaround',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup?plan=basic" className="btn-outline w-full block text-center">
                Get Started
              </Link>
            </div>
            
            {/* Priority Plan */}
            <div className="card-hover p-8 rounded-2xl border-2 border-primary-500 bg-white relative shadow-soft-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="heading-md mb-2">Priority Review</h3>
              <div className="text-4xl font-bold text-primary-600 mb-6">₹399</div>
              <ul className="space-y-4 mb-8">
                {[
                  'Everything in Basic',
                  'Priority Processing',
                  'WhatsApp Support',
                  '24-hour Turnaround',
                  'Direct Consultant Access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup?plan=priority" className="btn-primary w-full block text-center">
                Get Started
              </Link>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted mt-8">
            The fee is for <strong>Eligibility Review & Documentation Assistance</strong>. This does not guarantee loan approval.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Our Customers Say</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Real experiences from real customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                location: 'Mumbai',
                rating: 5,
                comment: 'Excellent service! The team helped me understand my eligibility and guided me through the entire documentation process.',
              },
              {
                name: 'Priya Sharma',
                location: 'Delhi',
                rating: 5,
                comment: 'Very professional and transparent. They clearly explained that they are not a bank but provided great assistance.',
              },
              {
                name: 'Amit Patel',
                location: 'Ahmedabad',
                rating: 4,
                comment: 'Quick response and helpful guidance. Got matched with the right bank for my business loan needs.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="card-hover p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'Are you a bank or NBFC?',
                answer: 'No, we are not a bank or NBFC. We provide loan eligibility review, documentation assistance, and consultation services only.',
              },
              {
                question: 'Do you guarantee loan approval?',
                answer: 'No, we do not guarantee loan approval. Loan approval depends entirely on the lender\'s eligibility criteria and decision.',
              },
              {
                question: 'What documents are required?',
                answer: 'Common documents include PAN card, Aadhaar card, income proof, bank statements, and business documents (if applicable). We provide a personalized checklist after review.',
              },
              {
                question: 'How long does the review take?',
                answer: 'Basic review takes 48 hours, while priority review is completed within 24 hours.',
              },
              {
                question: 'Is the fee refundable?',
                answer: 'The fee is for our review and assistance services. Please refer to our refund policy for specific conditions.',
              },
            ].map((faq, index) => (
              <details key={index} className="card-hover group p-6 rounded-xl bg-white border border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer font-semibold">
                  {faq.question}
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Check Your Eligibility?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get started with your loan eligibility review today. It's quick, easy, and completely secure.
          </p>
          <Link href="#eligibility" className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block">
            Start Free Eligibility Check
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">FinFlow Assist</h3>
              <p className="text-sm">
                Loan eligibility review and documentation assistance services.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: support@finflowassist.com</li>
                <li>Phone: +91-XXXXXXXXXX</li>
                <li>Hours: 9 AM - 6 PM IST</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} FinFlow Assist. All rights reserved.
            </p>
            <p className="text-center text-xs mt-4 text-gray-500">
              Disclaimer: We are not a bank or NBFC. Loan approval depends on lender's terms and conditions.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
