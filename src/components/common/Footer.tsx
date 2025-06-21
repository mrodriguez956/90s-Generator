export function Footer() {
  return (
    <>
      <footer className="mt-16 mb-8 text-center">
        <p className="text-gray-400 mb-4">Need help or found an issue?</p>
        <div className="flex justify-center gap-6">
          <a 
            href="https://github.com/michaelexile/90s-Pack-Generator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://twitter.com/michaelexile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Twitter
          </a>
        </div>
      </footer>
    </>
  );
}
