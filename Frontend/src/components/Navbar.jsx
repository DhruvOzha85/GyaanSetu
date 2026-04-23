import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const navItems = [
  { to: "/", key: "nav.home", defaultLabel: "Home" },
  { to: "/courses", key: "nav.courses", defaultLabel: "Courses" },
  { to: "/labs", key: "nav.labs", defaultLabel: "Labs" },
  { to: "/projects", key: "nav.projects", defaultLabel: "Projects" },
  { to: "/pricing", key: "nav.pricing", defaultLabel: "Pricing" },
];

export function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <nav className="sticky top-0 w-full z-50 glass-nav border-b border-outline-variant/40">
      <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-primary-container italic font-inter tracking-tight group-hover:opacity-80 transition-opacity">
              GyaanSetu
            </span>
          </Link>
          <div className="hidden md:flex gap-7 items-center">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "font-semibold tracking-tight py-1 transition-colors text-sm",
                  isActive(item.to)
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary-container",
                )}
              >
                {t(item.key) || item.defaultLabel}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-on-surface-variant font-medium text-sm">
            <Icon name="language" className="text-xl" />
            <button 
              onClick={() => setLang("en")} 
              className={cn("hover:text-primary transition-colors", lang === "en" && "text-primary font-black underline underline-offset-4")}
            >
              EN
            </button>
            <span className="opacity-20">|</span>
            <button 
              onClick={() => setLang("hi")} 
              className={cn("hover:text-primary transition-colors", lang === "hi" && "text-primary font-black underline underline-offset-4")}
            >
              हिंदी
            </button>
            <span className="opacity-20">|</span>
            <button 
              onClick={() => setLang("gu")} 
              className={cn("hover:text-primary transition-colors", lang === "gu" && "text-primary font-black underline underline-offset-4")}
            >
              ગુજ
            </button>
          </div>

          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="w-10 h-10 grid place-items-center rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-on-surface"
          >
            <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
          </button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors">
                  <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-semibold text-sm text-on-surface hidden lg:inline">
                    {user?.name.split(" ")[0]}
                  </span>
                  <Icon name="expand_more" className="text-base text-on-surface-variant" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-bold">{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard"><Icon name="dashboard" className="mr-2 text-base" />Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-courses"><Icon name="school" className="mr-2 text-base" />My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile"><Icon name="person" className="mr-2 text-base" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings"><Icon name="settings" className="mr-2 text-base" />Settings</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin"><Icon name="admin_panel_settings" className="mr-2 text-base" />Admin Console</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-error focus:text-error">
                  <Icon name="logout" className="mr-2 text-base" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="font-bold text-on-surface-variant hover:text-primary transition-colors text-sm">
                {t("nav.login")}
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 primary-gradient text-on-primary font-bold rounded-xl active:scale-95 duration-150 transition-transform text-sm"
              >
                {t("nav.signup")}
              </Link>
            </>

          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-10 h-10 grid place-items-center rounded-xl bg-surface-container-low text-on-surface"
            aria-label="Toggle theme"
          >
            <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="w-10 h-10 grid place-items-center rounded-xl bg-surface-container-low text-on-surface"
                aria-label="Open menu"
              >
                <Icon name="menu" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface-container-lowest w-72">
              <div className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl font-semibold",
                      isActive(item.to)
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "text-on-surface-variant hover:bg-surface-container-low",
                    )}
                  >
                    {t(item.key) || item.defaultLabel}
                  </Link>

                ))}
                <div className="h-px bg-outline-variant/40 my-3" />
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-on-surface">
                      Dashboard
                    </Link>
                    <Link to="/profile" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-on-surface">
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-primary">
                        Admin Console
                      </Link>
                    )}
                    <button onClick={() => { logout(); setOpen(false); }} className="px-4 py-3 rounded-xl font-semibold text-error text-left">
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-on-surface">
                      Sign in
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl primary-gradient text-on-primary font-bold text-center">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
