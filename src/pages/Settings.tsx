import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Settings = () => {
  return (
    <DashboardLayout title="Налаштування" subtitle="Керуйте вашим профілем та параметрами">
      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Профіль</CardTitle>
            <CardDescription>Управління вашими особистими даними</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  ОП
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">Змінити фото</Button>
                <p className="text-sm text-muted-foreground">JPG, GIF або PNG. Макс. 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ім'я</Label>
                <Input id="firstName" defaultValue="Олена" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Прізвище</Label>
                <Input id="lastName" defaultValue="Петренко" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="olena.petrenko@mail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" defaultValue="+380 95 123 4567" />
              </div>
            </div>

            <Button className="w-full sm:w-auto">Зберегти зміни</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Сповіщення</CardTitle>
            <CardDescription>Налаштуйте, як ви хочете отримувати сповіщення</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email сповіщення</div>
                <div className="text-sm text-muted-foreground">Отримувати сповіщення на email</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Push сповіщення</div>
                <div className="text-sm text-muted-foreground">Отримувати push-повідомлення</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">SMS сповіщення</div>
                <div className="text-sm text-muted-foreground">Отримувати SMS про події</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Безпека</CardTitle>
            <CardDescription>Керуйте безпекою вашого облікового запису</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Поточний пароль</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Новий пароль</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button className="w-full sm:w-auto">Змінити пароль</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
