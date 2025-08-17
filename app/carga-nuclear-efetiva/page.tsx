"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  Atom,
  Eye,
  BookOpen,
  AlertCircle,
  BarChart3,
  Award,
  RefreshCw,
  ArrowRight,
  TestTube,
  Beaker,
} from "lucide-react"

// Configurações eletrônicas expandidas (até 4º período)
const electronConfigs = {
  H: { config: "1s¹", orbitals: { "1s": 1 }, name: "Hidrogênio", atomicNumber: 1 },
  He: { config: "1s²", orbitals: { "1s": 2 }, name: "Hélio", atomicNumber: 2 },
  Li: { config: "1s² 2s¹", orbitals: { "1s": 2, "2s": 1 }, name: "Lítio", atomicNumber: 3 },
  Be: { config: "1s² 2s²", orbitals: { "1s": 2, "2s": 2 }, name: "Berílio", atomicNumber: 4 },
  B: { config: "1s² 2s² 2p¹", orbitals: { "1s": 2, "2s": 2, "2p": 1 }, name: "Boro", atomicNumber: 5 },
  C: { config: "1s² 2s² 2p²", orbitals: { "1s": 2, "2s": 2, "2p": 2 }, name: "Carbono", atomicNumber: 6 },
  N: { config: "1s² 2s² 2p³", orbitals: { "1s": 2, "2s": 2, "2p": 3 }, name: "Nitrogênio", atomicNumber: 7 },
  O: { config: "1s² 2s² 2p⁴", orbitals: { "1s": 2, "2s": 2, "2p": 4 }, name: "Oxigênio", atomicNumber: 8 },
  F: { config: "1s² 2s² 2p⁵", orbitals: { "1s": 2, "2s": 2, "2p": 5 }, name: "Flúor", atomicNumber: 9 },
  Ne: { config: "1s² 2s² 2p⁶", orbitals: { "1s": 2, "2s": 2, "2p": 6 }, name: "Neônio", atomicNumber: 10 },
  Na: { config: "1s² 2s² 2p⁶ 3s¹", orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 1 }, name: "Sódio", atomicNumber: 11 },
  Mg: {
    config: "1s² 2s² 2p⁶ 3s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2 },
    name: "Magnésio",
    atomicNumber: 12,
  },
  Al: {
    config: "1s² 2s² 2p⁶ 3s² 3p¹",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 1 },
    name: "Alumínio",
    atomicNumber: 13,
  },
  Si: {
    config: "1s² 2s² 2p⁶ 3s² 3p²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 2 },
    name: "Silício",
    atomicNumber: 14,
  },
  P: {
    config: "1s² 2s² 2p⁶ 3s² 3p³",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 3 },
    name: "Fósforo",
    atomicNumber: 15,
  },
  S: {
    config: "1s² 2s² 2p⁶ 3s² 3p⁴",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 4 },
    name: "Enxofre",
    atomicNumber: 16,
  },
  Cl: {
    config: "1s² 2s² 2p⁶ 3s² 3p⁵",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 5 },
    name: "Cloro",
    atomicNumber: 17,
  },
  Ar: {
    config: "1s² 2s² 2p⁶ 3s² 3p⁶",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6 },
    name: "Argônio",
    atomicNumber: 18,
  },
  K: {
    config: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "4s": 1 },
    name: "Potássio",
    atomicNumber: 19,
  },
  Ca: {
    config: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "4s": 2 },
    name: "Cálcio",
    atomicNumber: 20,
  },
  Sc: {
    config: "[Ar] 3d¹ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 1, "4s": 2 },
    name: "Escândio",
    atomicNumber: 21,
  },
  Ti: {
    config: "[Ar] 3d² 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 2, "4s": 2 },
    name: "Titânio",
    atomicNumber: 22,
  },
  V: {
    config: "[Ar] 3d³ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 3, "4s": 2 },
    name: "Vanádio",
    atomicNumber: 23,
  },
  Cr: {
    config: "[Ar] 3d⁵ 4s¹",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 5, "4s": 1 },
    name: "Cromo",
    atomicNumber: 24,
  },
  Mn: {
    config: "[Ar] 3d⁵ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 5, "4s": 2 },
    name: "Manganês",
    atomicNumber: 25,
  },
  Fe: {
    config: "[Ar] 3d⁶ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 6, "4s": 2 },
    name: "Ferro",
    atomicNumber: 26,
  },
  Co: {
    config: "[Ar] 3d⁷ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 7, "4s": 2 },
    name: "Cobalto",
    atomicNumber: 27,
  },
  Ni: {
    config: "[Ar] 3d⁸ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 8, "4s": 2 },
    name: "Níquel",
    atomicNumber: 28,
  },
  Cu: {
    config: "[Ar] 3d¹⁰ 4s¹",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 10, "4s": 1 },
    name: "Cobre",
    atomicNumber: 29,
  },
  Zn: {
    config: "[Ar] 3d¹⁰ 4s²",
    orbitals: { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6, "3d": 10, "4s": 2 },
    name: "Zinco",
    atomicNumber: 30,
  },
}

// Questões do quiz
const quizQuestions = [
  {
    question: "O que representa a carga nuclear efetiva (Z_eff)?",
    options: [
      "A carga nuclear total do átomo",
      "A carga sentida por um elétron específico",
      "O número de prótons no núcleo",
      "A diferença entre prótons e elétrons",
    ],
    correct: 1,
    explanation:
      "Z_eff é a carga nuclear 'sentida' por um elétron específico, considerando o efeito de blindagem dos outros elétrons.",
  },
  {
    question: "Qual fórmula representa a carga nuclear efetiva?",
    options: ["Z_eff = Z + σ", "Z_eff = Z - σ", "Z_eff = Z × σ", "Z_eff = Z / σ"],
    correct: 1,
    explanation: "A fórmula correta é Z_eff = Z - σ, onde Z é o número atômico e σ é a constante de blindagem.",
  },
  {
    question: "Segundo as regras de Slater, qual é a constante de blindagem para elétrons no mesmo subnível?",
    options: ["0,85", "1,00", "0,35", "0,50"],
    correct: 2,
    explanation: "Para elétrons no mesmo subnível (exceto o próprio elétron), a constante de blindagem é 0,35.",
  },
  {
    question: "Como varia Z_eff ao longo de um período na tabela periódica?",
    options: [
      "Diminui da esquerda para direita",
      "Permanece constante",
      "Aumenta da esquerda para direita",
      "Varia aleatoriamente",
    ],
    correct: 2,
    explanation: "Z_eff aumenta ao longo do período porque o número atômico aumenta mais rapidamente que a blindagem.",
  },
  {
    question: "Qual orbital tem maior penetração no núcleo?",
    options: ["p", "d", "f", "s"],
    correct: 3,
    explanation: "Os orbitais s têm maior penetração no núcleo, seguidos por p, d e f, resultando em menor blindagem.",
  },
]

// Dados para visualização 3D dos orbitais
const orbitalShapes = {
  "1s": { shape: "esfera", color: "#FF6B6B", size: 1, penetration: 100 },
  "2s": { shape: "esfera", color: "#4ECDC4", size: 1.5, penetration: 85 },
  "2p": { shape: "haltere", color: "#45B7D1", size: 1.3, penetration: 70 },
  "3s": { shape: "esfera", color: "#96CEB4", size: 2, penetration: 75 },
  "3p": { shape: "haltere", color: "#FFEAA7", size: 1.8, penetration: 60 },
  "3d": { shape: "complexo", color: "#DDA0DD", size: 1.6, penetration: 40 },
  "4s": { shape: "esfera", color: "#FFB6C1", size: 2.5, penetration: 70 },
}

export default function CargaNuclearEfetiva() {
  const [selectedElement, setSelectedElement] = useState("")
  const [targetOrbital, setTargetOrbital] = useState("")
  const [calculationSteps, setCalculationSteps] = useState<string[]>([])
  const [result, setResult] = useState<number | null>(null)
  const [showExample, setShowExample] = useState(0)

  // Estados para comparação
  const [compareElement1, setCompareElement1] = useState("")
  const [compareElement2, setCompareElement2] = useState("")
  const [compareOrbital, setCompareOrbital] = useState("")
  const [comparisonResults, setComparisonResults] = useState<{ element1: number; element2: number } | null>(null)

  // Estados para quiz
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  // Estados para visualização 3D
  const [selectedOrbitalView, setSelectedOrbitalView] = useState("1s")

  const calculateZeff = (element: string, orbital: string): { zeff: number; steps: string[] } => {
    const elementData = electronConfigs[element as keyof typeof electronConfigs]
    if (!elementData) return { zeff: 0, steps: [] }

    const atomicNumber = elementData.atomicNumber
    const steps: string[] = []
    let shielding = 0

    steps.push(`Z = ${atomicNumber} (número atômico do ${elementData.name})`)
    steps.push(`Configuração eletrônica: ${elementData.config}`)
    steps.push(`Elétron de interesse: ${orbital}`)
    steps.push("Cálculo da blindagem (σ):")

    const orbitals = Object.keys(elementData.orbitals)

    for (const orb of orbitals) {
      const electrons = elementData.orbitals[orb as keyof typeof elementData.orbitals]

      if (orb === orbital) {
        const sameOrbitalElectrons = electrons - 1
        if (sameOrbitalElectrons > 0) {
          const contribution = sameOrbitalElectrons * 0.35
          shielding += contribution
          steps.push(
            `• Elétrons no mesmo subnível (${orb}): ${sameOrbitalElectrons} × 0,35 = ${contribution.toFixed(2)}`,
          )
        }
      } else {
        let factor = 0

        if (orbital.startsWith("1s")) {
          factor = 0.35
        } else if (orbital.startsWith("2")) {
          if (orb.startsWith("1")) factor = 0.85
          else if (orb.startsWith("2") && orb !== orbital) factor = 0.35
        } else if (orbital.startsWith("3")) {
          if (orb.startsWith("1")) factor = 1.0
          else if (orb.startsWith("2")) factor = 0.85
          else if (orb.startsWith("3") && orb !== orbital) factor = 0.35
        } else if (orbital.startsWith("4")) {
          if (orb.startsWith("1")) factor = 1.0
          else if (orb.startsWith("2")) factor = 1.0
          else if (orb.startsWith("3")) factor = 0.85
          else if (orb.startsWith("4") && orb !== orbital) factor = 0.35
        }

        if (factor > 0) {
          const contribution = electrons * factor
          shielding += contribution
          steps.push(`• Elétrons em ${orb}: ${electrons} × ${factor} = ${contribution.toFixed(2)}`)
        }
      }
    }

    const zeff = atomicNumber - shielding
    steps.push(`σ total = ${shielding.toFixed(2)}`)
    steps.push(`Z_eff = Z - σ = ${atomicNumber} - ${shielding.toFixed(2)} = ${zeff.toFixed(2)}`)

    return { zeff, steps }
  }

  const handleCalculation = () => {
    const { zeff, steps } = calculateZeff(selectedElement, targetOrbital)
    setCalculationSteps(steps)
    setResult(zeff)
  }

  const handleComparison = () => {
    if (!compareElement1 || !compareElement2 || !compareOrbital) return

    const result1 = calculateZeff(compareElement1, compareOrbital)
    const result2 = calculateZeff(compareElement2, compareOrbital)

    setComparisonResults({
      element1: result1.zeff,
      element2: result2.zeff,
    })
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setShowQuiz(false)
  }

  const getAvailableOrbitals = (element: string) => {
    const config = electronConfigs[element as keyof typeof electronConfigs]
    return config ? Object.keys(config.orbitals) : []
  }

  const examples = [
    {
      element: "Carbono (C)",
      atomicNumber: 6,
      config: "1s² 2s² 2p²",
      targetOrbital: "2p",
      calculation: calculateZeff("C", "2p"),
    },
    {
      element: "Sódio (Na)",
      atomicNumber: 11,
      config: "1s² 2s² 2p⁶ 3s¹",
      targetOrbital: "3s",
      calculation: calculateZeff("Na", "3s"),
    },
    {
      element: "Ferro (Fe)",
      atomicNumber: 26,
      config: "[Ar] 3d⁶ 4s²",
      targetOrbital: "3d",
      calculation: calculateZeff("Fe", "3d"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carga Nuclear Efetiva</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda a calcular a carga nuclear efetiva usando as regras de Slater e entenda o efeito de blindagem
            eletrônica com ferramentas interativas avançadas.
          </p>
        </div>

        <Tabs defaultValue="conceitos" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="conceitos">Conceitos</TabsTrigger>
            <TabsTrigger value="calculadora">Calculadora</TabsTrigger>
            <TabsTrigger value="visualizacao">Visualização 3D</TabsTrigger>
            <TabsTrigger value="comparacao">Comparação</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="aplicacoes">Aplicações</TabsTrigger>
          </TabsList>

          {/* Aba Conceitos */}
          <TabsContent value="conceitos" className="space-y-8">
            {/* Conceitos Fundamentais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <Atom className="mr-2 h-6 w-6" />O que é Carga Nuclear Efetiva?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    A carga nuclear efetiva (Z_eff) é a carga nuclear "sentida" por um elétron específico, considerando
                    o efeito de blindagem dos outros elétrons.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Fórmula:</h3>
                    <p className="text-center text-lg font-mono">Z_eff = Z - σ</p>
                    <div className="text-sm text-gray-600 mt-2">
                      <p>• Z = número atômico (carga nuclear real)</p>
                      <p>• σ = constante de blindagem</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Por que é importante?</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Explica tendências periódicas</li>
                      <li>• Prevê propriedades atômicas</li>
                      <li>• Determina energia de ionização</li>
                      <li>• Influencia raio atômico</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <Eye className="mr-2 h-6 w-6" />
                    Efeito de Blindagem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Os elétrons internos "blindam" os elétrons externos da atração nuclear completa, reduzindo a força
                    efetiva sentida.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded">
                      <h4 className="font-semibold text-red-700">Blindagem Forte</h4>
                      <p className="text-sm text-gray-600">Elétrons em camadas internas (s, p)</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded">
                      <h4 className="font-semibold text-orange-700">Blindagem Moderada</h4>
                      <p className="text-sm text-gray-600">Elétrons no mesmo subnível</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <h4 className="font-semibold text-green-700">Blindagem Fraca</h4>
                      <p className="text-sm text-gray-600">Elétrons d em relação a s e p</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Regras de Slater */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-purple-600" />
                Regras de Slater
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Constantes de Blindagem (σ)</h3>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Para elétrons ns e np:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Mesmo grupo (n): σ = 0,35</li>
                        <li>• Grupo (n-1): σ = 0,85</li>
                        <li>• Grupos internos: σ = 1,00</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Para elétrons nd:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Mesmo grupo d: σ = 0,35</li>
                        <li>• Grupos s e p externos: σ = 0,35</li>
                        <li>• Grupos internos: σ = 1,00</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-700 mb-2">Para elétrons nf:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Mesmo grupo f: σ = 0,35</li>
                        <li>• Todos os outros: σ = 1,00</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Ordem dos Grupos</h3>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">
                      Os elétrons são agrupados na seguinte ordem para aplicar as regras:
                    </p>

                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span>(1s)</span>
                        <span className="text-gray-500">Grupo 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(2s, 2p)</span>
                        <span className="text-gray-500">Grupo 2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(3s, 3p)</span>
                        <span className="text-gray-500">Grupo 3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(3d)</span>
                        <span className="text-gray-500">Grupo 4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(4s, 4p)</span>
                        <span className="text-gray-500">Grupo 5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(4d)</span>
                        <span className="text-gray-500">Grupo 6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(4f)</span>
                        <span className="text-gray-500">Grupo 7</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-700">Importante:</h4>
                        <p className="text-sm text-gray-600">
                          As regras de Slater são aproximações. Para cálculos mais precisos, use métodos quânticos
                          avançados.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemplos Detalhados */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exemplos Detalhados</h2>

              <div className="flex space-x-2 mb-6">
                {examples.map((_, index) => (
                  <Button
                    key={index}
                    variant={showExample === index ? "default" : "outline"}
                    onClick={() => setShowExample(index)}
                  >
                    Exemplo {index + 1}
                  </Button>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">{examples[showExample].element}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Badge variant="outline">Z = {examples[showExample].atomicNumber}</Badge>
                    <Badge variant="outline">{examples[showExample].config}</Badge>
                    <Badge variant="outline">Orbital: {examples[showExample].targetOrbital}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Cálculo Passo a Passo:</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {examples[showExample].calculation.steps.map((step, index) => (
                          <p key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Resultado Final:</h3>
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          Z_eff = {examples[showExample].calculation.zeff.toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-600">
                          O elétron {examples[showExample].targetOrbital} do{" "}
                          {examples[showExample].element.split(" ")[0]}
                          sente uma carga nuclear efetiva de {examples[showExample].calculation.zeff.toFixed(2)}.
                        </p>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">Interpretação:</h4>
                        <p className="text-sm text-gray-600">
                          {examples[showExample].calculation.zeff < 2
                            ? "Blindagem forte - elétron fracamente atraído pelo núcleo"
                            : examples[showExample].calculation.zeff < 4
                              ? "Blindagem moderada - atração nuclear moderada"
                              : "Blindagem fraca - forte atração nuclear"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Calculadora */}
          <TabsContent value="calculadora" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-blue-600" />
                Calculadora de Carga Nuclear Efetiva
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="element-select" className="text-base font-semibold">
                      Selecione o Elemento
                    </Label>
                    <Select value={selectedElement} onValueChange={setSelectedElement}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Escolha um elemento..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(electronConfigs).map(([symbol, data]) => (
                          <SelectItem key={symbol} value={symbol}>
                            {symbol} - {data.name} - {data.config}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedElement && (
                    <div>
                      <Label htmlFor="orbital-select" className="text-base font-semibold">
                        Orbital de Interesse
                      </Label>
                      <Select value={targetOrbital} onValueChange={setTargetOrbital}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Escolha o orbital..." />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableOrbitals(selectedElement).map((orbital) => (
                            <SelectItem key={orbital} value={orbital}>
                              {orbital}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleCalculation}
                      disabled={!selectedElement || !targetOrbital}
                      className="flex-1"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calcular Z_eff
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedElement("")
                        setTargetOrbital("")
                        setCalculationSteps([])
                        setResult(null)
                      }}
                      variant="outline"
                    >
                      Limpar
                    </Button>
                  </div>
                </div>

                <div>
                  {result !== null && calculationSteps.length > 0 && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Resultado</h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-3xl font-bold text-blue-600">Z_eff = {result.toFixed(2)}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            para o elétron {targetOrbital} do {selectedElement}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                        <h4 className="font-semibold mb-2">Cálculo Passo a Passo:</h4>
                        <div className="space-y-1">
                          {calculationSteps.map((step, index) => (
                            <p key={index} className="text-sm text-gray-700">
                              {step}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Aba Visualização 3D */}
          <TabsContent value="visualizacao" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="mr-2 h-6 w-6 text-purple-600" />
                Visualização 3D dos Orbitais
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Selecione o Orbital</Label>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.keys(orbitalShapes).map((orbital) => (
                      <Button
                        key={orbital}
                        variant={selectedOrbitalView === orbital ? "default" : "outline"}
                        onClick={() => setSelectedOrbitalView(orbital)}
                        className="text-sm"
                      >
                        {orbital}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Propriedades do Orbital {selectedOrbitalView}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Forma:</span>
                          <span className="font-medium">
                            {orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].shape}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tamanho relativo:</span>
                          <span className="font-medium">
                            {orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].size}x
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Penetração nuclear:</span>
                          <span className="font-medium">
                            {orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].penetration}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Efeito de Blindagem</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Capacidade de blindagem:</span>
                          <Progress
                            value={100 - orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].penetration}
                            className="w-24 h-2"
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          Orbitais com maior penetração nuclear (s) blindam menos os elétrons externos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-80 h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="rounded-full border-4 animate-pulse"
                        style={{
                          width: `${orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].size * 60}px`,
                          height: `${orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].size * 60}px`,
                          backgroundColor:
                            orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].color + "40",
                          borderColor: orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].color,
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce">
                            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-sm font-semibold text-gray-700">Orbital {selectedOrbitalView}</p>
                      <p className="text-xs text-gray-500">
                        {orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].shape === "esfera"
                          ? "Forma esférica simétrica"
                          : orbitalShapes[selectedOrbitalView as keyof typeof orbitalShapes].shape === "haltere"
                            ? "Forma de haltere com dois lóbulos"
                            : "Forma complexa com múltiplos lóbulos"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Interpretação da Visualização</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                    <h4 className="font-semibold text-purple-600">Núcleo</h4>
                    <p className="text-sm text-gray-600">Centro de carga positiva</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full mx-auto mb-2 bg-blue-100"></div>
                    <h4 className="font-semibold text-purple-600">Orbital</h4>
                    <p className="text-sm text-gray-600">Região de probabilidade eletrônica</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-blue-400 rounded-full mx-auto mb-2"></div>
                    <h4 className="font-semibold text-purple-600">Blindagem</h4>
                    <p className="text-sm text-gray-600">Efeito dos elétrons internos</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Aba Comparação */}
          <TabsContent value="comparacao" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="mr-2 h-6 w-6 text-green-600" />
                Comparação de Elementos
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-semibold">Elemento 1</Label>
                      <Select value={compareElement1} onValueChange={setCompareElement1}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Primeiro elemento..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(electronConfigs).map(([symbol, data]) => (
                            <SelectItem key={symbol} value={symbol}>
                              {symbol} - {data.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Elemento 2</Label>
                      <Select value={compareElement2} onValueChange={setCompareElement2}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Segundo elemento..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(electronConfigs).map(([symbol, data]) => (
                            <SelectItem key={symbol} value={symbol}>
                              {symbol} - {data.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Orbital para Comparação</Label>
                    <Select value={compareOrbital} onValueChange={setCompareOrbital}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Escolha o orbital..." />
                      </SelectTrigger>
                      <SelectContent>
                        {["1s", "2s", "2p", "3s", "3p", "3d", "4s"].map((orbital) => (
                          <SelectItem key={orbital} value={orbital}>
                            {orbital}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleComparison}
                    disabled={!compareElement1 || !compareElement2 || !compareOrbital}
                    className="w-full"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Comparar Elementos
                  </Button>
                </div>

                <div>
                  {comparisonResults && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center">Resultados da Comparação</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {comparisonResults.element1.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {compareElement1} ({compareOrbital})
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {comparisonResults.element2.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {compareElement2} ({compareOrbital})
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Análise:</h4>
                        <p className="text-sm text-gray-700">
                          {comparisonResults.element1 > comparisonResults.element2
                            ? `${compareElement1} tem maior Z_eff (${comparisonResults.element1.toFixed(2)}) que ${compareElement2} (${comparisonResults.element2.toFixed(2)}). Isso significa que o elétron ${compareOrbital} em ${compareElement1} sente uma atração nuclear mais forte.`
                            : comparisonResults.element1 < comparisonResults.element2
                              ? `${compareElement2} tem maior Z_eff (${comparisonResults.element2.toFixed(2)}) que ${compareElement1} (${comparisonResults.element1.toFixed(2)}). Isso significa que o elétron ${compareOrbital} em ${compareElement2} sente uma atração nuclear mais forte.`
                              : `Ambos os elementos têm Z_eff similar para o orbital ${compareOrbital}.`}
                        </p>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Implicações:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Maior Z_eff → menor raio atômico</li>
                          <li>• Maior Z_eff → maior energia de ionização</li>
                          <li>• Maior Z_eff → maior eletronegatividade</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Aba Quiz */}
          <TabsContent value="quiz" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="mr-2 h-6 w-6 text-yellow-500" />
                Quiz de Carga Nuclear Efetiva
              </h2>

              {!showQuiz && (
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    Responda às perguntas e veja o quanto você aprendeu sobre carga nuclear efetiva!
                  </p>
                  <Button onClick={() => setShowQuiz(true)}>Iniciar Quiz</Button>
                </div>
              )}

              {showQuiz && !quizCompleted && (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Pergunta {currentQuestion + 1} de {quizQuestions.length}
                      </span>
                      <span className="text-sm text-gray-600">
                        Pontuação: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
                      </span>
                    </div>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">{quizQuestions[currentQuestion].question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          className="text-left justify-start h-auto p-4"
                          onClick={() => handleQuizAnswer(index)}
                          disabled={showExplanation}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {showExplanation && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Explicação:</h4>
                      <p className="text-sm text-gray-700">{quizQuestions[currentQuestion].explanation}</p>
                      <Button onClick={nextQuestion} className="mt-4">
                        {currentQuestion < quizQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {quizCompleted && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {score}/{quizQuestions.length}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">
                      {score === quizQuestions.length
                        ? "Perfeito! Você domina o conceito! 🎉"
                        : score >= quizQuestions.length * 0.8
                          ? "Excelente! Muito bem! 👏"
                          : score >= quizQuestions.length * 0.6
                            ? "Bom trabalho! Continue estudando! 📚"
                            : "Continue praticando! Você vai conseguir! 💪"}
                    </div>
                    <Progress value={(score / quizQuestions.length) * 100} className="w-64 mx-auto mb-4" />
                  </div>
                  <Button onClick={resetQuiz} className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Tentar Novamente</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Aba Aplicações */}
          <TabsContent value="aplicacoes" className="space-y-8">
            {/* Integração com pH e pOH */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TestTube className="mr-2 h-6 w-6 text-red-600" />
                Aplicação em pH e Acidez
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-700">Como Z_eff Afeta a Acidez</h3>

                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2">Força dos Ácidos</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        A carga nuclear efetiva influencia diretamente a capacidade de um átomo de liberar prótons (H⁺).
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • <strong>Maior Z_eff</strong> → maior eletronegatividade → ácido mais forte
                        </li>
                        <li>
                          • <strong>HF vs HCl:</strong> F tem maior Z_eff, mas HCl é mais ácido (tamanho importa)
                        </li>
                        <li>
                          • <strong>Ácidos oxigenados:</strong> Z_eff do átomo central determina força
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Exemplo Prático: HClO₄ vs HClO</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          <strong>HClO₄ (ácido perclórico):</strong>
                        </p>
                        <p>• Cl com Z_eff alto devido aos 4 oxigênios</p>
                        <p>• Maior polarização da ligação O-H</p>
                        <p>• pH muito baixo (ácido muito forte)</p>

                        <p className="mt-2">
                          <strong>HClO (ácido hipocloroso):</strong>
                        </p>
                        <p>• Cl com Z_eff menor (apenas 1 oxigênio)</p>
                        <p>• Menor polarização da ligação O-H</p>
                        <p>• pH mais alto (ácido fraco)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <a href="/ph-poh" className="flex items-center justify-center space-x-2">
                        <TestTube className="h-4 w-4" />
                        <span>Explorar pH e pOH</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Calculadora de Força Ácida</h3>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3">Compare a Força de Ácidos Halogenídricos</h4>

                    <div className="space-y-3">
                      {[
                        { acid: "HF", element: "F", zeff: 5.2, pka: 3.2, strength: "Ácido fraco" },
                        { acid: "HCl", element: "Cl", zeff: 6.1, pka: -7, strength: "Ácido forte" },
                        { acid: "HBr", element: "Br", zeff: 6.8, pka: -9, strength: "Ácido muito forte" },
                        { acid: "HI", element: "I", zeff: 7.2, pka: -10, strength: "Ácido muito forte" },
                      ].map((data, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center space-x-3">
                            <div className="font-mono font-bold text-lg">{data.acid}</div>
                            <div className="text-sm text-gray-600">
                              Z_eff({data.element}) = {data.zeff}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">pKa = {data.pka}</div>
                            <div className="text-xs text-gray-500">{data.strength}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Observação:</strong> Embora o F tenha menor Z_eff, HF é ácido fraco devido ao tamanho
                        pequeno e forte ligação H-F. O tamanho do átomo também influencia a força ácida!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integração com Concentração */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Beaker className="mr-2 h-6 w-6 text-blue-600" />
                Aplicação em Concentração de Soluções
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Solubilidade e Z_eff</h3>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Compostos Iônicos</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        A carga nuclear efetiva dos íons determina sua capacidade de hidratação e solubilidade.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • <strong>Cátions pequenos</strong> (alto Z_eff) → maior hidratação → maior solubilidade
                        </li>
                        <li>
                          • <strong>Li⁺ vs Cs⁺:</strong> Li⁺ tem maior Z_eff, se hidrata mais, LiCl mais solúvel
                        </li>
                        <li>
                          • <strong>Energia de hidratação</strong> ∝ Z_eff²/raio
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Exemplo: Sais de Metais Alcalinos</h4>
                      <div className="text-sm text-gray-600">
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-semibold">LiCl</div>
                            <div className="text-xs">Z_eff(Li⁺) = 2.0</div>
                            <div className="text-xs text-green-600">Muito solúvel</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-semibold">CsCl</div>
                            <div className="text-xs">Z_eff(Cs⁺) = 2.2</div>
                            <div className="text-xs text-orange-600">Menos solúvel</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <a href="/concentracao" className="flex items-center justify-center space-x-2">
                        <Beaker className="h-4 w-4" />
                        <span>Estudar Concentração</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Calculadora de Energia de Hidratação</h3>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Energia de Hidratação vs Z_eff</h4>

                    <div className="space-y-3">
                      {[
                        { ion: "Li⁺", zeff: 2.0, radius: 0.76, hydration: -519, solubility: "Alta" },
                        { ion: "Na⁺", zeff: 2.2, radius: 1.02, hydration: -409, solubility: "Alta" },
                        { ion: "K⁺", zeff: 2.2, radius: 1.38, hydration: -322, solubility: "Moderada" },
                        { ion: "Cs⁺", zeff: 2.2, radius: 1.67, hydration: -276, solubility: "Baixa" },
                      ].map((data, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-mono font-bold text-lg">{data.ion}</div>
                            <Badge
                              variant={
                                data.solubility === "Alta"
                                  ? "default"
                                  : data.solubility === "Moderada"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {data.solubility}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div>Z_eff: {data.zeff}</div>
                            <div>Raio: {data.radius} Å</div>
                            <div>ΔH_hid: {data.hydration} kJ/mol</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Relação:</strong> Energia de hidratação = k × (Z_eff)² / raio
                        <br />
                        Maior energia de hidratação → maior solubilidade em água
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integração com Estequiometria */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-purple-600" />
                Aplicação em Estequiometria
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">Reatividade e Z_eff</h3>

                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-700 mb-2">Velocidade de Reação</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        A carga nuclear efetiva influencia a reatividade dos elementos e a velocidade das reações.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • <strong>Metais alcalinos:</strong> menor Z_eff → maior reatividade
                        </li>
                        <li>
                          • <strong>Halogênios:</strong> maior Z_eff → maior eletronegatividade → maior reatividade
                        </li>
                        <li>
                          • <strong>Energia de ativação</strong> relacionada com Z_eff dos reagentes
                        </li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-700 mb-2">Exemplo: Reação com Água</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          <strong>2Na + 2H₂O → 2NaOH + H₂</strong>
                        </p>
                        <p>• Na: Z_eff = 2.2 (baixo) → reação vigorosa</p>

                        <p className="mt-2">
                          <strong>2K + 2H₂O → 2KOH + H₂</strong>
                        </p>
                        <p>• K: Z_eff = 2.2, mas maior raio → reação mais vigorosa</p>

                        <p className="mt-2">
                          <strong>2Cs + 2H₂O → 2CsOH + H₂</strong>
                        </p>
                        <p>• Cs: Z_eff = 2.2, raio muito grande → reação explosiva</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <a href="/estequiometria" className="flex items-center justify-center space-x-2">
                        <Calculator className="h-4 w-4" />
                        <span>Estudar Estequiometria</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-orange-700">Calculadora de Reatividade</h3>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3">Reatividade dos Metais Alcalinos</h4>

                    <div className="space-y-3">
                      {[
                        { metal: "Li", zeff: 1.3, radius: 1.52, reactivity: "Moderada", reaction: "Lenta com H₂O" },
                        { metal: "Na", zeff: 2.2, radius: 1.86, reactivity: "Alta", reaction: "Vigorosa com H₂O" },
                        { metal: "K", zeff: 2.2, radius: 2.27, reactivity: "Muito Alta", reaction: "Muito vigorosa" },
                        { metal: "Cs", zeff: 2.2, radius: 2.65, reactivity: "Extrema", reaction: "Explosiva" },
                      ].map((data, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-mono font-bold text-lg">{data.metal}</div>
                            <Badge
                              variant={
                                data.reactivity === "Extrema"
                                  ? "destructive"
                                  : data.reactivity === "Muito Alta"
                                    ? "default"
                                    : data.reactivity === "Alta"
                                      ? "secondary"
                                      : "outline"
                              }
                            >
                              {data.reactivity}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>
                              Z_eff: {data.zeff} | Raio: {data.radius} Å
                            </div>
                            <div className="italic">{data.reaction}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-orange-50 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Tendência:</strong> Embora Z_eff seja similar, o aumento do raio atômico facilita a
                        perda do elétron de valência, aumentando a reatividade.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Problema Estequiométrico</h4>

                    <div className="bg-white p-4 rounded border">
                      <p className="text-sm font-semibold mb-2">Questão:</p>
                      <p className="text-sm text-gray-700 mb-3">
                        Sabendo que o sódio (Z_eff = 2.2) reage com água segundo a equação:
                        <br />
                        <code className="bg-gray-100 px-2 py-1 rounded">2Na + 2H₂O → 2NaOH + H₂</code>
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        Quantos gramas de NaOH são produzidos a partir de 4,6g de Na?
                      </p>

                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-xs font-semibold text-blue-700 mb-1">Solução:</p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>1. Massa molar: Na = 23 g/mol, NaOH = 40 g/mol</p>
                          <p>2. Mols de Na: 4,6g ÷ 23 g/mol = 0,2 mol</p>
                          <p>3. Proporção: 2 mol Na : 2 mol NaOH = 1:1</p>
                          <p>4. Mols de NaOH: 0,2 mol</p>
                          <p>
                            5. Massa de NaOH: 0,2 mol × 40 g/mol = <strong>8,0g</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Conexões Interdisciplinares */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-indigo-600" />
                Conexões Interdisciplinares
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 flex items-center">
                      <TestTube className="mr-2 h-5 w-5" />
                      pH e Acidez
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Força de ácidos e bases</li>
                      <li>• Constantes de ionização</li>
                      <li>• Efeito do átomo central</li>
                      <li>• Polarização de ligações</li>
                    </ul>
                    <Button asChild className="w-full mt-4" size="sm">
                      <a href="/ph-poh">Explorar pH</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 flex items-center">
                      <Beaker className="mr-2 h-5 w-5" />
                      Concentração
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Solubilidade de compostos</li>
                      <li>• Energia de hidratação</li>
                      <li>• Formação de complexos</li>
                      <li>• Propriedades coligativas</li>
                    </ul>
                    <Button asChild className="w-full mt-4" size="sm">
                      <a href="/concentracao">Estudar Concentração</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Estequiometria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Velocidade de reações</li>
                      <li>• Energia de ativação</li>
                      <li>• Mecanismos de reação</li>
                      <li>• Catálise e inibição</li>
                    </ul>
                    <Button asChild className="w-full mt-4" size="sm">
                      <a href="/estequiometria">Estudar Estequiometria</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Projeto Integrado: Análise Completa</h3>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-2">Desafio: Ácido Clorídrico (HCl)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Analise o HCl sob diferentes perspectivas usando os conceitos integrados:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <div className="font-semibold text-red-600 mb-1">Carga Nuclear Efetiva</div>
                      <div className="text-gray-600">
                        • Z_eff(Cl) = 6.1
                        <br />• Alta eletronegatividade
                        <br />• Polarização H-Cl
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <div className="font-semibold text-blue-600 mb-1">pH e Acidez</div>
                      <div className="text-gray-600">
                        • Ácido forte (pKa = -7)
                        <br />• Ionização completa
                        <br />• pH muito baixo
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <div className="font-semibold text-purple-600 mb-1">Aplicações</div>
                      <div className="text-gray-600">
                        • Limpeza industrial
                        <br />• Síntese química
                        <br />• Análise quantitativa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
