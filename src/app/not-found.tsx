export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <p style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, color: "#5d574d", margin: 0 }}>404</p>
        <h1 style={{ fontSize: 44, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "14px 0 12px" }}>
          Diese Seite gibt es nicht mehr.
        </h1>
        <p style={{ fontSize: 18, color: "#39352e", margin: 0 }}>Alles Wichtige findest du auf der Startseite.</p>
        <p style={{ marginTop: 32 }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              background: "#d97757",
              color: "#191714",
              padding: "14px 22px",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Zur Startseite
          </a>
        </p>
      </div>
    </main>
  );
}
