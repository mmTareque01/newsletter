import Wrapper from "@/components/Wrapper";

// app/contact/page.tsx
export default function ContactPage() {
    return (
     <Wrapper>
         <main className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6">Contact & Support</h1>
  
        <p className="mb-4">
          We’re here to help! Whether you have a question, need support, or want to give
          feedback, you can reach out using the methods below.
        </p>
  
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">📬 Email Support</h2>
            <p>
              Email us at
              <a
                href="mailto:support@yournewsletterapp.com"
                className="text-blue-600 underline ml-1"
              >
                support@yournewsletterapp.com
              </a>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold">💬 Live Chat</h2>
            <p>Chat with us live from 9AM to 6PM UTC, Monday to Friday.</p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold">📚 Help Center</h2>
            <p>
              Browse our knowledge base at
              <a href="/help" className="text-blue-600 underline ml-1">/help</a>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold">🐦 Twitter</h2>
            <p>
              Reach out to us on
              <a
                href="https://twitter.com/yourapp"
                className="text-blue-600 underline ml-1"
              >
                @yourapp
              </a>
            </p>
          </div>
        </div>
  
        <p className="mt-10 text-sm text-gray-500">
          We aim to respond to all messages within 24 hours.
        </p>
      </main>
     </Wrapper>
    );
  }