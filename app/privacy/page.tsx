export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f6] px-6 py-12 flex flex-col justify-between">

      <div className="flex justify-center">
        <div className="max-w-2xl w-full space-y-6 text-sm text-gray-700">

          <h1 className="text-2xl font-semibold text-[#1f7a63]">
            Privacy Policy
          </h1>

          <p>
            ESGee Earth is committed to protecting your data and privacy.
          </p>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">What we collect</h2>
            <p>
              We collect your account information (such as email) and any data you enter into the platform, including electricity and water usage records.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">How we use your data</h2>
            <p>
              Your data is used to calculate emissions, maintain your records, and improve the platform experience.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">Data sharing</h2>
            <p>
              We do not sell or share your identifiable data with third parties.
              Aggregated and anonymised insights may be used to improve the platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">Data storage</h2>
            <p>
              Your data is securely stored and only accessible to your account.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">Your control</h2>
            <p>
              You may access, export, or delete your data at any time through the platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#1f7a63]">Contact</h2>
            <p>
              For any questions, contact us at hello@esgee.earth.
            </p>
          </div>

        </div>
      </div>

      {/* ✅ FOOTER */}
      <div className="border-t mt-12 px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-3">

        <div className="text-center md:text-left">
          © 2026 ESGee Earth · ESG for everyone, everywhere; with Earth in mind
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1f7a63]"
          >
            Privacy Policy
          </a>

          <a href="mailto:hello@esgee.earth" className="hover:text-[#1f7a63]">
            hello@esgee.earth
          </a>

          <a
            href="https://www.linkedin.com/company/esgee"
            target="_blank"
            className="hover:text-[#1f7a63]"
          >
            ESGee
          </a>
        </div>

      </div>

    </main>
  );
}
