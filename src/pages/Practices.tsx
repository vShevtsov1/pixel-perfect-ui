import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Star, TrendingUp, Plus, Clock, Calendar } from "lucide-react";

const practices = [
  {
    id: 1,
    title: "Ранкова медитація",
    category: "Медитація",
    participants: 45,
    rating: 4.8,
    icon: "🧘",
    color: "bg-orange-50 text-primary",
  },
  {
    id: 2,
    title: "Дихальні техніки",
    category: "Дихання",
    participants: 32,
    rating: 4.9,
    icon: "💨",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 3,
    title: "Вечірнє розслаблення",
    category: "Релаксація",
    participants: 28,
    rating: 4.7,
    icon: "🌙",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 4,
    title: "Енергія та фокус",
    category: "Концентрація",
    participants: 51,
    rating: 4.9,
    icon: "⚡",
    color: "bg-yellow-50 text-yellow-600",
  },
];

const selectedPractice = {
  title: "Ранкова медитація",
  description: "Практика усвідомленості для початку дня з ясністю та спокоєм",
  date: "15 жовтня",
  duration: "30 хвилин",
  type: "Медитація",
  level: "Початковий",
  participants: 127,
  rating: 4.8,
  effectiveness: 89,
  instructions: [
    "Знайдіть спокійне місце і зручно сядьте",
    "Закрийте очі і почніть глибоко дихати",
    "Зосередьтеся на відчуттях свого тіла і дихання",
  ],
  stats: {
    totalSessions: 127,
    avgRating: 4.8,
    effectiveness: 89,
  },
};

const Practices = () => {
  return (
    <DashboardLayout title="Управління практиками" subtitle="Ваші програми та сесії">
      <div className="space-y-6">
        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Шукати..."
              className="pl-10 h-11"
            />
          </div>
          <Button size="lg" className="h-11 px-6 font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Створити практику
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Practice List */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Всі практики</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {practices.map((practice) => (
                <div
                  key={practice.id}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${
                    practice.id === 1 ? "bg-primary/5 border-2 border-primary" : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${practice.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {practice.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{practice.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {practice.participants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {practice.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Practice Details */}
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">{selectedPractice.title}</CardTitle>
                  <p className="text-muted-foreground">{selectedPractice.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Редагувати</Button>
                  <Button>Додати сесію</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Дата</div>
                  <div className="font-semibold">{selectedPractice.date}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Тривалість</div>
                  <div className="font-semibold">{selectedPractice.duration}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Тип</div>
                  <div className="font-semibold">{selectedPractice.type}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Рівень</div>
                  <div className="font-semibold">{selectedPractice.level}</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Інструкції</h3>
                <div className="space-y-2">
                  {selectedPractice.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground pt-0.5">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Статистика</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-orange-50 border-none">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{selectedPractice.stats.totalSessions}</div>
                      <div className="text-sm text-primary/70 mt-1">Учасників</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-none">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">{selectedPractice.stats.avgRating}</div>
                      <div className="text-sm text-blue-600/70 mt-1">Рейтинг</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-none">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">{selectedPractice.stats.effectiveness}%</div>
                      <div className="text-sm text-green-600/70 mt-1">Ефективність</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Button */}
              <Button size="lg" className="w-full h-12 text-base font-semibold">
                Розпочати практику
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Practices;
