import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { courses } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const traffic = [
  { day: "Mon", users: 1240 }, { day: "Tue", users: 1480 }, { day: "Wed", users: 1610 },
  { day: "Thu", users: 1320 }, { day: "Fri", users: 1820 }, { day: "Sat", users: 2010 }, { day: "Sun", users: 1900 },
];
const enrolments = [
  { month: "Jan", count: 320 }, { month: "Feb", count: 410 }, { month: "Mar", count: 580 },
  { month: "Apr", count: 720 }, { month: "May", count: 880 }, { month: "Jun", count: 1020 },
];

export default function AdminOverview() {
  return (
    <>
      <SEO title="Admin Overview" />
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total users", value: "12,480", icon: "group", trend: "+8.2%" },
          { label: "Active courses", value: courses.length.toString(), icon: "menu_book", trend: "+2" },
          { label: "Lab runs (24h)", value: "4,210", icon: "biotech", trend: "+12%" },
          { label: "Revenue (MTD)", value: "₹8.4L", icon: "payments", trend: "+18%" },
        ].map((k) => (
          <div key={k.label} className="bg-surface-container-lowest rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed grid place-items-center"><Icon name={k.icon} /></div>
              <span className="text-xs font-bold text-secondary">{k.trend}</span>
            </div>
            <p className="text-2xl font-black text-on-surface">{k.value}</p>
            <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h3 className="font-black text-on-surface mb-4">Daily active users</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={traffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant))" />
                <XAxis dataKey="day" stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <YAxis stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h3 className="font-black text-on-surface mb-4">New enrolments</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={enrolments}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant))" />
                <XAxis dataKey="month" stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <YAxis stroke="hsl(var(--on-surface-variant))" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary-container))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-on-surface">Recent activity</h3>
          <Link to="/admin/users" className="text-primary font-bold text-sm">Manage users →</Link>
        </div>
        <ul className="space-y-3">
          {[
            { who: "Aanya Sharma", what: "completed", target: "Pandas Fundamentals lab" },
            { who: "Karan Joshi", what: "enrolled in", target: "AWS Cloud Fundamentals" },
            { who: "Diya Kapoor", what: "earned", target: "7-day streak achievement" },
            { who: "Aditya Rao", what: "submitted", target: "E-Commerce Storefront project" },
          ].map((a, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-on-secondary-fixed grid place-items-center"><Icon name="check" /></div>
              <p className="text-on-surface"><span className="font-bold">{a.who}</span> {a.what} <span className="font-bold text-primary">{a.target}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
