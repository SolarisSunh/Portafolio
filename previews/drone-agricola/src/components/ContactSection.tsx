import { useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  name: string;
  email: string;
  crop: string;
  message: string;
};

export default function ContactSection(): ReactElement {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    crop: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aquí solo mostramos por consola; en prod se enviaría a un backend/servicio
    // Datos capturados del formulario
    // eslint-disable-next-line no-console
    console.log("Contacto AgroDrone:", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="contacto" className="py-20 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight">Contacto / Solicitar demo</h2>
        <p className="text-slate-600 mt-2">
          Cuéntanos sobre tu cultivo y te contactaremos para una demo personalizada.
        </p>
        <Card className="mt-6 p-6">
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de cultivo</Label>
              <Select value={data.crop} onValueChange={(v) => handleChange("crop", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un cultivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maiz">Maíz</SelectItem>
                  <SelectItem value="soja">Soja</SelectItem>
                  <SelectItem value="trigo">Trigo</SelectItem>
                  <SelectItem value="hortalizas">Hortalizas</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                value={data.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Cuéntanos brevemente tu caso"
                className="min-h-[120px]"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <Button type="submit" size="lg">
                Enviar
              </Button>
              {submitted && (
                <span className="text-sm text-green-700">¡Mensaje enviado! Te contactaremos muy pronto.</span>
              )}
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}


