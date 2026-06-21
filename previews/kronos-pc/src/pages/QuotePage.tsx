import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Send, ShieldCheck } from 'lucide-react'

import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { HologramPanel } from '@/components/store/HologramPanel'
import { NeonButton } from '@/components/store/NeonButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useI18n } from '@/lib/useI18n'

const contactEmail = 'cotizaciones@kronospc.com'

interface QuoteFormProps {
  initialTopic: string
}

function QuoteForm({ initialTopic }: QuoteFormProps) {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: initialTopic,
    message: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const labels = t.contact.bodyLabels
    const body = [
      `${labels.name}: ${form.name}`,
      `${labels.email}: ${form.email}`,
      `${labels.phone}: ${form.phone || labels.phoneMissing}`,
      `${labels.topic}: ${form.topic}`,
      '',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      `${t.contact.mailSubject}: ${form.topic}`
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <HologramPanel grid className="p-6 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        aria-describedby="quote-form-note"
      >
        <p id="quote-form-note" className="text-sm text-muted-foreground">
          {t.contact.note}
        </p>

        <div className="grid gap-2">
          <Label htmlFor="quote-name">{t.contact.name}</Label>
          <Input
            id="quote-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="quote-email">{t.contact.email}</Label>
            <Input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-phone">{t.contact.phone}</Label>
            <Input
              id="quote-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quote-topic">{t.contact.topic}</Label>
          <Input
            id="quote-topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quote-message">{t.contact.message}</Label>
          <Textarea
            id="quote-message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            required
            className="min-h-[150px] resize-y"
            placeholder={t.contact.placeholder}
          />
        </div>

        <NeonButton type="submit" className="w-full gap-2 sm:w-auto">
          <Send className="size-4" aria-hidden />
          {t.contact.submit}
        </NeonButton>

        {sent ? (
          <p
            className="text-sm font-medium text-neon"
            role="status"
            aria-live="polite"
          >
            {t.contact.sent}
          </p>
        ) : null}
      </form>
    </HologramPanel>
  )
}

export function QuotePage() {
  const [searchParams] = useSearchParams()
  const { t } = useI18n()
  const initialTopic = searchParams.get('topic') ?? t.contact.defaultTopic

  const infoCards = [
    { icon: Mail, title: t.contact.quotesTitle, body: contactEmail },
    { icon: MapPin, title: t.contact.workshopTitle, body: t.contact.workshopBody },
    { icon: ShieldCheck, title: t.contact.usefulTitle, body: t.contact.usefulBody },
  ] as const

  return (
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <div>
        <FuturisticSectionHeading
          level={1}
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
          align="left"
        />

        <div className="grid gap-4">
          {infoCards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-5">
              <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-neon/12 text-neon ring-1 ring-neon/30">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="font-heading text-base font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <QuoteForm key={initialTopic} initialTopic={initialTopic} />
    </div>
  )
}
