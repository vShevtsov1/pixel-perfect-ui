import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Sparkles, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    icon: Calendar,
    value: "24",
    label: "Події цього місяця",
    bgColor: "bg-orange-50",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    value: "156",
    label: "Активних учасників",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingUp,
    value: "8",
    label: "Нові заявки",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const upcomingEvents = [
  {
    id: 1,
    date: "15",
    month: "ЛИП",
    title: "Інтерв'ю з кандидатом",
    time: "10:00 - 11:30",
    location: "Онлайн",
    type: "Співбесіда",
    color: "bg-primary",
  },
  {
    id: 2,
    date: "18",
    month: "ЛИП",
    title: "Тренінг з лідерства",
    time: "14:00 - 16:00",
    location: "Офіс, зала 2",
    type: "Тренінг",
    color: "bg-blue-500",
  },
  {
    id: 3,
    date: "20",
    month: "ЛИП",
    title: "Консультація з DDI3",
    time: "09:00 - 10:00",
    location: "Онлайн",
    type: "Консультація",
    color: "bg-accent",
  },
  {
    id: 4,
    date: "22",
    month: "ЛИП",
    title: "Вебінар з експертів",
    time: "16:00 - 17:30",
    location: "Zoom",
    type: "Вебінар",
    color: "bg-purple-500",
  },
];

const recentActivities = [
  {
    title: "Тимур отримав роль",
    description: "В консультації Софіївськім освітнім...",
    time: "2 години тому",
    icon: "👤",
  },
  {
    title: "Кваліф для з аналітики DD",
    description: "Створено новий аналіз",
    time: "4 години тому",
    icon: "📊",
  },
  {
    title: "Нове нешкодить",
    description: "Запропонований нове",
    time: "Вчора",
    icon: "🎯",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout title="Панель управління" subtitle="Огляд вашої діяльності">
      <div className="space-y-6">
        {/* Quick Action Button */}
        <div>
          <Button size="lg" className="h-12 px-8 text-base font-semibold">
            <Sparkles className="w-5 h-5 mr-2" />
            Додати консультацію
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                    +12%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Майбутні події</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                Переглянути всі
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`${event.color} text-white rounded-xl p-3 text-center min-w-[60px]`}>
                    <div className="text-2xl font-bold">{event.date}</div>
                    <div className="text-xs opacity-90">{event.month}</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar & Recent Activities */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Календар</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <button className="p-1 hover:bg-muted rounded">‹</button>
                    <span className="font-medium">Липень 2025</span>
                    <button className="p-1 hover:bg-muted rounded">›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
                      <div key={day} className="py-2 text-muted-foreground font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2;
                      const isToday = day === 15;
                      const hasEvent = [15, 18, 20, 22].includes(day);
                      return (
                        <div
                          key={i}
                          className={`py-2 rounded-lg text-sm ${
                            day < 1 || day > 31
                              ? "text-muted-foreground/30"
                              : isToday
                              ? "bg-primary text-primary-foreground font-bold"
                              : hasEvent
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted"
                          } ${day >= 1 && day <= 31 ? "cursor-pointer" : ""}`}
                        >
                          {day >= 1 && day <= 31 ? day : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Останні активності</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1 space-y-0.5">
                      <div className="font-medium text-sm text-foreground">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
