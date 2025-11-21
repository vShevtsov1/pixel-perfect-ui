import { NavLink } from "@/components/NavLink";
import { Briefcase, LayoutDashboard, Calendar, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: LayoutDashboard, label: "Дошка", path: "/dashboard" },
  { icon: Calendar, label: "Графік", path: "/schedule" },
  { icon: Users, label: "Практики", path: "/practices" },
  { icon: Settings, label: "Налаштування", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">ExpertsHub</span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 m-4 bg-primary rounded-xl text-primary-foreground">
        <h3 className="font-semibold mb-1">Реєстр подій</h3>
        <p className="text-sm opacity-90 mb-3">7 нових подій</p>
        <button className="w-full bg-white text-primary py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
          Переглянути
        </button>
      </div>
    </aside>
  );
};
