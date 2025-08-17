"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Award, RefreshCw } from "lucide-react"

const terms = [
  {
    term: "Átomo",
    definition: "A menor unidade de um elemento químico que mantém suas propriedades características.",
    category: "Estrutura",
    example: "Um átomo de carbono tem 6 prótons, 6 nêutrons e 6 elétrons",
    relatedTerms: ["Próton", "Nêutron", "Elétron"],
  },
  {
    term: "Molécula",
    definition: "Grupo de átomos unidos por ligações químicas, formando a menor unidade de um composto.",
    category: "Estrutura",
    example: "A molécula de água (H₂O) é formada por 2 átomos de hidrogênio e 1 de oxigênio",
    relatedTerms: ["Átomo", "Ligação Química", "Composto"],
  },
  {
    term: "Íon",
    definition: "Átomo ou grupo de átomos que perdeu ou ganhou elétrons, adquirindo carga elétrica.",
    category: "Estrutura",
    example: "Na⁺ (cátion) perdeu 1 elétron, Cl⁻ (ânion) ganhou 1 elétron",
    relatedTerms: ["Cátion", "Ânion", "Elétron"],
  },
  {
    term: "Próton",
    definition: "Partícula subatômica com carga positiva localizada no núcleo do átomo.",
    category: "Estrutura",
    example: "O número de prótons determina o número atômico do elemento",
    relatedTerms: ["Núcleo", "Número Atômico", "Nêutron"],
  },
  {
    term: "Nêutron",
    definition: "Partícula subatômica sem carga elétrica localizada no núcleo do átomo.",
    category: "Estrutura",
    example: "O carbono-12 tem 6 prótons e 6 nêutrons no núcleo",
    relatedTerms: ["Próton", "Núcleo", "Isótopo"],
  },
  {
    term: "Elétron",
    definition: "Partícula subatômica com carga negativa que orbita ao redor do núcleo atômico.",
    category: "Estrutura",
    example: "Os elétrons de valência participam das ligações químicas",
    relatedTerms: ["Orbital", "Camada Eletrônica", "Valência"],
  },
  {
    term: "Elemento",
    definition: "Substância pura formada por átomos com o mesmo número atômico.",
    category: "Classificação",
    example: "O oxigênio (O) é um elemento com número atômico 8",
    relatedTerms: ["Número Atômico", "Átomo", "Tabela Periódica"],
  },
  {
    term: "Composto",
    definition: "Substância formada pela combinação de dois ou mais elementos em proporções definidas.",
    category: "Classificação",
    example: "O cloreto de sódio (NaCl) é um composto formado por sódio e cloro",
    relatedTerms: ["Elemento", "Fórmula Química", "Ligação"],
  },
  {
    term: "Mistura",
    definition: "Sistema formado por duas ou mais substâncias que mantêm suas propriedades individuais.",
    category: "Classificação",
    example: "Água e óleo formam uma mistura heterogênea",
    relatedTerms: ["Substância", "Homogênea", "Heterogênea"],
  },
  {
    term: "Substância Pura",
    definition: "Material com composição química definida e propriedades constantes.",
    category: "Classificação",
    example: "Água destilada é uma substância pura composta apenas por H₂O",
    relatedTerms: ["Elemento", "Composto", "Mistura"],
  },
  {
    term: "Reação Química",
    definition: "Processo onde substâncias (reagentes) se transformam em outras substâncias (produtos).",
    category: "Reações",
    example: "2H₂ + O₂ → 2H₂O (formação da água)",
    relatedTerms: ["Reagente", "Produto", "Equação Química"],
  },
  {
    term: "Catalisador",
    definition: "Substância que acelera uma reação química sem ser consumida no processo.",
    category: "Reações",
    example: "Enzimas são catalisadores biológicos",
    relatedTerms: ["Reação", "Velocidade", "Enzima"],
  },
  {
    term: "Oxidação",
    definition: "Processo onde uma substância perde elétrons, aumentando seu número de oxidação.",
    category: "Reações",
    example: "Fe → Fe²⁺ + 2e⁻ (ferro perde elétrons)",
    relatedTerms: ["Redução", "Elétron", "Número de Oxidação"],
  },
  {
    term: "Redução",
    definition: "Processo onde uma substância ganha elétrons, diminuindo seu número de oxidação.",
    category: "Reações",
    example: "Cu²⁺ + 2e⁻ → Cu (cobre ganha elétrons)",
    relatedTerms: ["Oxidação", "Elétron", "Número de Oxidação"],
  },
  {
    term: "Reagente",
    definition: "Substância que participa de uma reação química sendo consumida no processo.",
    category: "Reações",
    example: "Na reação 2H₂ + O₂ → 2H₂O, H₂ e O₂ são reagentes",
    relatedTerms: ["Produto", "Reação Química", "Estequiometria"],
  },
  {
    term: "Produto",
    definition: "Substância formada como resultado de uma reação química.",
    category: "Reações",
    example: "Na reação 2H₂ + O₂ → 2H₂O, H₂O é o produto",
    relatedTerms: ["Reagente", "Reação Química", "Rendimento"],
  },
  {
    term: "Ligação Covalente",
    definition: "Ligação química formada pelo compartilhamento de pares de elétrons entre átomos.",
    category: "Ligações",
    example: "Na molécula H₂, os átomos compartilham um par de elétrons",
    relatedTerms: ["Elétron", "Molécula", "Compartilhamento"],
  },
  {
    term: "Ligação Iônica",
    definition: "Ligação química formada pela transferência de elétrons entre átomos.",
    category: "Ligações",
    example: "No NaCl, o Na⁺ transfere um elétron para o Cl⁻",
    relatedTerms: ["Íon", "Transferência", "Cátion", "Ânion"],
  },
  {
    term: "Ligação Metálica",
    definition: "Ligação química característica dos metais, onde elétrons se movem livremente.",
    category: "Ligações",
    example: "No ferro metálico, elétrons formam um 'mar eletrônico'",
    relatedTerms: ["Metal", "Condutividade", "Elétron"],
  },
  {
    term: "Polaridade",
    definition: "Distribuição desigual de cargas elétricas em uma molécula ou ligação.",
    category: "Ligações",
    example: "A água é polar devido à diferença de eletronegatividade entre O e H",
    relatedTerms: ["Eletronegatividade", "Dipolo", "Solubilidade"],
  },
  {
    term: "pH",
    definition: "Medida da acidez ou basicidade de uma solução, baseada na concentração de íons H⁺.",
    category: "Soluções",
    example: "pH 7 é neutro, pH < 7 é ácido, pH > 7 é básico",
    relatedTerms: ["Ácido", "Base", "Íon H⁺"],
  },
  {
    term: "Molaridade",
    definition: "Concentração expressa em mols de soluto por litro de solução.",
    category: "Soluções",
    example: "Uma solução 1M contém 1 mol de soluto em 1L de solução",
    relatedTerms: ["Mol", "Concentração", "Solução"],
  },
  {
    term: "Soluto",
    definition: "Substância que se dissolve em um solvente para formar uma solução.",
    category: "Soluções",
    example: "Açúcar é o soluto quando dissolvido em água",
    relatedTerms: ["Solvente", "Solução", "Dissolução"],
  },
  {
    term: "Solvente",
    definition: "Substância que dissolve o soluto, geralmente presente em maior quantidade.",
    category: "Soluções",
    example: "Água é o solvente universal mais comum",
    relatedTerms: ["Soluto", "Solução", "Solubilidade"],
  },
  {
    term: "Solubilidade",
    definition: "Capacidade máxima de uma substância se dissolver em um solvente.",
    category: "Soluções",
    example: "A solubilidade do sal em água é de 36g/100mL a 20°C",
    relatedTerms: ["Saturação", "Precipitação", "Temperatura"],
  },
  {
    term: "Estequiometria",
    definition: "Cálculo das quantidades de reagentes e produtos em reações químicas.",
    category: "Cálculos",
    example: "Na reação 2H₂ + O₂ → 2H₂O, 2 mols de H₂ produzem 2 mols de H₂O",
    relatedTerms: ["Mol", "Reação", "Proporção"],
  },
  {
    term: "Mol",
    definition: "Unidade de quantidade de matéria que contém 6,02 × 10²³ entidades.",
    category: "Cálculos",
    example: "1 mol de carbono contém 6,02 × 10²³ átomos de carbono",
    relatedTerms: ["Número de Avogadro", "Massa Molar", "Quantidade"],
  },
  {
    term: "Massa Molar",
    definition: "Massa de um mol de uma substância, expressa em gramas por mol.",
    category: "Cálculos",
    example: "A massa molar da água (H₂O) é 18 g/mol",
    relatedTerms: ["Mol", "Massa Atômica", "Fórmula Molecular"],
  },
  {
    term: "Número de Avogadro",
    definition: "Constante que representa o número de entidades em um mol: 6,02 × 10²³.",
    category: "Cálculos",
    example: "1 mol de qualquer substância contém 6,02 × 10²³ partículas",
    relatedTerms: ["Mol", "Constante", "Quantidade de Matéria"],
  },
  {
    term: "Ácido",
    definition: "Substância que libera íons H⁺ (prótons) em solução aquosa.",
    category: "Ácidos e Bases",
    example: "HCl é um ácido forte que se ioniza completamente em água",
    relatedTerms: ["Base", "pH", "Ionização"],
  },
  {
    term: "Base",
    definition: "Substância que libera íons OH⁻ ou aceita prótons em solução.",
    category: "Ácidos e Bases",
    example: "NaOH é uma base forte que libera íons OH⁻",
    relatedTerms: ["Ácido", "pOH", "Neutralização"],
  },
  {
    term: "Sal",
    definition: "Composto iônico formado pela reação entre um ácido e uma base.",
    category: "Ácidos e Bases",
    example: "NaCl é formado pela reação entre HCl e NaOH",
    relatedTerms: ["Ácido", "Base", "Neutralização"],
  },
  {
    term: "Neutralização",
    definition: "Reação entre um ácido e uma base que produz sal e água.",
    category: "Ácidos e Bases",
    example: "HCl + NaOH → NaCl + H₂O",
    relatedTerms: ["Ácido", "Base", "Sal"],
  },
  {
    term: "Orbital",
    definition: "Região do espaço ao redor do núcleo onde há maior probabilidade de encontrar um elétron.",
    category: "Estrutura Atômica",
    example: "O orbital 1s pode conter no máximo 2 elétrons",
    relatedTerms: ["Elétron", "Camada Eletrônica", "Subnível"],
  },
  {
    term: "Configuração Eletrônica",
    definition: "Distribuição dos elétrons nos orbitais de um átomo.",
    category: "Estrutura Atômica",
    example: "A configuração do carbono é 1s² 2s² 2p²",
    relatedTerms: ["Orbital", "Elétron", "Camada"],
  },
  {
    term: "Valência",
    definition: "Capacidade de um átomo de formar ligações químicas.",
    category: "Estrutura Atômica",
    example: "O carbono tem valência 4, podendo formar 4 ligações",
    relatedTerms: ["Ligação", "Elétron de Valência", "Camada Externa"],
  },
  {
    term: "Eletronegatividade",
    definition: "Tendência de um átomo de atrair elétrons em uma ligação química.",
    category: "Propriedades",
    example: "O flúor é o elemento mais eletronegativo (4,0 na escala de Pauling)",
    relatedTerms: ["Ligação", "Polaridade", "Escala de Pauling"],
  },
  {
    term: "Energia de Ionização",
    definition: "Energia necessária para remover um elétron de um átomo gasoso.",
    category: "Propriedades",
    example: "A energia de ionização aumenta da esquerda para direita na tabela periódica",
    relatedTerms: ["Elétron", "Íon", "Tendência Periódica"],
  },
  {
    term: "Raio Atômico",
    definition: "Distância do núcleo até a camada eletrônica mais externa.",
    category: "Propriedades",
    example: "O raio atômico diminui da esquerda para direita no período",
    relatedTerms: ["Núcleo", "Camada Eletrônica", "Tendência Periódica"],
  },
  {
    term: "Isótopo",
    definition: "Átomos do mesmo elemento com diferentes números de nêutrons.",
    category: "Estrutura Atômica",
    example: "Carbono-12 e Carbono-14 são isótopos do carbono",
    relatedTerms: ["Nêutron", "Massa Atômica", "Radioatividade"],
  },
  {
    term: "Cátion",
    definition: "Íon com carga positiva formado pela perda de elétrons.",
    category: "Estrutura",
    example: "Na⁺ é um cátion formado quando o sódio perde um elétron",
    relatedTerms: ["Íon", "Ânion", "Elétron"],
  },
  {
    term: "Ânion",
    definition: "Íon com carga negativa formado pelo ganho de elétrons.",
    category: "Estrutura",
    example: "Cl⁻ é um ânion formado quando o cloro ganha um elétron",
    relatedTerms: ["Íon", "Cátion", "Elétron"],
  },
  {
    term: "Equação Química",
    definition: "Representação simbólica de uma reação química usando fórmulas.",
    category: "Reações",
    example: "2H₂ + O₂ → 2H₂O representa a formação da água",
    relatedTerms: ["Reação", "Fórmula", "Balanceamento"],
  },
  {
    term: "Balanceamento",
    definition: "Processo de igualar o número de átomos de cada elemento nos dois lados da equação.",
    category: "Reações",
    example: "H₂ + O₂ → H₂O deve ser balanceada como 2H₂ + O₂ → 2H₂O",
    relatedTerms: ["Equação", "Conservação da Massa", "Coeficiente"],
  },
  {
    term: "Estado de Oxidação",
    definition:
      "Carga hipotética que um átomo teria se todos os elétrons de ligação fossem atribuídos ao átomo mais eletronegativo.",
    category: "Reações",
    example: "No H₂O, o oxigênio tem estado de oxidação -2 e o hidrogênio +1",
    relatedTerms: ["Oxidação", "Redução", "Eletronegatividade"],
  },
  {
    term: "Hibridização",
    definition: "Mistura de orbitais atômicos para formar novos orbitais híbridos.",
    category: "Ligações",
    example: "No metano (CH₄), o carbono apresenta hibridização sp³",
    relatedTerms: ["Orbital", "Geometria Molecular", "Ligação"],
  },
  {
    term: "Geometria Molecular",
    definition: "Arranjo tridimensional dos átomos em uma molécula.",
    category: "Estrutura",
    example: "A água tem geometria angular devido aos pares de elétrons não ligantes",
    relatedTerms: ["Molécula", "VSEPR", "Hibridização"],
  },
  {
    term: "Força Intermolecular",
    definition: "Forças de atração entre moléculas diferentes.",
    category: "Ligações",
    example: "Ligações de hidrogênio entre moléculas de água",
    relatedTerms: ["Van der Waals", "Dipolo", "Ponto de Ebulição"],
  },
  {
    term: "Entalpia",
    definition: "Medida do conteúdo de calor de um sistema químico.",
    category: "Termodinâmica",
    example: "A entalpia de combustão do metano é -890 kJ/mol",
    relatedTerms: ["Energia", "Calor", "Reação Exotérmica"],
  },
  {
    term: "Entropia",
    definition: "Medida da desordem ou aleatoriedade de um sistema.",
    category: "Termodinâmica",
    example: "A entropia aumenta quando o gelo derrete",
    relatedTerms: ["Desordem", "Espontaneidade", "Segunda Lei"],
  },
  {
    term: "Energia de Ativação",
    definition: "Energia mínima necessária para que uma reação química ocorra.",
    category: "Cinética",
    example: "Catalisadores diminuem a energia de ativação das reações",
    relatedTerms: ["Catalisador", "Velocidade", "Barreira Energética"],
  },
  {
    term: "Velocidade de Reação",
    definition: "Medida de quão rapidamente reagentes se convertem em produtos.",
    category: "Cinética",
    example: "A velocidade aumenta com temperatura e concentração",
    relatedTerms: ["Concentração", "Temperatura", "Catalisador"],
  },
  {
    term: "Equilíbrio Químico",
    definition: "Estado onde as velocidades das reações direta e inversa são iguais.",
    category: "Equilíbrio",
    example: "N₂ + 3H₂ ⇌ 2NH₃ (síntese da amônia)",
    relatedTerms: ["Constante de Equilíbrio", "Le Chatelier", "Reversível"],
  },
  {
    term: "Constante de Equilíbrio",
    definition: "Valor que expressa a relação entre concentrações de produtos e reagentes no equilíbrio.",
    category: "Equilíbrio",
    example: "Kc = [produtos]/[reagentes] para reações em equilíbrio",
    relatedTerms: ["Equilíbrio", "Concentração", "Temperatura"],
  },
  {
    term: "Princípio de Le Chatelier",
    definition: "Sistema em equilíbrio responde a perturbações deslocando o equilíbrio para minimizar a mudança.",
    category: "Equilíbrio",
    example: "Aumentar pressão desloca equilíbrio para lado com menos mols de gás",
    relatedTerms: ["Equilíbrio", "Perturbação", "Deslocamento"],
  },
  {
    term: "Pressão de Vapor",
    definition: "Pressão exercida pelo vapor de um líquido em equilíbrio com sua fase líquida.",
    category: "Estados da Matéria",
    example: "Água tem pressão de vapor de 1 atm a 100°C",
    relatedTerms: ["Evaporação", "Ponto de Ebulição", "Equilíbrio"],
  },
  {
    term: "Ponto de Fusão",
    definition: "Temperatura na qual um sólido se transforma em líquido à pressão constante.",
    category: "Estados da Matéria",
    example: "O ponto de fusão do gelo é 0°C a 1 atm",
    relatedTerms: ["Fusão", "Sólido", "Líquido"],
  },
  {
    term: "Ponto de Ebulição",
    definition: "Temperatura na qual a pressão de vapor de um líquido iguala a pressão externa.",
    category: "Estados da Matéria",
    example: "Água ferve a 100°C ao nível do mar",
    relatedTerms: ["Ebulição", "Pressão de Vapor", "Líquido"],
  },
  {
    term: "Sublimação",
    definition: "Mudança direta do estado sólido para gasoso sem passar pelo líquido.",
    category: "Estados da Matéria",
    example: "Gelo seco (CO₂ sólido) sublima a -78°C",
    relatedTerms: ["Sólido", "Gás", "Mudança de Estado"],
  },
]

const categories = [
  "Estrutura",
  "Classificação",
  "Reações",
  "Ligações",
  "Soluções",
  "Cálculos",
  "Ácidos e Bases",
  "Estrutura Atômica",
  "Propriedades",
  "Termodinâmica",
  "Cinética",
  "Equilíbrio",
  "Estados da Matéria",
]

const categoryColors = {
  Estrutura: "bg-blue-100 text-blue-800",
  Classificação: "bg-green-100 text-green-800",
  Reações: "bg-purple-100 text-purple-800",
  Ligações: "bg-orange-100 text-orange-800",
  Soluções: "bg-pink-100 text-pink-800",
  Cálculos: "bg-yellow-100 text-yellow-800",
  "Ácidos e Bases": "bg-red-100 text-red-800",
  "Estrutura Atômica": "bg-indigo-100 text-indigo-800",
  Propriedades: "bg-teal-100 text-teal-800",
  Termodinâmica: "bg-cyan-100 text-cyan-800",
  Cinética: "bg-lime-100 text-lime-800",
  Equilíbrio: "bg-amber-100 text-amber-800",
  "Estados da Matéria": "bg-violet-100 text-violet-800",
}

const quizQuestions = [
  {
    question: "O que é um átomo?",
    options: [
      "A menor unidade de um elemento",
      "Um grupo de moléculas",
      "Uma substância pura",
      "Uma mistura homogênea",
    ],
    correct: 0,
  },
  {
    question: "Qual é a diferença entre um cátion e um ânion?",
    options: [
      "Cátion é negativo, ânion é positivo",
      "Cátion é positivo, ânion é negativo",
      "Não há diferença",
      "Ambos são neutros",
    ],
    correct: 1,
  },
  {
    question: "O que caracteriza uma reação química?",
    options: [
      "Mudança de estado físico",
      "Transformação de substâncias",
      "Mistura de componentes",
      "Separação de fases",
    ],
    correct: 1,
  },
  {
    question: "Qual é a unidade de quantidade de matéria?",
    options: ["Grama", "Litro", "Mol", "Átomo"],
    correct: 2,
  },
  {
    question: "O que é pH?",
    options: ["Medida de temperatura", "Medida de acidez ou basicidade", "Medida de densidade", "Medida de pressão"],
    correct: 1,
  },
  {
    question: "Qual tipo de ligação ocorre entre Na⁺ e Cl⁻?",
    options: ["Ligação covalente", "Ligação metálica", "Ligação iônica", "Ligação de hidrogênio"],
    correct: 2,
  },
  {
    question: "O que é um catalisador?",
    options: [
      "Substância que é consumida na reação",
      "Substância que acelera a reação sem ser consumida",
      "Produto da reação",
      "Reagente principal",
    ],
    correct: 1,
  },
  {
    question: "Qual é o número de Avogadro?",
    options: ["6,02 × 10²²", "6,02 × 10²³", "6,02 × 10²⁴", "6,02 × 10²¹"],
    correct: 1,
  },
]

export default function TermosQuimicos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
    setShowQuiz(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Termos Químicos Essenciais</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Domine o vocabulário fundamental da química. Estes termos são a base para compreender conceitos mais
            avançados.
          </p>
        </div>

        {/* Controles de Busca e Filtro */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar termos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant={showQuiz ? "default" : "outline"}
              className="flex items-center space-x-2"
            >
              <Award className="h-4 w-4" />
              <span>{showQuiz ? "Voltar aos Termos" : "Fazer Quiz"}</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Todos ({terms.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({terms.filter((t) => t.category === category).length})
              </Button>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        {showQuiz && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Award className="mr-2 h-6 w-6 text-yellow-500" />
              Quiz de Termos Químicos
            </h2>

            {!quizCompleted ? (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Pergunta {currentQuestion + 1} de {quizQuestions.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      Pontuação: {score}/{currentQuestion}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">{quizQuestions[currentQuestion].question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start h-auto p-4 bg-transparent"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score}/{quizQuestions.length}
                  </div>
                  <div className="text-lg text-gray-600">
                    {score === quizQuestions.length
                      ? "Perfeito! 🎉"
                      : score >= quizQuestions.length * 0.7
                        ? "Muito bem! 👏"
                        : "Continue estudando! 📚"}
                  </div>
                </div>
                <Button onClick={resetQuiz} className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Tentar Novamente</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Termos */}
        {!showQuiz && (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Mostrando {filteredTerms.length} de {terms.length} termos
                {searchTerm && ` para "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTerms.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-blue-700">{item.term}</CardTitle>
                      <Badge className={categoryColors[item.category as keyof typeof categoryColors]}>
                        {item.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-700 leading-relaxed">{item.definition}</CardDescription>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Exemplo:</strong> {item.example}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Termos relacionados:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.relatedTerms.map((relatedTerm, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum termo encontrado</h3>
                <p className="text-gray-500">Tente ajustar sua busca ou filtros</p>
              </div>
            )}
          </>
        )}

        {/* Dica de Estudo */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dicas de Estudo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Como memorizar termos</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Crie associações mentais com exemplos do cotidiano</li>
                <li>Use flashcards para revisão regular</li>
                <li>Pratique com o quiz interativo</li>
                <li>Relacione termos entre si</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Estratégias de aprendizado</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Estude por categorias temáticas</li>
                <li>Desenhe diagramas e esquemas</li>
                <li>Explique os conceitos para outras pessoas</li>
                <li>Aplique os termos em exercícios práticos</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
