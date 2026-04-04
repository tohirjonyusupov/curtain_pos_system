"use client";
import { MOCK_TODAY_SALES } from "@/lib/mock-data";
import { fmt } from "@/lib/format";
import { PageHeader, Table, Tr, Td } from "@/components/ui";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: 20,
    }}>
      <div style={{
        fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)",
        textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 28, fontWeight: 800, fontFamily: "var(--mono)",
        letterSpacing: "-1px", color: color ?? "var(--text)",
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const todayTotal = MOCK_TODAY_SALES.reduce((s, i) => s + i.total, 0);
  const todayItems = MOCK_TODAY_SALES.reduce((s, i) => s + i.items, 0);
  const avgCheck   = Math.round(todayTotal / MOCK_TODAY_SALES.length);

  const dateLabel = new Date().toLocaleDateString("uz-UZ", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <PageHeader title="Dashboard" subtitle={dateLabel} />

      <div style={{
        padding: "20px 28px", flex: 1, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        {/* Stat cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}>
          <StatCard
            label="Bugungi savdo"
            value={String(MOCK_TODAY_SALES.length)}
            sub="ta tranzaksiya"
            color="var(--green)"
          />
          <StatCard
            label="Jami summa"
            value={fmt(todayTotal)}
            sub="bugun"
            color="var(--accent)"
          />
          <StatCard
            label="Sotilgan mahsulot"
            value={String(todayItems)}
            sub="dona"
          />
          <StatCard
            label="O'rtacha chek"
            value={fmt(avgCheck)}
            sub="1 tranzaksiya"
          />
        </div>

        {/* Today's sales table */}
        <div>
          <div style={{
            fontSize: 13, fontWeight: 700, marginBottom: 12,
            color: "var(--text2)",
          }}>
            Bugungi savdolar
          </div>
          <Table headers={["Vaqt", "Mahsulot soni", "Summa"]}>
            {MOCK_TODAY_SALES.map((s) => (
              <Tr key={s.id}>
                <Td mono muted>{s.time}</Td>
                <Td>{s.items} dona</Td>
                <Td mono>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                    {fmt(s.total)}
                  </span>
                </Td>
              </Tr>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}
