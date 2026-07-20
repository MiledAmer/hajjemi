"use client";

import { type FormEvent, useState } from "react";
import { Pencil } from "lucide-react";

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

export type EditableService = {
  name: string;
  duration: string;
  price: string;
};

export function EditServiceDialog({
  service,
  onSave,
}: {
  service: EditableService;
  onSave: (service: EditableService) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(service.name);
  const [duration, setDuration] = useState(service.duration);
  const [price, setPrice] = useState(service.price);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setName(service.name);
      setDuration(service.duration);
      setPrice(service.price);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !duration || !price) return;
    onSave({ name, duration, price });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            aria-label="Modifier"
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:text-primary size-10"
          >
            <Pencil className="size-5" />
          </Button>
        }
      />
      <DialogContent className="bg-surface-container border-none">
        <form onSubmit={handleSubmit} className="gap-stack-md flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline-md text-headline-md">
              Modifier le service
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`edit-service-name-${service.name}`}>Nom</Label>
            <Input
              id={`edit-service-name-${service.name}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`edit-service-duration-${service.name}`}>
              Durée
            </Label>
            <Input
              id={`edit-service-duration-${service.name}`}
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`edit-service-price-${service.name}`}>Prix</Label>
            <Input
              id={`edit-service-price-${service.name}`}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" className="font-bold">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
