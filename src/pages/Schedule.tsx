import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar } from "lucide-react";
import { useState } from "react";

const monthNames = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];

const events = [
  {
    id: 1,
    date: 3,
    title: "Team Meeting",
    time: "10:00 - 11:00",
    attendees: 5,
    location: "Онлайн",
    color: "bg-blue-500",
  },
  {
    id: 2,
    date: 11,
    title: "Workshop",
    time: "14:00 - 16:00",
    attendees: 12,
    location: "Офіс",
    color: "bg-accent",
  },
  {
    id: 3,
    date: 18,
    title: "Consult Session",
    time: "09:00 - 10:30",
    attendees: 3,
    location: "Онлайн",
    color: "bg-primary",
  },
];

const Schedule = () => {
  const [currentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedEvent, setSelectedEvent] = useState(events[2]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  return (
    <DashboardLayout title="Графік експерта" subtitle="Керуйте своїм розкладом">
      <div className="space-y-6">
        {/* Header with Add Event Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
              Тиждень
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Місяць
            </Badge>
          </div>
          <Button size="lg" className="h-11 px-6 font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Додати подію
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <CardTitle className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const hasEvent = events.find(e => e.date === day);
                    const isToday = day === 18;
                    
                    return (
                      <div
                        key={day}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium cursor-pointer transition-colors
                          ${isToday 
                            ? "bg-primary text-primary-foreground" 
                            : hasEvent 
                            ? "bg-primary/10 text-primary hover:bg-primary/20" 
                            : "hover:bg-muted"
                          }`}
                        onClick={() => hasEvent && setSelectedEvent(hasEvent)}
                      >
                        <span>{day}</span>
                        {hasEvent && !isToday && (
                          <div className={`w-1 h-1 ${hasEvent.color} rounded-full mt-1`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Деталі події</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedEvent ? (
                <>
                  <div className="space-y-3">
                    <div className={`w-full h-24 ${selectedEvent.color} rounded-xl flex items-center justify-center text-white`}>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{selectedEvent.date}</div>
                        <div className="text-sm opacity-90">{monthNames[currentDate.getMonth()]}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground">{selectedEvent.title}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{selectedEvent.attendees} учасників</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm">Опис</h4>
                    <p className="text-sm text-muted-foreground">
                      Консультаційна сесія з питань професійного розвитку та кар'єрного планування для учасників програми.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 font-semibold">Редагувати</Button>
                    <Button variant="outline" className="flex-1">Видалити</Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Виберіть подію для перегляду деталей</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
