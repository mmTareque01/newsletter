import Wrapper from "@/components/Wrapper";

// app/changelog/page.tsx
export default function ChangelogPage() {
  return (
 <Wrapper>
     <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">📢 Changelog & Updates</h1>

      <p className="mb-10 text-gray-600">
        Stay informed with the latest features, improvements, and bug fixes in our newsletter platform.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-2">🚀 April 2025</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>✨ Launched our brand new Newsletter Builder</li>
            <li>🧠 AI-assisted subject line suggestions</li>
            <li>📈 Analytics dashboard (open/click rates)</li>
            <li>🔒 Improved email verification for better deliverability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📦 March 2025</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>👥 Team collaboration support added</li>
            <li>🛠️ Fixed image resizing issue in the editor</li>
            <li>📤 Export contacts as CSV feature</li>
            <li>🎨 New UI design system integration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🛠 February 2025</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>📝 Rich text support in newsletter editor</li>
            <li>✅ Improved onboarding experience</li>
            <li>🐛 Fixed unsubscribe link bug</li>
            <li>🌐 Added language support for Japanese and Spanish</li>
          </ul>
        </section>
      </div>

      <p className="text-sm text-gray-500 mt-10">
        Last updated: April 17, 2025
      </p>
    </main>
 </Wrapper>
  );
}
