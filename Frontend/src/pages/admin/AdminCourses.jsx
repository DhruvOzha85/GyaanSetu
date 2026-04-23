import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courseService } from "@/services/courseService";

export default function AdminCourses() {
  const { data: courses } = useQuery({ queryKey: ["courses"], queryFn: courseService.list });
  return (
    <>
      <SEO title="Admin · Courses" />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black text-on-surface">Course catalog</h2>
        <Link to="/admin/courses/new" className="px-4 py-2.5 primary-gradient text-on-primary rounded-xl font-bold flex items-center gap-2 text-sm">
          <Icon name="add" className="text-base" /> New course
        </Link>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-on-surface-variant text-xs uppercase tracking-widest font-bold">
              <th className="py-3">Course</th>
              <th>Category</th>
              <th>Students</th>
              <th>Rating</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((c) => (
              <tr key={c.id} className="border-t border-outline-variant/30">
                <td className="py-3 flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="w-12 h-9 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-on-surface">{c.title}</p>
                    <p className="text-xs text-on-surface-variant">{c.instructor.name}</p>
                  </div>
                </td>
                <td className="text-on-surface-variant">{c.category}</td>
                <td className="text-on-surface-variant">{c.studentsEnrolled.toLocaleString()}</td>
                <td className="text-on-surface font-bold">{c.rating} ★</td>
                <td className="text-right space-x-2">
                  <Link to={`/admin/courses/${c.id}/edit`} className="px-3 py-1.5 bg-surface-container-low rounded-lg font-bold text-xs">Edit</Link>
                  <button className="px-3 py-1.5 bg-error-container text-on-error-container rounded-lg font-bold text-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
