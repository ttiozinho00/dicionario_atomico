"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Beaker, Calculator, TestTube, Atom, FlaskConical, Menu, X, Zap } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Início", icon: BookOpen },
  { href: "/termos-quimicos", label: "Termos Químicos", icon: Atom },
  { href: "/formulas-basicas", label: "Fórmulas Básicas", icon: FlaskConical },
  { href: "/tabela-periodica", label: "Tabela Periódica", icon: Atom },
  { href: "/carga-nuclear-efetiva", label: "Carga Nuclear Efetiva", icon: Atom },
  { href: "/quimica-organica", label: "Química Orgânica", icon: Zap },
  { href: "/concentracao", label: "Concentração", icon: Beaker },
  { href: "/ph-poh", label: "pH e pOH", icon: TestTube },
  { href: "/estequiometria", label: "Estequiometria", icon: Calculator },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Beaker className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">QuímicaBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                  className="flex items-center space-x-2"
                  size="sm"
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    asChild
                    className="w-full justify-start space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
