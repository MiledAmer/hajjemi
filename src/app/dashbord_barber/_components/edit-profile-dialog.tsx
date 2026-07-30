"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { Camera, SquarePen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Lang, editProfileDialog as strings } from "@/lib/tounsi";

export type EditableProfile = {
  name: string;
  bio: string;
  weekdaysHours: string;
  sundayHours: string;
  avatarUrl: string;
};

export function EditProfileDialog({
  lang = "fr",
  profile,
  onSave,
  onUploadAvatar,
}: {
  lang?: Lang;
  profile: EditableProfile;
  onSave: (profile: EditableProfile) => void;
  onUploadAvatar: (file: File) => Promise<string>;
}) {
  const s = strings[lang];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [weekdaysHours, setWeekdaysHours] = useState(profile.weekdaysHours);
  const [sundayHours, setSundayHours] = useState(profile.sundayHours);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setName(profile.name);
      setBio(profile.bio);
      setWeekdaysHours(profile.weekdaysHours);
      setSundayHours(profile.sundayHours);
      setAvatarUrl(profile.avatarUrl);
    }
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setIsUploadingAvatar(true);
    setAvatarError(null);
    onUploadAvatar(file)
      .then(setAvatarUrl)
      .catch((error: unknown) =>
        setAvatarError(error instanceof Error ? error.message : "Échec de l'envoi"),
      )
      .finally(() => setIsUploadingAvatar(false));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !bio || !weekdaysHours || !sundayHours || isUploadingAvatar)
      return;
    onSave({ name, bio, weekdaysHours, sundayHours, avatarUrl });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            aria-label={s.editAria}
            variant="secondary"
            size="icon"
            className="bg-surface-variant text-primary size-11 rounded-full"
          >
            <SquarePen className="size-5" />
          </Button>
        }
      />
      <DialogContent className="bg-surface-container border-none">
        <form onSubmit={handleSubmit} className="gap-stack-md flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline-md text-headline-md">
              {s.title}
            </DialogTitle>
          </DialogHeader>

          <div className="relative mx-auto mb-2 size-24">
            <Avatar className="border-primary size-24 border-2 p-1">
              <AvatarImage alt={s.changePhotoAria} src={avatarUrl} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <label
              aria-label={s.changePhotoAria}
              htmlFor="edit-profile-avatar"
              className="bg-primary text-on-primary absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full shadow-lg active:scale-90"
            >
              <Camera className="size-4" />
            </label>
            <input
              id="edit-profile-avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          {avatarError && (
            <p className="text-destructive font-label-sm text-center">
              {avatarError}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-profile-name">{s.name}</Label>
            <Input
              id="edit-profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-profile-bio">{s.bio}</Label>
            <Textarea
              id="edit-profile-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-profile-weekdays">{s.weekdays}</Label>
            <Input
              id="edit-profile-weekdays"
              value={weekdaysHours}
              onChange={(event) => setWeekdaysHours(event.target.value)}
              placeholder="09:00 - 19:00"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-profile-sunday">{s.sunday}</Label>
            <Input
              id="edit-profile-sunday"
              value={sundayHours}
              onChange={(event) => setSundayHours(event.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              {s.cancel}
            </DialogClose>
            <Button
              type="submit"
              disabled={isUploadingAvatar}
              className="font-bold"
            >
              {s.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
