import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--sans)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 48px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vmin",
        height: "60vmin",
        background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
        opacity: 0.04,
        filter: "blur(40px)",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        opacity: 0.3,
        pointerEvents: "none",
      }} />

      <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{
          fontSize: "clamp(80px, 15vw, 160px)",
          fontWeight: 900,
          fontFamily: "var(--mono)",
          color: "var(--accent)",
          lineHeight: 1,
          letterSpacing: "-4px",
          marginBottom: 16,
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 800,
          letterSpacing: "-1px",
          marginBottom: 20
        }}>
          Sahifa topilmadi
        </h2>
        
        <p style={{
          fontSize: 16,
          color: "var(--text2)",
          maxWidth: 420,
          marginBottom: 40,
          lineHeight: 1.6
        }}>
          Kechirasiz, siz qidirgan sahifa mavjud emas, o'chirilgan yoki manzili o'zgargan bo'lishi mumkin.
        </p>
        
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px",
            background: "var(--accent)", color: "#0d0f14",
            borderRadius: "var(--radius)",
            fontSize: 15, fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}>
            ← Bosh sahifaga
          </Link>
          <Link href="/pos" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px",
            background: "var(--surface)", color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            fontSize: 15, fontWeight: 600,
            textDecoration: "none",
          }}>
            Kassani ochish ⊡
          </Link>
        </div>
      </div>
    </div>
  );
}