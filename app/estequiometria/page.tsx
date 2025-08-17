import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Atom, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: 1,
    title: "Balancear a Equação",
    description: "Certifique-se de que a equação química está balanceada",
    example: "2H₂ + O₂ → 2H₂O",
  },
  {
    step: 2,
    title: "Identificar Dados",
    description: "Determine o que é dado e o que precisa ser encontrado",
    example: "Dado: 4g de H₂. Encontrar: massa de H₂O produzida",
  },
  {
    step: 3,
    title: "Converter para Mols",
    description: "Use a massa molar para converter massa em mols",
    example: "n(H₂) = 4g ÷ 2g/mol = 2 mols",
  },
  {
    step: 4,
    title: "Usar Proporção",
    description: "Use os coeficientes da equação balanceada",
    example: "2 mols H₂ : 2 mols H₂O = 2 : 2",
  },
  {
    step: 5,
    title: "Calcular Resultado",
    description: "Converta de volta para a unidade desejada",
    example: "m(H₂O) = 2 mols × 18g/mol = 36g",
  },
]

const problemTypes = [
  {
    type: "Massa-Massa",
    description: "Relaciona massas de reagentes e produtos",
    formula: "$$\\frac{m_1}{MM_1} \\times \\frac{coef_2}{coef_1} \\times MM_2 = m_2$$",
    example: "Quantos gramas de CO₂ são produzidos a partir de 12g de C?",
    solution: "C + O₂ → CO₂\n12g C × (1 mol C/12g) × (1 mol CO₂/1 mol C) × (44g/1 mol CO₂) = 44g CO₂",
  },
  {
    type: "Massa-Volume",
    description: "Relaciona massa de uma substância com volume de gás",
    formula: "$$n = \\frac{m}{MM} = \\frac{V}{22.4L} \\text{ (CNTP)}$$",
    example: "Que volume de H₂ (CNTP) é produzido a partir de 2g de Zn?",
    solution: "Zn + HCl → ZnCl₂ + H₂\n2g Zn × (1 mol/65g) × (1 mol H₂/1 mol Zn) × (22.4L/1 mol) = 0,69L",
  },
  {
    type: "Reagente Limitante",
    description: "Determina qual reagente se esgota primeiro",
    formula: "Compare as razões: $$\\frac{n_{disponível}}{coef_{equação}}$$",
    example: "2g H₂ + 32g O₂ → H₂O. Qual é o reagente limitante?",
    solution: "H₂: 2g/2g/mol = 1 mol; razão = 1/2 = 0,5\nO₂: 32g/32g/mol = 1 mol; razão = 1/1 = 1\nH₂ é limitante",
  },
  {
    type: "Rendimento",
    description: "Calcula eficiência real vs teórica da reação",
    formula: "$$\\text{Rendimento} = \\frac{\\text{Produto Real}}{\\text{Produto Teórico}} \\times 100\\%$$",
    example: "Teoricamente: 36g H₂O. Obtido: 30g H₂O. Rendimento?",
    solution: "Rendimento = (30g/36g) × 100% = 83,3%",
  },
]

export default function Estequiometria() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Estequiometria</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda a calcular quantidades em reações químicas usando relações estequiométricas.
          </p>
        </div>

        <div className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">O que é Estequiometria?</h2>
          <p className="text-gray-600 mb-4">
            A estequiometria é o cálculo das quantidades de reagentes e produtos em reações químicas. Baseia-se na Lei
            da Conservação da Massa: "a massa não se cria nem se destrói, apenas se transforma".
          </p>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-blue-800 font-semibold">
              Princípio Fundamental: Os coeficientes da equação balanceada representam a proporção em mols entre as
              substâncias.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Passos para Resolver Problemas</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-3">{step.description}</CardDescription>
                  <div className="bg-gray-100 p-2 rounded text-xs text-center">{step.example}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de Problemas Estequiométricos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {problemTypes.map((problem, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-700">{problem.type}</CardTitle>
                    <Badge variant="outline">Tipo {index + 1}</Badge>
                  </div>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Fórmula:</h4>
                    <div className="bg-gray-100 p-3 rounded text-center">{problem.formula}</div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Exemplo:</h4>
                    <p className="text-sm text-gray-700 mb-2">{problem.example}</p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm text-green-800 whitespace-pre-line">
                        <strong>Solução:</strong>
                        <br />
                        {problem.solution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conceitos Importantes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Massa Molar</h3>
              <div className="space-y-3">
                <p className="text-gray-600">Massa de 1 mol de uma substância, expressa em g/mol.</p>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm">
                    <strong>Exemplo:</strong>
                    <br />
                    H₂O: (2 × 1) + (1 × 16) = 18 g/mol
                    <br />
                    CO₂: (1 × 12) + (2 × 16) = 44 g/mol
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Volume Molar</h3>
              <div className="space-y-3">
                <p className="text-gray-600">Volume ocupado por 1 mol de gás nas CNTP = 22,4 L.</p>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm">
                    <strong>CNTP:</strong>
                    <br />
                    Temperatura: 0°C (273K)
                    <br />
                    Pressão: 1 atm (760 mmHg)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Número de Avogadro</h3>
              <div className="space-y-3">
                <p className="text-gray-600">1 mol = 6,02 × 10²³ entidades (átomos, moléculas, íons).</p>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm">
                    <strong>Aplicação:</strong>
                    <br />1 mol de H₂O = 6,02 × 10²³ moléculas
                    <br />1 mol de NaCl = 6,02 × 10²³ unidades fórmula
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Dicas de Resolução</h3>
              <div className="space-y-2">
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Sempre balance a equação primeiro</li>
                  <li>Identifique claramente o que é dado e o que é pedido</li>
                  <li>Use regra de três ou análise dimensional</li>
                  <li>Verifique se as unidades estão corretas</li>
                  <li>Para reagente limitante, calcule para todos os reagentes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Integração com Carga Nuclear Efetiva */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Atom className="mr-2 h-6 w-6 text-indigo-600" />
            Conexão: Carga Nuclear Efetiva e Reatividade
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Como Z_eff Influencia as Reações</h3>

              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-2">Velocidade de Reação</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    A carga nuclear efetiva determina a facilidade com que os átomos participam de reações químicas.
                  </p>

                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • <strong>Menor Z_eff</strong> → elétrons mais externos → maior reatividade
                    </li>
                    <li>
                      • <strong>Maior Z_eff</strong> → elétrons mais internos → menor reatividade
                    </li>
                    <li>
                      • <strong>Energia de ativação</strong> relacionada com Z_eff dos reagentes
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">Exemplo: Metais Alcalinos + Água</h4>
                  <div className="space-y-2">
                    {[
                      { metal: "Li", zeff: "1.3", equation: "2Li + 2H₂O → 2LiOH + H₂", rate: "Lenta", energy: "Alta" },
                      {
                        metal: "Na",
                        zeff: "2.2",
                        equation: "2Na + 2H₂O → 2NaOH + H₂",
                        rate: "Moderada",
                        energy: "Média",
                      },
                      { metal: "K", zeff: "2.2", equation: "2K + 2H₂O → 2KOH + H₂", rate: "Rápida", energy: "Baixa" },
                      {
                        metal: "Cs",
                        zeff: "2.2",
                        equation: "2Cs + 2H₂O → 2CsOH + H₂",
                        rate: "Explosiva",
                        energy: "Muito baixa",
                      },
                    ].map((data, index) => (
                      <div key={index} className="p-3 bg-white rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-mono font-bold">{data.metal}</div>
                          <div className="text-sm">Z_eff = {data.zeff}</div>
                          <Badge
                            variant={
                              data.rate === "Explosiva"
                                ? "destructive"
                                : data.rate === "Rápida"
                                  ? "default"
                                  : data.rate === "Moderada"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {data.rate}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 font-mono">{data.equation}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 p-2 bg-yellow-50 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>Paradoxo:</strong> Embora Na, K e Cs tenham Z_eff similar, o aumento do raio atômico
                      facilita a perda do elétron, aumentando drasticamente a reatividade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Cálculos Estequiométricos Avançados</h3>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-3">Problema Integrado</h4>

                <div className="bg-white p-4 rounded border">
                  <p className="text-sm font-semibold mb-2">Questão Complexa:</p>
                  <p className="text-sm text-gray-700 mb-3">
                    O sódio (Z_eff = 2.2) reage vigorosamente com água. Se 2.3g de Na reagem completamente:
                  </p>

                  <div className="text-sm text-gray-700 mb-3">
                    <p className="font-mono bg-gray-100 p-2 rounded">2Na + 2H₂O → 2NaOH + H₂</p>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">Calcule:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside mb-3">
                    <li>a) Massa de NaOH produzida</li>
                    <li>b) Volume de H₂ liberado (CNTP)</li>
                    <li>c) Molaridade da solução final (volume = 500mL)</li>
                  </ul>

                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Solução Completa:</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <strong>Dados:</strong> MM(Na) = 23 g/mol, MM(NaOH) = 40 g/mol
                      </p>
                      <p>
                        <strong>a) Massa de NaOH:</strong>
                      </p>
                      <p>• Mols de Na = 2.3g ÷ 23 g/mol = 0.1 mol</p>
                      <p>• Proporção: 2 mol Na : 2 mol NaOH = 1:1</p>
                      <p>• Mols de NaOH = 0.1 mol</p>
                      <p>
                        • Massa de NaOH = 0.1 mol × 40 g/mol = <strong>4.0g</strong>
                      </p>

                      <p>
                        <strong>b) Volume de H₂:</strong>
                      </p>
                      <p>• Proporção: 2 mol Na : 1 mol H₂</p>
                      <p>• Mols de H₂ = 0.1 mol ÷ 2 = 0.05 mol</p>
                      <p>
                        • Volume H₂ = 0.05 mol × 22.4 L/mol = <strong>1.12 L</strong>
                      </p>

                      <p>
                        <strong>c) Molaridade:</strong>
                      </p>
                      <p>
                        • M = 0.1 mol NaOH ÷ 0.5 L = <strong>0.2 M</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Influência do Z_eff na Cinética</h4>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">Energia de Ativação vs Z_eff</h5>
                    <div className="text-xs text-gray-600">
                      <p>Para a reação: M + H₂O → MOH + ½H₂</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Li (Z_eff = 1.3): E_a = 45 kJ/mol</li>
                        <li>Na (Z_eff = 2.2): E_a = 32 kJ/mol</li>
                        <li>K (Z_eff = 2.2): E_a = 18 kJ/mol</li>
                        <li>Cs (Z_eff = 2.2): E_a = 8 kJ/mol</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">Constante de Velocidade</h5>
                    <div className="text-xs text-gray-600">
                      <p>k = A × e^(-E_a/RT)</p>
                      <p>Menor E_a → maior k → reação mais rápida</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild className="w-full">
                  <a href="/carga-nuclear-efetiva" className="flex items-center justify-center space-x-2">
                    <Atom className="h-4 w-4" />
                    <span>Estudar Carga Nuclear Efetiva</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
