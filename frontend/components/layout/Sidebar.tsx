"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

const NAV = [
  { href: "/pos",       label: "POS Kassa",    icon: "⊡" },
  { href: "/products",  label: "Mahsulotlar",  icon: "◫" },
  { href: "/inventory", label: "Ombor",        icon: "◧" },
  { href: "/dashboard", label: "Dashboard",    icon: "◈" },
];

export function Sidebar() {
  const pathname = usePathname();
  const cart = useCartStore((s) => s.cart);

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "20px 12px", gap: 4,
    }}>
      <div style={{ padding: "0 8px 20px" }}>
        <Link href={"/"} style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--accent)" }}>
          SavdoPOS
        </Link>
      </div>

      {NAV.map((n) => {
        const active = pathname === n.href;
        return (
          <Link key={n.href} href={n.href} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: "var(--radius-sm)",
              cursor: "pointer", fontSize: 14, fontWeight: 500,
              color: active ? "var(--accent)" : "var(--text2)",
              background: active ? "var(--surface3)" : "transparent",
              border: `1px solid ${active ? "var(--border)" : "transparent"}`,
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              {n.label}
              {n.href === "/pos" && cart.length > 0 && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 700,
                  background: "rgba(240,193,75,0.15)", color: "var(--accent)",
                  padding: "2px 7px", borderRadius: 20, fontFamily: "var(--mono)",
                }}>
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        );
      })}

      <div style={{
        marginTop: "auto", padding: "12px 8px",
        borderTop: "1px solid var(--border)",
        fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)",
      }}>
        <div>localhost:4000</div>
        <div style={{ marginTop: 2 }}>API: offline (mock)</div>
      </div>
    </aside>
  );
}
