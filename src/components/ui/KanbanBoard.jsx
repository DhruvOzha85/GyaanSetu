import React, { useState } from 'react';
import { 
  MoreVertical, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  Paperclip,
  GripVertical
} from 'lucide-react';
import { cn } from '../../utils/cn';

const KanbanBoard = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-400', textColor: 'text-slate-500', bgColor: 'bg-slate-50 dark:bg-slate-900/40' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-amber-400', textColor: 'text-amber-600', bgColor: 'bg-amber-50/50 dark:bg-amber-900/10' },
    { id: 'done', title: 'Done', color: 'bg-emerald-400', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50/50 dark:bg-emerald-900/10' },
  ];

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    
    // Add a ghost image delay
    setTimeout(() => {
      e.target.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[600px]">
      {columns.map((column) => (
        <div 
          key={column.id} 
          className={cn(
            "flex flex-col rounded-3xl p-4 transition-all duration-300 border border-transparent",
            column.bgColor,
            draggedTask && "border-dashed border-slate-200 dark:border-slate-700"
          )}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center space-x-3">
              <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", column.color)} />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white">
                {column.title}
              </h4>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Plus size={16} />
            </button>
          </div>

          {/* Task List */}
          <div className="flex-1 space-y-4">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing group animate-in fade-in slide-in-from-bottom-2 duration-300",
                    draggedTask?.id === task.id && "ring-2 ring-primary border-primary"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                      task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-500' : 
                      'bg-emerald-50 text-emerald-500'
                    )}>
                      {task.priority}
                    </span>
                    <button className="text-slate-300 hover:text-slate-500 transition-colors">
                      <GripVertical size={14} />
                    </button>
                  </div>

                  <h5 className="text-sm font-bold text-slate-800 dark:text-gray-200 mb-3 leading-tight group-hover:text-primary transition-colors">
                    {task.title}
                  </h5>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-slate-700">
                    <div className="flex -space-x-2">
                      {task.assignees?.map((avatar, i) => (
                        <img 
                          key={i} 
                          src={avatar} 
                          className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                          alt="Assignee"
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400">
                      <div className="flex items-center text-[10px] space-x-1">
                        <MessageSquare size={12} />
                        <span>{task.comments || 0}</span>
                      </div>
                      <div className="flex items-center text-[10px] space-x-1">
                        <Paperclip size={12} />
                        <span>{task.attachments || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            
            {/* Empty State in Column */}
            {tasks.filter(t => t.status === column.id).length === 0 && (
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl h-24 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drop tasks here</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
