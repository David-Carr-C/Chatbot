'use client';

import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Agrega el nuevo mensaje al array de mensajes
      setMessages([...messages, message]);
      // Limpia el textarea
      setMessage("");

      // Preparar el payload para enviar
      const payload = {
        model: "llama3:8b",
        messages: [
          { role: "system", content: "Por favor, responde exclusivamente sobre temas fiscales relacionados con la facturación electrónica conforme a la ley mexicana, incluyendo la Ley del Impuesto sobre la Renta (LISR), la Ley del Impuesto al Valor Agregado (IVA), y los artículos pertinentes de la miscelánea fiscal. No respondas a preguntas sobre otros temas o áreas que no estén relacionadas con la legislación fiscal mexicana y la facturación electrónica. Si se te pregunta sobre algo fuera de este ámbito, indica claramente que no puedes proporcionar información sobre ese tema." },
          { role: "user", content: message }
        ],
      };

      fetch("http://74.208.11.91:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer AAAAC3NzaC1lZDI1NTE5AAAAICVDpgFb00uWjUzfK9CxWHyysaT6C+5URsl7bMcB9bm8",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.text()) // Leer la respuesta como texto
        .then((text) => {
          // Usar una expresión regular para extraer el contenido de los mensajes
          const messagestmp = text.match(/"content":"(.*?)"/g);
          if (messagestmp) {
            // Extraer solo los contenidos y unirlos
            const content = messagestmp.map((msg) => msg.replace(/"content":"(.*?)"/, "$1")).join("");

            // Verificar si la respuesta contiene "done":true
            if (text.includes('"done":true')) {
              // Agrega el contenido al array de mensajes
              setMessages([...messages, content]);
            } else {
              // Remover los mensajes que tengan "content" del arreglo
              const filteredMessages = messages.filter((msg) => !msg.includes("content"));
              setMessages([...filteredMessages, content]);
            }
          } else {
            console.log("No messages found");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-3 bg-background rounded-lg mb-2 bg-slate-500">
            {msg}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Message;
