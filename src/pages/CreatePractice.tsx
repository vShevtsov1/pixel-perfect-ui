import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Upload, Play, X } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function CreatePractice() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [publishType, setPublishType] = useState<"now" | "scheduled">("now");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !videoFile) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля та завантажте відео",
        variant: "destructive",
      });
      return;
    }

    if (publishType === "scheduled" && !scheduledDate) {
      toast({
        title: "Помилка",
        description: "Будь ласка, виберіть дату публікації",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успіх!",
      description: publishType === "now" 
        ? "Практика успішно опублікована" 
        : `Практика заплановано на ${format(scheduledDate!, "d MMMM yyyy", { locale: uk })} о ${scheduledTime}`,
    });

    setTimeout(() => navigate("/practices"), 1500);
  };

  return (
    <DashboardLayout title="Створити практику" subtitle="Додайте нову практику для експертів">
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Інформація про практику</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Назва практики</Label>
              <Input
                id="title"
                placeholder="Введіть назву практики"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Опис</Label>
              <Textarea
                id="description"
                placeholder="Опишіть практику..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <Label>Відео</Label>
              {!videoPreview ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-sm font-medium">Завантажити відео</div>
                    <div className="text-xs text-muted-foreground">
                      MP4, WebM або OGG (макс. 500MB)
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Ваш браузер не підтримує відео.
                  </video>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveVideo}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {videoFile?.name}
                  </div>
                </div>
              )}
            </div>

            {/* Publish Options */}
            <div className="space-y-4">
              <Label>Публікація</Label>
              <RadioGroup value={publishType} onValueChange={(value) => setPublishType(value as "now" | "scheduled")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now" className="font-normal cursor-pointer">
                    Опублікувати зараз
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="font-normal cursor-pointer">
                    Запланувати випуск
                  </Label>
                </div>
              </RadioGroup>

              {publishType === "scheduled" && (
                <div className="pl-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label>Дата публікації</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduledDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? (
                            format(scheduledDate, "d MMMM yyyy", { locale: uk })
                          ) : (
                            <span>Виберіть дату</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                          locale={uk}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Час публікації</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" size="lg">
                {publishType === "now" ? "Опублікувати" : "Запланувати"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/practices")}
              >
                Скасувати
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </DashboardLayout>
  );
}
