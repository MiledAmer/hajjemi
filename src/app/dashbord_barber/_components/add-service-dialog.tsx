"use client";

import { type FormEvent, useState } from "react";
import { Plus } from "lucide-react";

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

export type NewService = {
  name: string;
  duration: string;
  price: string;
};

export function AddServiceDialog({
  onAdd,
}: {
  onAdd: (service: NewService) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const reset = () => {
    setName("");
    setDuration("");
    setPrice("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !duration || !price) return;
    onAdd({ name, duration, price });
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button className="bg-primary-container text-on-primary-container h-auto gap-1 rounded-lg px-4 py-2">
            <Plus className="size-4.5" />
            <span className="font-label-md">Ajouter</span>
          </Button>
        }
      />
      <DialogContent className="bg-surface-container border-none">
        <form onSubmit={handleSubmit} className="gap-stack-md flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline-md text-headline-md">
              Nouveau service
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="add-service-name">Nom</Label>
            <Input
              id="add-service-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Coupe Classique"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-service-duration">Durée</Label>
            <Input
              id="add-service-duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="30 min"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-service-price">Prix</Label>
            <Input
              id="add-service-price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="25 DT"
              required
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" className="font-bold">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
