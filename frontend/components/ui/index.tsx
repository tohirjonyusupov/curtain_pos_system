import { CSSProperties, ReactNode } from "react";

// ── Button ────────────────────────────────────────────────────────────────────
type BtnVariant = "accent" | "ghost" | "green" | "danger";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
}

const btnStyles: Record<BtnVariant, CSSProperties> = {
  accent:  { background: "var(--accent)", color: "#0d0f14" },
  ghost:   { background: "var(--surface3)", color: "var(--text)", border: "1px solid var(--border)" },
  green:   { background: "var(--green)", color: "#fff" },
  danger:  { background: "transparent", color: "var(--red)", border: "none" },
};

export function Button({ children, onClick, variant = "ghost", disabled, fullWidth, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "9px 16px", borderRadius: "var(--radius-sm)",
        fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        border: "none", fontFamily: "var(--sans)", transition: "all 0.15s",
        opacity: disabled ? 0.3 : 1,
        width: fullWidth ? "100%" : undefined,
        ...btnStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  autoFocus?: boolean;
}

export function Input({ value, onChange, placeholder, type = "text", icon, autoFocus }: InputProps) {
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "var(--text3)", pointerEvents: "none", display: "flex",
        }}>
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          color: "var(--text)", fontFamily: "var(--sans)", fontSize: 14,
          padding: icon ? "10px 14px 10px 38px" : "10px 14px",
          borderRadius: "var(--radius-sm)", width: "100%", outline: "none",
        }}
      />
    </div>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────
type TagColor = "yellow" | "green" | "red" | "blue";
const tagColors: Record<TagColor, CSSProperties> = {
  yellow: { background: "rgba(240,193,75,0.15)",  color: "var(--accent)" },
  green:  { background: "rgba(34,197,94,0.15)",   color: "var(--green)"  },
  red:    { background: "rgba(239,68,68,0.15)",   color: "var(--red)"    },
  blue:   { background: "rgba(59,130,246,0.15)",  color: "var(--blue)"   },
};

export function Tag({ children, color = "blue" }: { children: ReactNode; color?: TagColor }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
      fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.5px",
      ...tagColors[color],
    }}>
      {children}
    </span>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ title, children, footer, onClose }: {
  title: string; children: ReactNode; footer?: ReactNode; onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, backdropFilter: "blur(4px)",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--surface)", border: "1px solid var(--border2)",
        borderRadius: 14, width: 420, overflow: "hidden",
      }}>
        <div style={{
          padding: "18px 20px", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          <Button variant="danger" onClick={onClose} style={{ padding: 4 }}>✕</Button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {children}
        </div>
        {footer && (
          <div style={{
            padding: "16px 20px", borderTop: "1px solid var(--border)",
            display: "flex", gap: 10, justifyContent: "flex-end",
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ── FormField ─────────────────────────────────────────────────────────────────
export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)" }}>{label}</label>
      {children}
    </div>
  );
}

// ── PageHeader ────────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: ReactNode;
}) {
  return (
    <div style={{
      padding: "20px 28px 0",
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function Table({ headers, children, empty }: {
  headers: string[]; children: ReactNode; empty?: boolean;
}) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "12px 16px", textAlign: "left",
                fontSize: 11, fontWeight: 600, color: "var(--text3)",
                textTransform: "uppercase", letterSpacing: "0.5px",
                fontFamily: "var(--mono)", borderBottom: "1px solid var(--border)",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty && <div style={{ padding: 40, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>Hech narsa topilmadi</div>}
    </div>
  );
}

export function Tr({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      style={{
        borderBottom: "1px solid var(--border)",
        cursor: onClick ? "pointer" : undefined,
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </tr>
  );
}

export function Td({ children, mono, muted }: { children: ReactNode; mono?: boolean; muted?: boolean }) {
  return (
    <td style={{
      padding: "12px 16px", fontSize: 13,
      fontFamily: mono ? "var(--mono)" : undefined,
      color: muted ? "var(--text3)" : undefined,
    }}>
      {children}
    </td>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
export function Toast({ message, type = "success" }: { message: string; type?: "success" | "error" }) {
  const isError = type === "error";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: isError ? "var(--red)" : "var(--green)", color: "#fff",
      padding: "12px 18px", borderRadius: "var(--radius-sm)",
      fontSize: 13, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 8,
      animation: "slideIn 0.2s ease", zIndex: 999,
    }}>
      <style>{`@keyframes slideIn { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      {isError ? "✕" : "✓"} {message}
    </div>
  );
}
