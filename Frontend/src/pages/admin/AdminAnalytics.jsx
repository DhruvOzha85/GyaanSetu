import { SEO } from "@/components/SEO";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const byCategory = [
  { name: "Data Science", value: 38 },
  { name: "Web Dev", value: 27 },
  { name: "Cloud", value: 18 },
  { name: "AI / ML", value: 12 },
  { name: "Other", value: 5 },
];
const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--tertiary))", "hsl(var(--primary-container))", "hsl(var(--outline))"];

const labRuns = [
  { day: "Mon", runs: 412 }, { day: "Tue", runs: 480 }, { day: "Wed", runs: 521 },
  { day: "Thu", runs: 432 }, { day: "Fri", runs: 588 }, { day: "Sat", runs: 612 }, { day: "Sun", runs: 590 },
];

export default function AdminAnalytics() {
  return (
    <>
      <SEO title="Admin · Analytics" />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h3 className="font-black text-on-surface mb-4">Enrolments by category</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={100} paddingAngle={4}>
                  {byCategory.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h3 className="font-black text-on-surface mb-4">Daily lab runs</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={labRuns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant))" />
                <XAxis dataKey="day" stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <YAxis stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <Tooltip />
                <Bar dataKey="runs" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
