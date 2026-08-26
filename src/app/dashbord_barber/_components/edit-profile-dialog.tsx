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
import { isValidEmail } from "@/lib/email";
import { personNameError } from "@/lib/name";

// Monday-first so the editor reads like a calendar week.
export const DAY_KEYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;
export type DayKey = (typeof DAY_KEYS)[number];
export type DayHours = { open: boolean; start: string; end: string };

export type EditableProfile = {
  name: string;
  bio: string;
  avatarUrl: string;
  phone: string;
  email: string;
  days: Record<DayKey, DayHours>;
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
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [days, setDays] = useState<Record<DayKey, DayHours>>(profile.days);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setName(profile.name);
      setBio(profile.bio);
      setPhone(profile.phone);
      setEmail(profile.email);
      setDays(profile.days);
      setAvatarUrl(profile.avatarUrl);
      setNameError(null);
      setPhoneError(null);
      setEmailError(null);
    }
  };

  const setDay = (key: DayKey, patch: Partial<DayHours>) =>
    setDays((cur) => ({ ...cur, [key]: { ...cur[key], ...patch } }));

  const validPhone = (v: string) => /^\d{8}$/.test(v.trim());
  const validEmail = isValidEmail;

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
    const nameBad = personNameError(name);
    const phoneBad = !validPhone(phone);
    const emailBad = !validEmail(email);
    setNameError(nameBad);
    setPhoneError(phoneBad ? "Le numéro doit contenir 8 chiffres." : null);
    setEmailError(emailBad ? "Adresse e-mail invalide." : null);
    if (nameBad || !bio || phoneBad || emailBad || isUploadingAvatar) return;
    // An open day with end <= start is invalid — skip save so the server
    // doesn't reject it silently.
    const badRange = DAY_KEYS.some(
      (k) => days[k].open && days[k].end <= days[k].start,
    );
    if (badRange) return;
    onSave({ name, bio, avatarUrl, phone, email, days });
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
      <DialogContent className="bg-surface-container max-h-[90vh] overflow-y-auto border-none">
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
              aria-invalid={!!nameError}
              onChange={(event) => setName(event.target.value)}
              onBlur={(e) => setNameError(personNameError(e.target.value))}
              required
            />
            {nameError && (
              <p className="text-destructive font-label-sm">{nameError}</p>
            )}
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
            <Label htmlFor="edit-profile-phone">{s.phone}</Label>
            <Input
              id="edit-profile-phone"
              type="tel"
              value={phone}
              aria-invalid={!!phoneError}
              onChange={(event) => setPhone(event.target.value)}
              onBlur={(e) =>
                setPhoneError(
                  validPhone(e.target.value)
                    ? null
                    : "Le numéro doit contenir 8 chiffres.",
                )
              }
              placeholder="22123456"
              required
            />
            {phoneError && (
              <p className="text-destructive font-label-sm">{phoneError}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-profile-email">{s.email}</Label>
            <Input
              id="edit-profile-email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={!!emailError}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={(e) =>
                setEmailError(
                  validEmail(e.target.value) ? null : "Adresse e-mail invalide.",
                )
              }
              placeholder="vous@exemple.com"
              required
            />
            {emailError && (
              <p className="text-destructive font-label-sm">{emailError}</p>
            )}
          </div>

          {/* Per-day hours: any day can be a day off, any times. */}
          <div className="flex flex-col gap-2">
            <Label>{s.hoursTitle}</Label>
            <div className="flex flex-col gap-2">
              {DAY_KEYS.map((key, i) => {
                const d = days[key];
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-sm">{s.days[i]}</span>
                    <input
                      type="checkbox"
                      aria-label={s.open}
                      checked={d.open}
                      onChange={(e) => setDay(key, { open: e.target.checked })}
                      className="accent-primary size-4"
                    />
                    {d.open ? (
                      <div className="flex flex-1 items-center gap-1">
                        <Input
                          type="time"
                          value={d.start}
                          onChange={(e) => setDay(key, { start: e.target.value })}
                          className="flex-1"
                        />
                        <span className="text-on-surface-variant">-</span>
                        <Input
                          type="time"
                          value={d.end}
                          onChange={(e) => setDay(key, { end: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    ) : (
                      <span className="text-on-surface-variant flex-1 text-sm">
                        {s.closed}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
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
