"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface Testimonial {
  id: number | string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
  logo?: ReactNode
}

export function AnimatedTestimonials({
  title = "Was unsere Kunden sagen",
  subtitle = "Überzeugen Sie sich selbst von unserem Service und unserer Qualität.",
  badgeText = "Verifizierte Bewertungen",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Bekannt aus",
  className,
  logo,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} id="testimonials" className={cn("py-24 overflow-hidden bg-gradient-to-b from-brand-dark via-brand-dark to-black relative", className)}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.02] rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.02] rounded-full blur-[100px] transform -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        {logo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:justify-start items-center gap-2 opacity-50 mb-8"
          >
            {logo}
          </motion.div>
        )}
        
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  <Star className="mr-1 h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                {title.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? <span key={i} className="text-brand-orange">{word}</span> : <span key={i}>{word} </span>
                )}
              </h2>

              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">{subtitle}</p>

              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-10 bg-brand-orange shadow-[0_0_10px_rgba(255,87,34,0.5)]" : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div variants={itemVariants} className="relative h-full md:mr-10 min-h-[350px] md:min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0, pointerEvents: activeIndex === index ? 'auto' : 'none' }}
              >
                <div className="bg-brand-gray/50 border border-gray-800 shadow-xl rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>
                  
                  <div className="mb-6 flex gap-1 relative z-10">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-orange text-brand-orange" />
                      ))}
                  </div>

                  <div className="relative mb-6 flex-1 z-10">
                    <Quote className="absolute -top-2 -left-2 h-10 w-10 text-brand-orange/10 rotate-180" />
                    <p className="relative z-10 text-lg md:text-xl font-medium leading-relaxed text-gray-200">"{testimonial.content}"</p>
                  </div>

                  <Separator className="my-4 bg-gray-700/50 relative z-10" />

                  <div className="flex items-center gap-4 relative z-10">
                    <Avatar className="h-14 w-14 border-2 border-brand-orange/30">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                      <AvatarFallback className="bg-brand-dark text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-brand-orange uppercase tracking-wider font-semibold">
                        {testimonial.role} {testimonial.company && `- ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-brand-orange/5 border border-brand-orange/10 -z-10"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-brand-orange/5 border border-brand-orange/10 -z-10"></div>
          </motion.div>
        </motion.div>

        {/* Logo cloud */}
        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-24 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-2xl font-bold text-gray-700">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
