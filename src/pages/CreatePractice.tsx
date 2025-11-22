import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Upload, X, FileText, FileSpreadsheet, FileImage, Presentation, File } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

interface DocumentFile {
  file: File;
  id: string;
}

export default function CreatePractice() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [publishType, setPublishType] = useState<"now" | "scheduled">("now");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewImage(null);
    setPreviewUrl(null);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setDocuments(prev => [...prev, ...newDocs]);
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'ppt':
      case 'pptx':
        return <Presentation className="w-5 h-5 text-orange-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="w-5 h-5 text-purple-500" />;
      default:
        return <File className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
      description:
        publishType === "now"
          ? "Практика успішно опублікована"
          : `Практика заплановано на ${format(scheduledDate!, "d MMMM yyyy", { locale: uk })} о ${scheduledTime}`,
    });

    setTimeout(() => navigate("/practices"), 1500);
  };

  return (
    <DashboardLayout title="Створити практику" subtitle="Додайте нову практику для експертів">
      <div className="flex-1 overflow-auto p-6">
        <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Інформація про практику</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Превью + Назва + Публікація */}
              <div className="grid grid-cols-2 gap-6">
                {/* Превью зображення */}
                <div className="space-y-2">
                  <Label>Превью практики</Label>
                  {!previewUrl ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors aspect-video flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePreviewChange}
                        className="hidden"
                        id="preview-upload"
                      />
                      <label
                        htmlFor="preview-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-sm font-medium">Завантажити превью</div>
                        <div className="text-xs text-muted-foreground">
                          JPG, PNG або WEBP
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden aspect-video bg-muted">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemovePreview}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Назва + Публікація */}
                <div className="space-y-6">
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

                  <div className="space-y-4">
                    <Label>Публікація</Label>
                    <div className="flex flex-col space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="publish"
                          value="now"
                          checked={publishType === "now"}
                          onChange={() => setPublishType("now")}
                          className="accent-primary"
                        />
                        Опублікувати зараз
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="publish"
                          value="scheduled"
                          checked={publishType === "scheduled"}
                          onChange={() => setPublishType("scheduled")}
                          className="accent-primary"
                        />
                        Запланувати випуск
                      </label>
                    </div>

                    {publishType === "scheduled" && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
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
                                {scheduledDate
                                  ? format(scheduledDate, "d MMMM yyyy", { locale: uk })
                                  : "Виберіть дату"}
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
                </div>
              </div>

              {/* Відео */}
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

              {/* Опис + Документи */}
              <div className="grid grid-cols-2 gap-6">
                {/* Опис */}
                <div className="space-y-2">
                  <Label htmlFor="description">Опис</Label>
                  <Editor
                    apiKey="0n7qq2re7xs0ytmm18toghzv3dys9xlnv4c0gauq6gxelixu"
                    value={description}
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: 'suggestededits advlist anchor autolink code charmap emoticons fullscreen help link lists preview searchreplace table',
                      toolbar: 'undo redo | suggestededits | styles fontsizeinput | bold italic | align bullist numlist | table link | code',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    }}
                    onEditorChange={(newValue) => setDescription(newValue)}
                  />
                </div>

                {/* Документи */}
                <div className="space-y-2">
                  <Label>Додаткові документи</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleDocumentsChange}
                      className="hidden"
                      id="documents-upload"
                      multiple
                    />
                    <label
                      htmlFor="documents-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-sm font-medium">Завантажити документи</div>
                      <div className="text-xs text-muted-foreground">
                        PDF, Word, Excel, PowerPoint
                      </div>
                    </label>
                  </div>

                  {/* Список документів */}
                  {documents.length > 0 && (
                    <div className="space-y-2 mt-4 max-h-[340px] overflow-y-auto">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.file.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {doc.file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(doc.file.size)}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 h-8 w-8"
                            onClick={() => handleRemoveDocument(doc.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Дії */}
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
      </div>
    </DashboardLayout>
  );
}
