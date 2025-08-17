"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Atom,
  ArrowRight,
  BookOpen,
  Calculator,
  Eye,
  Award,
  RefreshCw,
  Zap,
  Target,
  Beaker,
  TestTube,
} from "lucide-react"

// Dados das reações
const substitutionReactions = [
  {
    name: "SN2 - Substituição Nucleofílica Bimolecular",
    mechanism: "Mecanismo concertado (uma etapa)",
    characteristics: [
      "Inversão de configuração (Walden)",
      "Velocidade depende de [RX] e [Nu⁻]",
      "Favorecida em carbonos primários",
      "Solventes polares apróticos favorecem",
    ],
    example: "CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻",
    energyProfile: "Uma barreira energética",
    stereochemistry: "Inversão completa",
    rate: "v = k[RX][Nu⁻]",
  },
  {
    name: "SN1 - Substituição Nucleofílica Unimolecular",
    mechanism: "Mecanismo em duas etapas via carbocátion",
    characteristics: [
      "Racemização (mistura de estereoisômeros)",
      "Velocidade depende apenas de [RX]",
      "Favorecida em carbonos terciários",
      "Solventes polares próticos favorecem",
    ],
    example: "(CH₃)₃CBr → (CH₃)₃C⁺ + Br⁻ → (CH₃)₃COH",
    energyProfile: "Duas barreiras energéticas",
    stereochemistry: "Racemização",
    rate: "v = k[RX]",
  },
]

const additionReactions = [
  {
    name: "Adição Nucleofílica a Carbonilas",
    substrate: "Aldeídos e Cetonas (C=O)",
    mechanism: "Ataque nucleofílico ao carbono eletrofílico",
    products: "Álcoois (após protonação)",
    example: "CH₃CHO + H⁻ → CH₃CH₂OH",
    conditions: "Meio básico ou ácido",
  },
  {
    name: "Adição Nucleofílica a Nitrilas",
    substrate: "Compostos com C≡N",
    mechanism: "Ataque ao carbono da nitrila",
    products: "Iminas (após hidrólise → ácidos carboxílicos)",
    example: "CH₃CN + H₂O → CH₃COOH + NH₃",
    conditions: "Meio ácido, aquecimento",
  },
  {
    name: "Adição Michael",
    substrate: "α,β-insaturados (C=C-C=O)",
    mechanism: "Adição conjugada 1,4",
    products: "Compostos β-substituídos",
    example: "CH₂=CH-CO-CH₃ + CN⁻ → NC-CH₂-CH₂-CO-CH₃",
    conditions: "Base fraca, temperatura ambiente",
  },
]

// Nucleófilos comuns
const nucleophiles = [
  {
    name: "Hidróxido (OH⁻)",
    strength: "Forte",
    basicity: "Forte",
    solvent: "Polar prótico",
    products: "Álcoois",
    example: "R-X + OH⁻ → R-OH + X⁻",
  },
  {
    name: "Alcóxido (RO⁻)",
    strength: "Forte",
    basicity: "Forte",
    solvent: "Álcool correspondente",
    products: "Éteres",
    example: "R-X + CH₃O⁻ → R-O-CH₃ + X⁻",
  },
  {
    name: "Cianeto (CN⁻)",
    strength: "Moderado",
    basicity: "Fraca",
    solvent: "Polar aprótico",
    products: "Nitrilas",
    example: "R-X + CN⁻ → R-CN + X⁻",
  },
  {
    name: "Amônia (NH₃)",
    strength: "Fraco",
    basicity: "Moderada",
    solvent: "Polar prótico",
    products: "Aminas",
    example: "R-X + NH₃ → R-NH₃⁺X⁻ → R-NH₂",
  },
  {
    name: "Água (H₂O)",
    strength: "Muito fraco",
    basicity: "Muito fraca",
    solvent: "Aquoso",
    products: "Álcoois",
    example: "R-X + H₂O → R-OH₂⁺ + X⁻ → R-OH",
  },
]

// Grupos funcionais
const functionalGroups = [
  {
    name: "Haletos de Alquila",
    formula: "R-X",
    reactivity: "Eletrófilos",
    reactions: ["SN1", "SN2", "E1", "E2"],
    example: "CH₃CH₂Br",
  },
  {
    name: "Álcoois",
    formula: "R-OH",
    reactivity: "Nucleófilos fracos",
    reactions: ["Substituição (após ativação)", "Eliminação"],
    example: "CH₃CH₂OH",
  },
  {
    name: "Aldeídos",
    formula: "R-CHO",
    reactivity: "Eletrófilos",
    reactions: ["Adição nucleofílica", "Condensação"],
    example: "CH₃CHO",
  },
  {
    name: "Cetonas",
    formula: "R-CO-R'",
    reactivity: "Eletrófilos",
    reactions: ["Adição nucleofílica", "Condensação aldólica"],
    example: "CH₃COCH₃",
  },
  {
    name: "Ácidos Carboxílicos",
    formula: "R-COOH",
    reactivity: "Eletrófilos",
    reactions: ["Substituição nucleofílica acílica"],
    example: "CH₃COOH",
  },
]

// Quiz questions
const quizQuestions = [
  {
    question: "Qual mecanismo favorece a inversão de configuração?",
    options: ["SN1", "SN2", "E1", "E2"],
    correct: 1,
    explanation:
      "SN2 ocorre por ataque traseiro do nucleófilo, causando inversão de configuração (inversão de Walden).",
  },
  {
    question: "Em qual tipo de carbono a reação SN1 é mais favorecida?",
    options: ["Primário", "Secundário", "Terciário", "Quaternário"],
    correct: 2,
    explanation: "Carbonos terciários formam carbocátions mais estáveis, favorecendo o mecanismo SN1.",
  },
  {
    question: "Qual é o nucleófilo mais forte?",
    options: ["H₂O", "NH₃", "OH⁻", "CH₃OH"],
    correct: 2,
    explanation: "OH⁻ é um nucleófilo forte devido à sua carga negativa e alta densidade eletrônica.",
  },
  {
    question: "A adição nucleofílica a carbonilas ocorre preferencialmente em qual átomo?",
    options: ["Oxigênio", "Carbono", "Ambos igualmente", "Depende do nucleófilo"],
    correct: 1,
    explanation: "O carbono da carbonila é eletrofílico devido à polarização C=O, sendo atacado pelo nucleófilo.",
  },
  {
    question: "Qual solvente favorece reações SN2?",
    options: ["Água", "Metanol", "DMSO", "Etanol"],
    correct: 2,
    explanation: "DMSO é um solvente polar aprótico que não solva fortemente o nucleófilo, favorecendo SN2.",
  },
]

export default function QuimicaOrganica() {
  const [selectedReaction, setSelectedReaction] = useState("")
  const [selectedNucleophile, setSelectedNucleophile] = useState("")
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Química Orgânica</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore os mecanismos de substituição e adição nucleofílica, fundamentos essenciais da química orgânica.
          </p>
        </div>

        <Tabs defaultValue="conceitos" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="conceitos">Conceitos</TabsTrigger>
            <TabsTrigger value="substituicao">Substituição</TabsTrigger>
            <TabsTrigger value="adicao">Adição</TabsTrigger>
            <TabsTrigger value="nucleofilos">Nucleófilos</TabsTrigger>
            <TabsTrigger value="mecanismos">Mecanismos</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          {/* Aba Conceitos */}
          <TabsContent value="conceitos" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <Atom className="mr-2 h-6 w-6" />
                    Fundamentos da Química Orgânica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    A química orgânica estuda compostos de carbono e suas reações. Os mecanismos nucleofílicos são
                    fundamentais para compreender como as moléculas orgânicas se transformam.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Conceitos Chave:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        &gt; <strong>Nucleófilo:</strong> espécie rica em elétrons
                      </li>
                      <li>
                        &gt; <strong>Eletrófilo:</strong> espécie deficiente em elétrons
                      </li>
                      <li>
                        &gt; <strong>Grupo abandonador:</strong> grupo que sai da molécula
                      </li>
                      <li>
                        &gt; <strong>Substrato:</strong> molécula que sofre a reação
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Tipos de Reações:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        &gt; <strong>Substituição:</strong> um grupo substitui outro
                      </li>
                      <li>
                        &gt; <strong>Adição:</strong> novos grupos se adicionam
                      </li>
                      <li>
                        &gt; <strong>Eliminação:</strong> grupos são removidos
                      </li>
                      <li>
                        &gt; <strong>Rearranjo:</strong> reorganização molecular
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <Target className="mr-2 h-6 w-6" />
                    Fatores que Influenciam as Reações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded">
                      <h4 className="font-semibold text-red-700">Estrutura do Substrato</h4>
                      <p className="text-sm text-gray-600">
                        Carbonos primários, secundários e terciários reagem diferentemente
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-semibold text-blue-700">Força do Nucleófilo</h4>
                      <p className="text-sm text-gray-600">Nucleófilos mais fortes reagem mais rapidamente</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <h4 className="font-semibold text-green-700">Solvente</h4>
                      <p className="text-sm text-gray-600">Próticos vs apróticos afetam a velocidade</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <h4 className="font-semibold text-purple-700">Temperatura</h4>
                      <p className="text-sm text-gray-600">Maior temperatura aumenta a velocidade</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grupos Funcionais */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Grupos Funcionais Importantes</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {functionalGroups.map((group, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-700">{group.name}</CardTitle>
                      <div className="text-2xl font-mono font-bold text-center py-2 bg-gray-100 rounded">
                        {group.formula}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Badge variant="outline">{group.reactivity}</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Reações Típicas:</h4>
                          <div className="flex flex-wrap gap-1">
                            {group.reactions.map((reaction, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {reaction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-sm text-gray-600">
                            <strong>Exemplo:</strong> {group.example}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Aba Substituição */}
          <TabsContent value="substituicao" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="mr-2 h-6 w-6 text-orange-600" />
                Reações de Substituição Nucleofílica
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {substitutionReactions.map((reaction, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl text-orange-700">{reaction.name}</CardTitle>
                      <p className="text-gray-600">{reaction.mechanism}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Características:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {reaction.characteristics.map((char, idx) => (
                            <li key={idx}>• {char}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="font-semibold mb-1">Exemplo:</h4>
                        <p className="font-mono text-sm">{reaction.example}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-semibold text-blue-700 text-sm">Estereoquímica</h5>
                          <p className="text-xs text-gray-600">{reaction.stereochemistry}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <h5 className="font-semibold text-green-700 text-sm">Lei de Velocidade</h5>
                          <p className="text-xs font-mono text-gray-600">{reaction.rate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comparação SN1 vs SN2 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparação: SN1 vs SN2</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Aspecto</th>
                      <th className="border border-gray-300 p-3 text-left">SN1</th>
                      <th className="border border-gray-300 p-3 text-left">SN2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Mecanismo</td>
                      <td className="border border-gray-300 p-3">Duas etapas</td>
                      <td className="border border-gray-300 p-3">Uma etapa</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Intermediário</td>
                      <td className="border border-gray-300 p-3">Carbocátion</td>
                      <td className="border border-gray-300 p-3">Estado de transição</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Estereoquímica</td>
                      <td className="border border-gray-300 p-3">Racemização</td>
                      <td className="border border-gray-300 p-3">Inversão</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Substrato preferido</td>
                      <td className="border border-gray-300 p-3">3° &gt; 2° &gt;&gt; 1°</td>
                      <td className="border border-gray-300 p-3">1° &gt; 2° &gt;&gt; 3°</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Solvente</td>
                      <td className="border border-gray-300 p-3">Polar prótico</td>
                      <td className="border border-gray-300 p-3">Polar aprótico</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Nucleófilo</td>
                      <td className="border border-gray-300 p-3">Fraco ou forte</td>
                      <td className="border border-gray-300 p-3">Forte</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Aba Adição */}
          <TabsContent value="adicao" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="mr-2 h-6 w-6 text-green-600" />
                Reações de Adição Nucleofílica
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {additionReactions.map((reaction, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700">{reaction.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Substrato:</h4>
                        <p className="text-sm text-gray-600">{reaction.substrate}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-1">Mecanismo:</h4>
                        <p className="text-sm text-gray-600">{reaction.mechanism}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-1">Produtos:</h4>
                        <p className="text-sm text-gray-600">{reaction.products}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="font-semibold text-sm mb-1">Exemplo:</h4>
                        <p className="font-mono text-sm">{reaction.example}</p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded">
                        <h4 className="font-semibold text-blue-700 text-sm mb-1">Condições:</h4>
                        <p className="text-xs text-gray-600">{reaction.conditions}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mecanismo detalhado de adição a carbonilas */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mecanismo: Adição a Carbonilas</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Etapas do Mecanismo</h3>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Etapa 1: Ataque Nucleofílico</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        O nucleófilo ataca o carbono eletrofílico da carbonila
                      </p>
                      <div className="bg-white p-2 rounded font-mono text-sm">R₂C=O + Nu⁻ → R₂C(Nu⁻)-O⁻</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Etapa 2: Protonação</h4>
                      <p className="text-sm text-gray-600 mb-2">O oxigênio carregado negativamente é protonado</p>
                      <div className="bg-white p-2 rounded font-mono text-sm">R₂C(Nu)-O⁻ + H⁺ → R₂C(Nu)-OH</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">Fatores que Afetam a Reação</h3>

                  <div className="space-y-3">
                    <div className="bg-purple-50 p-3 rounded">
                      <h4 className="font-semibold text-purple-700">Reatividade da Carbonila</h4>
                      <p className="text-sm text-gray-600">Aldeídos &gt; Cetonas (impedimento estérico)</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded">
                      <h4 className="font-semibold text-orange-700">Força do Nucleófilo</h4>
                      <p className="text-sm text-gray-600">H⁻ &gt; RMgX &gt; RLi &gt; CN⁻ &gt; ROH</p>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded">
                      <h4 className="font-semibold text-yellow-700">Efeitos Eletrônicos</h4>
                      <p className="text-sm text-gray-600">Grupos retiradores de elétrons aumentam reatividade</p>
                    </div>

                    <div className="bg-red-50 p-3 rounded">
                      <h4 className="font-semibold text-red-700">Impedimento Estérico</h4>
                      <p className="text-sm text-gray-600">Grupos volumosos diminuem velocidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Aba Nucleófilos */}
          <TabsContent value="nucleofilos" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="mr-2 h-6 w-6 text-blue-600" />
                Nucleófilos Comuns
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {nucleophiles.map((nucleophile, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-blue-700">{nucleophile.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              nucleophile.strength === "Forte"
                                ? "default"
                                : nucleophile.strength === "Moderado"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {nucleophile.strength}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Nucleofilicidade:</h4>
                          <p className="text-sm text-gray-600">{nucleophile.strength}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Basicidade:</h4>
                          <p className="text-sm text-gray-600">{nucleophile.basicity}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-1">Solvente Preferido:</h4>
                        <p className="text-sm text-gray-600">{nucleophile.solvent}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-1">Produtos Típicos:</h4>
                        <p className="text-sm text-gray-600">{nucleophile.products}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="font-semibold text-sm mb-1">Reação Típica:</h4>
                        <p className="font-mono text-sm">{nucleophile.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Escala de nucleofilicidade */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Escala de Nucleofilicidade</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Em Solventes Próticos</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-mono text-center text-lg mb-2">I⁻ &gt; Br⁻ &gt; Cl⁻ &gt; F⁻</p>
                    <p className="text-sm text-gray-600 text-center">
                      Íons maiores são menos solvados e mais nucleofílicos
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Em Solventes Apróticos</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-mono text-center text-lg mb-2">F⁻ &gt; Cl⁻ &gt; Br⁻ &gt; I⁻</p>
                    <p className="text-sm text-gray-600 text-center">
                      Segue a ordem de basicidade (densidade de carga)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">Nucleófilos Neutros</h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-mono text-center text-lg mb-2">R₃P &gt; R₃N &gt; ROH &gt; H₂O</p>
                    <p className="text-sm text-gray-600 text-center">
                      Átomos maiores são mais polarizáveis e nucleofílicos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Aba Mecanismos */}
          <TabsContent value="mecanismos" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="mr-2 h-6 w-6 text-purple-600" />
                Visualização de Mecanismos
              </h2>

              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Selecione uma Reação</Label>
                  <Select value={selectedReaction} onValueChange={setSelectedReaction}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Escolha um mecanismo para visualizar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sn2">SN2 - Substituição Bimolecular</SelectItem>
                      <SelectItem value="sn1">SN1 - Substituição Unimolecular</SelectItem>
                      <SelectItem value="addition">Adição a Carbonila</SelectItem>
                      <SelectItem value="michael">Adição de Michael</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedReaction && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Diagrama de Energia</h3>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-4">📊</div>
                          <p className="text-gray-600">
                            {selectedReaction === "sn2" && "Uma barreira energética - mecanismo concertado"}
                            {selectedReaction === "sn1" && "Duas barreiras energéticas - intermediário carbocátion"}
                            {selectedReaction === "addition" && "Uma barreira - ataque direto à carbonila"}
                            {selectedReaction === "michael" && "Adição conjugada - estabilização por ressonância"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Características do Mecanismo</h3>
                      <div className="space-y-4">
                        {selectedReaction === "sn2" && (
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded">
                              <h4 className="font-semibold text-blue-700">Ataque Traseiro</h4>
                              <p className="text-sm text-gray-600">
                                Nucleófilo ataca pelo lado oposto ao grupo abandonador
                              </p>
                            </div>
                            <div className="bg-green-50 p-3 rounded">
                              <h4 className="font-semibold text-green-700">Estado de Transição</h4>
                              <p className="text-sm text-gray-600">Geometria bipirâmide trigonal no carbono</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded">
                              <h4 className="font-semibold text-purple-700">Inversão de Walden</h4>
                              <p className="text-sm text-gray-600">Configuração do produto é invertida</p>
                            </div>
                          </div>
                        )}

                        {selectedReaction === "sn1" && (
                          <div className="space-y-3">
                            <div className="bg-red-50 p-3 rounded">
                              <h4 className="font-semibold text-red-700">Formação do Carbocátion</h4>
                              <p className="text-sm text-gray-600">Etapa lenta - saída do grupo abandonador</p>
                            </div>
                            <div className="bg-orange-50 p-3 rounded">
                              <h4 className="font-semibold text-orange-700">Ataque Nucleofílico</h4>
                              <p className="text-sm text-gray-600">Etapa rápida - pelos dois lados</p>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded">
                              <h4 className="font-semibold text-yellow-700">Racemização</h4>
                              <p className="text-sm text-gray-600">Mistura de estereoisômeros</p>
                            </div>
                          </div>
                        )}

                        {selectedReaction === "addition" && (
                          <div className="space-y-3">
                            <div className="bg-green-50 p-3 rounded">
                              <h4 className="font-semibold text-green-700">Polarização C=O</h4>
                              <p className="text-sm text-gray-600">Carbono eletrofílico, oxigênio nucleofílico</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded">
                              <h4 className="font-semibold text-blue-700">Ataque ao Carbono</h4>
                              <p className="text-sm text-gray-600">Nucleófilo forma ligação com carbono</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded">
                              <h4 className="font-semibold text-purple-700">Protonação</h4>
                              <p className="text-sm text-gray-600">Oxigênio aniônico é protonado</p>
                            </div>
                          </div>
                        )}

                        {selectedReaction === "michael" && (
                          <div className="space-y-3">
                            <div className="bg-orange-50 p-3 rounded">
                              <h4 className="font-semibold text-orange-700">Sistema Conjugado</h4>
                              <p className="text-sm text-gray-600">C=C-C=O permite adição 1,4</p>
                            </div>
                            <div className="bg-pink-50 p-3 rounded">
                              <h4 className="font-semibold text-pink-700">Adição 1,4</h4>
                              <p className="text-sm text-gray-600">Nucleófilo ataca posição β</p>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded">
                              <h4 className="font-semibold text-indigo-700">Estabilização</h4>
                              <p className="text-sm text-gray-600">Enolato estabilizado por ressonância</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Problemas Práticos */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Problemas Práticos</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Problema 1: Predição de Mecanismo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-4 rounded mb-4">
                      <p className="font-semibold mb-2">Questão:</p>
                      <p className="text-sm">
                        (CH₃)₃CBr + OH⁻ → (CH₃)₃COH + Br⁻
                        <br />
                        Qual mecanismo é mais provável? Por quê?
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <p className="font-semibold text-green-700 mb-2">Resposta:</p>
                      <p className="text-sm text-gray-700">
                        <strong>SN1</strong> - Carbono terciário forma carbocátion estável. OH⁻ é nucleófilo forte mas
                        impedimento estérico dificulta SN2.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">Problema 2: Escolha do Nucleófilo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-4 rounded mb-4">
                      <p className="font-semibold mb-2">Questão:</p>
                      <p className="text-sm">
                        Para converter CH₃CH₂Br em CH₃CH₂CN, qual nucleófilo usar? Que condições são ideais?
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-blue-700 mb-2">Resposta:</p>
                      <p className="text-sm text-gray-700">
                        <strong>CN⁻</strong> em DMSO (solvente aprótico). Mecanismo SN2 favorecido em carbono primário.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Quiz */}
          <TabsContent value="quiz" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="mr-2 h-6 w-6 text-yellow-500" />
                Quiz de Química Orgânica
              </h2>

              {!showQuiz && (
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">Teste seus conhecimentos sobre mecanismos nucleofílicos!</p>
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
                        ? "Perfeito! Você domina os mecanismos! 🎉"
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
        </Tabs>

        {/* Seção de Integração */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-indigo-600" />
            Conexões com Outros Tópicos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-red-700 flex items-center">
                  <TestTube className="mr-2 h-5 w-5" />
                  pH e Basicidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Força de nucleófilos básicos</li>
                  <li>• Efeito do pH na reatividade</li>
                  <li>• Protonação de produtos</li>
                  <li>• Catálise ácida/básica</li>
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
                  <li>• Cinética de reação</li>
                  <li>• Efeito da concentração</li>
                  <li>• Solventes e solubilidade</li>
                  <li>• Equilíbrios químicos</li>
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
                  <li>• Cálculos de rendimento</li>
                  <li>• Reagente limitante</li>
                  <li>• Pureza de produtos</li>
                  <li>• Análise quantitativa</li>
                </ul>
                <Button asChild className="w-full mt-4" size="sm">
                  <a href="/estequiometria">Estudar Estequiometria</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
