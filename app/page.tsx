import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Atom,
  FlaskConical,
  Beaker,
  TestTube,
  Calculator,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react"

const topics = [
  {
    title: "Termos Químicos",
    description: "Aprenda os conceitos fundamentais e terminologias essenciais da química",
    icon: Atom,
    href: "/termos-quimicos",
    color: "text-red-600",
    difficulty: "Básico",
    lessons: 58,
  },
  {
    title: "Fórmulas Básicas",
    description: "Explore as fórmulas químicas fundamentais e sua aplicação",
    icon: FlaskConical,
    href: "/formulas-basicas",
    color: "text-green-600",
    difficulty: "Básico",
    lessons: 18,
  },
  {
    title: "Química Orgânica",
    description: "Mecanismos de substituição e adição nucleofílica em compostos orgânicos",
    icon: Zap,
    href: "/quimica-organica",
    color: "text-orange-600",
    difficulty: "Avançado",
    lessons: 35,
  },
  {
    title: "Concentração",
    description: "Entenda os diferentes tipos de concentração e seus cálculos",
    icon: Beaker,
    href: "/concentracao",
    color: "text-blue-600",
    difficulty: "Intermediário",
    lessons: 32,
  },
  {
    title: "pH e pOH",
    description: "Domine os conceitos de acidez, basicidade e escala de pH",
    icon: TestTube,
    href: "/ph-poh",
    color: "text-purple-600",
    difficulty: "Intermediário",
    lessons: 22,
  },
  {
    title: "Estequiometria",
    description: "Aprenda a calcular quantidades em reações químicas",
    icon: Calculator,
    href: "/estequiometria",
    color: "text-orange-600",
    difficulty: "Avançado",
    lessons: 28,
  },
  {
    title: "Carga Nuclear Efetiva",
    description: "Calcule a carga nuclear efetiva e entenda o efeito de blindagem",
    icon: Atom,
    href: "/carga-nuclear-efetiva",
    color: "text-cyan-600",
    difficulty: "Avançado",
    lessons: 15,
  },
  {
    title: "Tabela Periódica",
    description: "Explore todos os 118 elementos químicos conhecidos",
    icon: Atom,
    href: "/tabela-periodica",
    color: "text-indigo-600",
    difficulty: "Todos os níveis",
    lessons: 118,
  },
]

const stats = [
  { label: "Elementos na Tabela", value: "118", icon: Atom },
  { label: "Fórmulas Explicadas", value: "50+", icon: FlaskConical },
  { label: "Exercícios Práticos", value: "200+", icon: BookOpen },
  { label: "Estudantes Ativos", value: "10k+", icon: Users },
]

const recentUpdates = [
  {
    title: "Nova Seção: Química Orgânica",
    description: "Mecanismos de substituição e adição nucleofílica com exemplos interativos",
    date: "2024-01-20",
    badge: "Novo",
  },
  {
    title: "Nova Calculadora de pH",
    description: "Ferramenta interativa para cálculos de pH e pOH",
    date: "2024-01-15",
    badge: "Atualização",
  },
  {
    title: "Elementos 113-118 Adicionados",
    description: "Tabela periódica atualizada com elementos superpesados",
    date: "2024-01-10",
    badge: "Conteúdo",
  },
]

const testimonials = [
  {
    name: "Maria Silva",
    role: "Estudante de Química",
    content: "Este blog me ajudou muito a entender conceitos complexos de forma simples e prática!",
    rating: 5,
  },
  {
    name: "Prof. João Santos",
    role: "Professor de Química",
    content: "Excelente recurso para complementar minhas aulas. Recomendo para todos os meus alunos.",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Vestibulanda",
    content: "A seção de química orgânica foi fundamental para entender os mecanismos de reação!",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Beaker className="h-16 w-16 sm:h-20 sm:w-20 text-blue-600" />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Novo!
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4">QuímicaBlog</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Seu guia completo para aprender química de forma simples e didática. Explore conceitos fundamentais,
            fórmulas e cálculos essenciais com ferramentas interativas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/termos-quimicos">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/tabela-periodica">Explorar Tabela Periódica</Link>
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tópicos Principais */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Explore Nossos Tópicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {topics.map((topic) => {
              const Icon = topic.icon
              return (
                <Card key={topic.href} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${topic.color}`} />
                      <Badge variant="secondary" className="text-xs">
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{topic.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs sm:text-sm text-gray-500">{topic.lessons} lições</span>
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    </div>
                    <Button asChild className="w-full">
                      <Link href={topic.href} className="flex items-center justify-center space-x-2">
                        <span>Explorar</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Atualizações Recentes */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Atualizações Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {recentUpdates.map((update, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        update.badge === "Novo" ? "default" : update.badge === "Atualização" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {update.badge}
                    </Badge>
                    <span className="text-xs text-gray-500">{update.date}</span>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{update.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-sm sm:text-base">{update.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Depoimentos */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            O que nossos usuários dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic text-sm sm:text-base">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seção Educativa */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Por que estudar química?</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                A química está presente em todos os aspectos da nossa vida, desde os alimentos que consumimos até os
                medicamentos que nos curam. Compreender os princípios químicos nos ajuda a entender melhor o mundo ao
                nosso redor e tomar decisões mais informadas sobre nossa saúde, meio ambiente e tecnologia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded">
                  <FlaskConical className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold text-sm sm:text-base">Experimentos</div>
                  <div className="text-xs sm:text-sm text-gray-600">Práticos e seguros</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded">
                  <Calculator className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold text-sm sm:text-base">Cálculos</div>
                  <div className="text-xs sm:text-sm text-gray-600">Passo a passo</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 sm:p-8 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Recursos Disponíveis</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Calculadoras interativas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Exercícios resolvidos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Tabela periódica interativa</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Fórmulas e conceitos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Pronto para começar sua jornada na química?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Junte-se a milhares de estudantes que já estão aprendendo química de forma eficiente e divertida.
          </p>
          <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
            <Link href="/termos-quimicos">
              Começar Agora - É Grátis!
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
