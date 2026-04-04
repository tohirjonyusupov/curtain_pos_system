"use client";
import Link from "next/link";

const features = [
  {
    icon: "⊡",
    title: "POS Kassa",
    desc: "Tez qidirish, savat, va bir tugma bilan sotuv. Parda turi, rang, o'lcham bo'yicha filtr.",
  },
  {
    icon: "◫",
    title: "Mahsulot bazasi",
    desc: "Parda turlari: jalüzi, rimskiy, rulonli, klassik. Narx va kategoriya boshqaruvi.",
  },
  {
    icon: "◧",
    title: "Ombor hisobi",
    desc: "Metr bo'yicha kirim-chiqim. Qoldiq ogohlantirishi. Har bir mato alohida kuzatuv.",
  },
  {
    icon: "◈",
    title: "Savdo hisoboti",
    desc: "Kunlik, haftalik chek statistikasi. Eng ko'p sotilgan pardalar va ranglar.",
  },
];

const stats = [
  { value: "2 min", label: "o'rnatish vaqti" },
  { value: "0", label: "qo'shimcha to'lov" },
  { value: "∞", label: "mahsulot soni" },
  { value: "24/7", label: "ishlash vaqti" },
];

const curtainTypes = [
  "Jalüzi pardalar",
  "Rimskiy pardalar",
  "Rulonli shtorlar",
  "Klassik pardalar",
  "Tyul va organza",
  "Karniizlar va aksessuarlar",
];

export default function MainPage() {
  return (
    <div style={{
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--sans)",
      minHeight: "100vh",
    }}>
      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,15,20,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 18, fontWeight: 800,
            color: "var(--accent)", letterSpacing: "-0.5px",
          }}>SavdoPOS</span>
          <span style={{
            fontSize: 10, fontFamily: "var(--mono)",
            color: "var(--text3)", paddingLeft: 10,
            borderLeft: "1px solid var(--border)",
          }}>parda do'konlari uchun</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/pos" style={{
            padding: "8px 20px",
            background: "var(--accent)", color: "#0d0f14",
            borderRadius: "var(--radius-sm)",
            fontSize: 13, fontWeight: 700,
            textDecoration: "none",
          }}>
            Tizimga kirish →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "100px 48px 80px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20, padding: "5px 14px",
          marginBottom: 32,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--green)", display: "inline-block",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
          }} />
          <span style={{ fontSize: 12, color: "var(--text2)", fontFamily: "var(--mono)" }}>
            MVP · v1.0 · Hozir bepul
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-2px",
          marginBottom: 24,
          maxWidth: 800,
        }}>
          Parda do'koni uchun{" "}
          <span style={{
            color: "var(--accent)",
            borderBottom: "3px solid var(--accent2)",
            paddingBottom: 2,
          }}>zamonaviy kassa</span>
        </h1>

        <p style={{
          fontSize: 18, color: "var(--text2)", lineHeight: 1.6,
          maxWidth: 560, marginBottom: 40,
        }}>
          Jalüzi, rimskiy, rulonli va klassik pardalar — hammasini
          bir tizimda boshqaring. Sotuv, ombor va hisobot.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/pos" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px",
            background: "var(--accent)", color: "#0d0f14",
            borderRadius: "var(--radius)",
            fontSize: 15, fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}>
            Kassani ochish ⊡
          </Link>
          <Link href="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px",
            background: "var(--surface)", color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            fontSize: 15, fontWeight: 600,
            textDecoration: "none",
          }}>
            Dashboard ko'rish
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 0,
          marginTop: 72,
          borderTop: "1px solid var(--border)",
          paddingTop: 40,
          flexWrap: "wrap",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 120,
              paddingRight: 32,
              borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div style={{
                fontSize: 32, fontWeight: 800,
                fontFamily: "var(--mono)", color: "var(--accent)",
                letterSpacing: "-1px",
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURTAIN TYPES TICKER ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        padding: "14px 0",
      }}>
        <div style={{
          display: "flex", gap: 0,
          animation: "ticker 18s linear infinite",
        }}>
          {[...curtainTypes, ...curtainTypes, ...curtainTypes].map((t, i) => (
            <div key={i} style={{
              whiteSpace: "nowrap",
              padding: "0 32px",
              fontSize: 13, fontWeight: 600,
              color: i % 2 === 0 ? "var(--text2)" : "var(--accent)",
              fontFamily: "var(--mono)",
              borderRight: "1px solid var(--border)",
            }}>
              {t}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
        `}</style>
      </div>

      {/* ── FEATURES ── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "80px 48px",
      }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12,
          }}>
            FUNKSIYALAR
          </div>
          <h2 style={{
            fontSize: 36, fontWeight: 800, letterSpacing: "-1px",
          }}>
            Kerakli hamma narsa — ortiqchasi yo'q
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 1,
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          background: "var(--border)",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "var(--surface)",
              padding: 28,
              transition: "background 0.15s",
              cursor: "default",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
            >
              <div style={{
                fontSize: 24, marginBottom: 16,
                color: "var(--accent)",
              }}>{f.icon}</div>
              <div style={{
                fontSize: 15, fontWeight: 700, marginBottom: 10,
              }}>{f.title}</div>
              <div style={{
                fontSize: 13, color: "var(--text2)", lineHeight: 1.6,
              }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "80px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}>
          <div>
            <div style={{
              fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)",
              textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12,
            }}>QANDAY ISHLAYDI</div>
            <h2 style={{
              fontSize: 32, fontWeight: 800, letterSpacing: "-1px", marginBottom: 24,
            }}>
              Mijoz keldi —<br />
              <span style={{ color: "var(--accent)" }}>3 qadamda sotuv</span>
            </h2>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
              Mahsulot qidiring, savatga soling, "Sotish" tugmasini bosing.
              Ombor avtomatik yangilanadi. Hisobot shu zahoti ko'rinadi.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { n: "01", title: "Mahsulot tanlang", sub: "Tur, rang yoki nom bo'yicha qidiring" },
              { n: "02", title: "Miqdorni kiriting", sub: "Metr yoki dona hisobida — tizim hisoblaydi" },
              { n: "03", title: "Sotishni tasdiqlang", sub: "Ombor va hisobot avtomatik yangilanadi" },
            ].map((step) => (
              <div key={step.n} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "16px 20px",
              }}>
                <span style={{
                  fontSize: 11, fontFamily: "var(--mono)", fontWeight: 600,
                  color: "var(--accent)", minWidth: 24, paddingTop: 2,
                }}>{step.n}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>
                    {step.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "100px 48px",
        textAlign: "center",
      }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "64px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative grid lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.4,
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <h2 style={{
              fontSize: 40, fontWeight: 800,
              letterSpacing: "-1.5px", marginBottom: 16,
            }}>
              Hoziroq boshlang
            </h2>
            <p style={{
              fontSize: 16, color: "var(--text2)",
              marginBottom: 36, lineHeight: 1.6,
            }}>
              O'rnatish shart emas. Brauzerda ishlaydi.
            </p>
            <Link href="/pos" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 36px",
              background: "var(--accent)", color: "#0d0f14",
              borderRadius: "var(--radius)",
              fontSize: 16, fontWeight: 800,
              textDecoration: "none",
            }}>
              Kassani ochish →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "24px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: 14, fontWeight: 800,
          color: "var(--accent)", letterSpacing: "-0.5px",
        }}>SavdoPOS</span>
        <span style={{
          fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)",
        }}>
          © 2025 · Parda do'konlari uchun
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "POS", href: "/pos" },
            { label: "Mahsulotlar", href: "/products" },
            { label: "Ombor", href: "/inventory" },
            { label: "Dashboard", href: "/dashboard" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 12, color: "var(--text3)",
              textDecoration: "none",
            }}>{l.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
