import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Atom, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const concentrationTypes = [
  {
    name: "Molaridade (M)",
    formula: "$$M = \\frac{n}{V}$$",
    description: "Número de mols de soluto por litro de solução",
    unit: "mol/L",
    example: "Uma solução 1M de NaCl contém 1 mol de NaCl em 1L de solução",
    calculation: "Para 58,5g de NaCl em 1L: M = 58,5g ÷ 58,5g/mol ÷ 1L = 1M",
  },
  {
    name: "Molalidade (m)",
    formula: "$$m = \\frac{n}{kg_{solvente}}$$",
    description: "Número de mols de soluto por quilograma de solvente",
    unit: "mol/kg",
    example: "Uma solução 1m contém 1 mol de soluto em 1kg de solvente",
    calculation: "Para 58,5g de NaCl em 1kg de água: m = 1 mol ÷ 1kg = 1m",
  },
  {
    name: "Normalidade (N)",
    formula: "$$N = M \\times n_{eq}$$",
    description: "Número de equivalentes-grama por litro de solução",
    unit: "eq/L",
    example: "H₂SO₄ 1M = 2N (pois libera 2 H⁺)",
    calculation: "Para H₂SO₄ 0,5M: N = 0,5 × 2 = 1N",
  },
  {
    name: "Fração Molar (χ)",
    formula: "$$\\chi_A = \\frac{n_A}{n_{total}}$$",
    description: "Razão entre mols do componente e mols totais",
    unit: "adimensional",
    example: "Em uma mistura de 2 mols de A e 3 mols de B: χₐ = 2/5 = 0,4",
    calculation: "χₐ + χᵦ = 1 (soma das frações = 1)",
  },
  {
    name: "Porcentagem em Massa (%m/m)",
    formula: "$$\\%m/m = \\frac{m_{soluto}}{m_{solução}} \\times 100$$",
    description: "Massa do soluto dividida pela massa total da solução",
    unit: "%",
    example: "10g de sal em 90g de água = 10% m/m",
    calculation: "%m/m = 10g ÷ 100g × 100 = 10%",
  },
  {
    name: "Porcentagem em Volume (%v/v)",
    formula: "$$\\%v/v = \\frac{V_{soluto}}{V_{solução}} \\times 100$$",
    description: "Volume do soluto dividido pelo volume total da solução",
    unit: "%",
    example: "Álcool 70% significa 70mL de álcool em 100mL de solução",
    calculation: "%v/v = 70mL ÷ 100mL × 100 = 70%",
  },
  {
    name: "Partes por Milhão (ppm)",
    formula: "$$ppm = \\frac{m_{soluto}}{m_{solução}} \\times 10^6$$",
    description: "Massa do soluto em relação à massa da solução, multiplicada por 10⁶",
    unit: "ppm",
    example: "1mg de soluto em 1kg de solução = 1ppm",
    calculation: "Para 5mg de NaCl em 1kg de água: ppm = 5mg ÷ 1000g × 10⁶ = 5ppm",
  },
  {
    name: "Partes por Bilhão (ppb)",
    formula: "$$ppb = \\frac{m_{soluto}}{m_{solução}} \\times 10^9$$",
    description: "Massa do soluto em relação à massa da solução, multiplicada por 10⁹",
    unit: "ppb",
    example: "1μg de soluto em 1kg de solução = 1ppb",
    calculation: "Para 2μg de Pb em 1kg de água: ppb = 2μg ÷ 1000g × 10⁹ = 2ppb",
  },
  {
    name: "Densidade (d)",
    formula: "$$d = \\frac{m}{V}$$",
    description: "Massa da solução dividida pelo seu volume",
    unit: "g/mL ou g/cm³",
    example: "Uma solução com 120g em 100mL tem densidade 1,2 g/mL",
    calculation: "d = 120g ÷ 100mL = 1,2 g/mL",
  },
  {
    name: "Título (τ)",
    formula: "$$\\tau = \\frac{m_{soluto}}{m_{solução}}$$",
    description: "Razão entre a massa do soluto e a massa da solução",
    unit: "adimensional",
    example: "20g de sal em 100g de solução: τ = 0,2",
    calculation: "τ = 20g ÷ 100g = 0,2 ou 20%",
  },
]

const d = 1 // Declare the variable d before using it
const M = 1 // Declare the variable M before using it
const m = 1 // Declare the variable m before using it
const n_eq = 1 // Declare the variable n_eq before using it
const n_1 = 1 // Declare the variable n_1 before using it
const n_2 = 1 // Declare the variable n_2 before using it
const V_1 = 1 // Declare the variable V_1 before using it
const V_2 = 1 // Declare the variable V_2 before using it
const m_solucao = 1 // Declare the variable m_solucao before using it
const V_solucao = 1 // Declare the variable V_solucao before using it

export default function Concentracao() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Concentração de Soluções
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda os diferentes tipos de concentração e como calcular cada um deles.
          </p>
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Conceitos Fundamentais:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded">
              <h3 className="font-semibold text-lg mb-2">Soluto</h3>
              <p className="text-gray-600">Substância que se dissolve (menor quantidade)</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <h3 className="font-semibold text-lg mb-2">Solvente</h3>
              <p className="text-gray-600">Substância que dissolve (maior quantidade)</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <h3 className="font-semibold text-lg mb-2">Solução</h3>
              <p className="text-gray-600">Mistura homogênea de soluto + solvente</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {concentrationTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl text-blue-700">
                    {type.name}
                  </CardTitle>
                  <Badge variant="outline">
                    {type.unit}
                  </Badge>
                </div>
                <div className="text-center py-4 bg-gray-100 rounded">
                  <div className="text-lg">
                    {type.formula}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-700">
                  {type.description}
                </CardDescription>
                
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Exemplo:</strong> {type.example}
                  </p>
                </div>
                
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Cálculo:</strong> {type.calculation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Conversões Entre Concentrações
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Molaridade ↔ Normalidade</h3>
              <div className="bg-gray-100 p-4 rounded">
                <p className="mb-2">$$N = M \\times n_{eq}$$</p>
                <p className="text-sm text-gray-600">
                  onde n_eq é o número de equivalentes por mol
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Molaridade ↔ Molalidade</h3>
              <div className="bg-gray-100 p-4 rounded">
                <p className="mb-2">$$m = \\frac{M}{d - \\frac{M \\cdot MM}{1000}}$$</p>
                <p className="text-sm text-gray-600">
                  onde d é a densidade da solução (g/mL) e MM é a massa molar do soluto (g/mol)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Dicas para Cálculos:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Sempre verifique as unidades antes de calcular</li>
              <li>Molaridade usa volume da solução, molalidade usa massa do solvente</li>
              <li>Fração molar é adimensional e a soma de todas as frações = 1</li>
              <li>Para diluições: M₁V₁ = M₂V₂</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cálculos Práticos Passo a Passo
          </h2>
          
          <div className="space-y-8">
            {/* Problema 1 - Preparação de Solução */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Problema 1: Preparação de Solução Molar
              </h3>
              <div className="bg-blue-50 p-4 rounded mb-4">
                <p className="font-semibold">Questão:</p>
                <p>Como preparar 500mL de solução 0,1M de NaCl?</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Passo 1: Identificar os dados</p>
                  <p className="text-gray-600">• Volume final: 500mL = 0,5L</p>
                  <p className="text-gray-600">• Molaridade desejada: 0,1M</p>
                  <p className="text-gray-600">• Massa molar do NaCl: 58,5 g/mol</p>
                </div>
                <div>
                  <p className="font-semibold">Passo 2: Calcular os mols necessários</p>
                  <p className="text-gray-600">n = M × V = 0,1 mol/L × 0,5L = 0,05 mol</p>
                </div>
                <div>
                  <p className="font-semibold">Passo 3: Calcular a massa</p>
                  <p className="text-gray-600">m = n × MM = 0,05 mol × 58,5 g/mol = 2,925g</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-green-800 font-semibold">
                    Resposta: Dissolver 2,925g de NaCl em água e completar o volume para 500mL
                  </p>
                </div>
              </div>
            </div>

            {/* Problema 2 - Diluição */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Problema 2: Diluição de Solução
              </h3>
              <div className="bg-green-50 p-4 rounded mb-4">
                <p className="font-semibold">Questão:</p>
                <p>Quantos mL de HCl 2M são necessários para preparar 250mL de HCl 0,5M?</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Fórmula da diluição:</p>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="text-center">$$M_1 \\times V_1 = M_2 \\times V_2$$</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Dados:</p>
                  <p className="text-gray-600">• M₁ = 2M (concentração inicial)</p>
                  <p className="text-gray-600">• V₁ = ? (volume inicial a encontrar)</p>
                  <p className="text-gray-600">• M₂ = 0,5M (concentração final)</p>
                  <p className="text-gray-600">• V₂ = 250mL (volume final)</p>
                </div>
                <div>
                  <p className="font-semibold">Cálculo:</p>
                  <p className="text-gray-600">V₁ = (M₂ × V₂) ÷ M₁</p>
                  <p className="text-gray-600">V₁ = (0,5 × 250) ÷ 2 = 62,5mL</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-green-800 font-semibold">
                    Resposta: Usar 62,5mL de HCl 2M e completar com água até 250mL
                  </p>
                </div>
              </div>
            </div>

            {/* Problema 3 - Mistura de Soluções */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                Problema 3: Mistura de Soluções
              </h3>
              <div className="bg-purple-50 p-4 rounded mb-4">
                <p className="font-semibold">Questão:</p>
                <p>Misturar 100mL de NaOH 0,2M com 200mL de NaOH 0,5M. Qual a concentração final?</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Passo 1: Calcular mols de cada solução</p>
                  <p className="text-gray-600">n₁ = M₁ × V₁ = 0,2 × 0,1 = 0,02 mol</p>
                  <p className="text-gray-600">n₂ = M₂ × V₂ = 0,5 × 0,2 = 0,10 mol</p>
                </div>
                <div>
                  <p className="font-semibold">Passo 2: Somar mols e volumes</p>
                  <p className="text-gray-600">n_total = 0,02 + 0,10 = 0,12 mol</p>
                  <p className="text-gray-600">V_total = 100 + 200 = 300mL = 0,3L</p>
                </div>
                <div>
                  <p className="font-semibold">Passo 3: Calcular concentração final</p>
                  <p className="text-gray-600">M_final = n_total ÷ V_total = 0,12 ÷ 0,3 = 0,4M</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-purple-800 font-semibold">
                    Resposta: A concentração final é 0,4M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nova seção de fórmulas importantes */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Fórmulas Essenciais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Diluição</h3>
              <div className="text-center mb-2">$$M_1V_1 = M_2V_2$$</div>
              <p className="text-sm text-gray-600">Para preparar soluções menos concentradas</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Mistura</h3>
              <div className="text-center mb-2">$$M_f = \\frac{n_1 + n_2 + ...}{V_1 + V_2 + ...}$$</div>
              <p className="text-sm text-gray-600">Para misturar soluções diferentes</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Densidade</h3>
              <div className="text-center mb-2">$$d = \\frac{m_{solução}}{V_{solução}}$$</div>
              <p className="text-sm text-gray-600">Relaciona massa e volume da solução</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2\">Conversão M → m</h3>\
              <div className="text-center mb-2">$$m = \\frac{M}{d - \\frac{M \\cdot MM}{1000}}$$</div>
              <p className="text-sm text-gray-600">Molaridade para molalidade</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Título em %</h3>
              <div className="text-center mb-2">$$\\tau \\times 100$$</div>
              <p className="text-sm text-gray-600">Título multiplicado por 100</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">ppm ↔ mg/L</h3>
              <div className="text-center mb-2">$$1 ppm = 1 mg/L$$</div>
              <p className="text-sm text-gray-600">Para soluções aquosas diluídas</p>
            </div>
          </div>
        </div>

        {/* Tabela de conversões */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tabela de Conversões Rápidas
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">De</th>
                  <th className="border border-gray-300 p-3 text-left">Para</th>
                  <th className="border border-gray-300 p-3 text-left">Fórmula</th>
                  <th className="border border-gray-300 p-3 text-left">Observação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">g/L</td>
                  <td className="border border-gray-300 p-3">mol/L (M)</td>
                  <td className="border border-gray-300 p-3">M = (g/L) ÷ MM</td>
                  <td className="border border-gray-300 p-3">MM = massa molar</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">% m/m</td>
                  <td className="border border-gray-300 p-3">g/L</td>
                  <td className="border border-gray-300 p-3">g/L = (% × d × 10)</td>
                  <td className="border border-gray-300 p-3">d = densidade em g/mL</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">ppm</td>
                  <td className="border border-gray-300 p-3">mg/L</td>
                  <td className="border border-gray-300 p-3">mg/L = ppm</td>
                  <td className="border border-gray-300 p-3">Para soluções aquosas</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">ppb</td>
                  <td className="border border-gray-300 p-3">μg/L</td>
                  <td className="border border-gray-300 p-3">μg/L = ppb</td>
                  <td className="border border-gray-300 p-3">Para soluções aquosas</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Normalidade</td>
                  <td className="border border-gray-300 p-3">Molaridade</td>
                  <td className="border border-gray-300 p-3">M = N ÷ n_eq</td>
                  <td className="border border-gray-300 p-3">n_eq = nº de equivalentes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Seção de Integração com Carga Nuclear Efetiva */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Atom className="mr-2 h-6 w-6 text-indigo-600" />
            Conexão: Carga Nuclear Efetiva e Solubilidade
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Como Z_eff Afeta a Solubilidade</h3>
              
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-2">Energia de Hidratação</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    A carga nuclear efetiva determina quão fortemente os íons atraem moléculas de água.
                  </p>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-mono text-center mb-2">ΔH_hidratação ∝ (Z_eff)² / raio</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Maior Z_eff → maior atração por H₂O</li>
                      <li>• Maior hidratação → maior solubilidade</li>
                      <li>• Íons pequenos se hidratam mais facilmente</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">Exemplo: Haletos de Prata</h4>
                  <div className="space-y-2">
                    {[
                      { compound: "AgF", anion: "F⁻", zeff: "5.2", radius: "1.33", solubility: "Solúvel", ksp: "Não aplicável" },
                      { compound: "AgCl", anion: "Cl⁻", zeff: "6.1", radius: "1.81", solubility: "Pouco solúvel", ksp: "1.8×10⁻¹⁰" },
                      { compound: "AgBr", anion: "Br⁻", zeff: "6.8", radius: "1.96", solubility: "Insolúvel", ksp: "5.4×10⁻¹³" },
                      { compound: "AgI", anion: "I⁻", zeff: "7.2", radius: "2.20", solubility: "Muito insolúvel", ksp: "8.5×10⁻¹⁷" }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded text-xs">
                        <div className="font-mono font-bold">{data.compound}</div>
                        <div>Z_eff = {data.zeff}</div>
                        <div>r = {data.radius} Å</div>
                        <Badge variant={data.solubility.includes("Solúvel") ? "default" : "outline"} className="text-xs">
                          {data.solubility}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-2 bg-yellow-50 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>Tendência:</strong> Embora I⁻ tenha maior Z_eff, seu grande raio resulta 
                      em menor energia de rede, tornando AgI menos solúvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-700">Calculadora de Solubilidade</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-3">Solubilidade vs Z_eff (Cátions)</h4>
                
                <div className="space-y-3">
                  {[
                    { cation: "Li⁺", zeff: "2.0", radius: "0.76", hydration: "-519", solubility: "83.5 g/100mL", compound: "LiCl" },
                    { cation: "Na⁺", zeff: "2.2", radius: "1.02", hydration: "-409", solubility: "36.0 g/100mL", compound: "NaCl" },
                    { cation: "K⁺", zeff: "2.2", radius: "1.38", hydration: "-322", solubility: "34.4 g/100mL", compound: "KCl" },
                    { cation: "Cs⁺", zeff: "2.2", radius: "1.67", hydration: "-276", solubility: "186.5 g/100mL", compound: "CsCl" }
                  ].map((data, index) => (
                    <div key={index} className="p-3 bg-white rounded border">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-mono font-bold text-lg">{data.compound}</div>
                        <div className="text-sm font-semibold text-green-600">{data.solubility}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div>Z_eff: {data.zeff}</div>
                        <div>Raio: {data.radius} Å</div>
                        <div>ΔH_hid: {data.hydration} kJ/mol</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Observação:</strong> CsCl tem alta solubilidade apesar da baixa energia de hidratação 
                    devido à baixa energia de rede (íons grandes).
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Problema de Concentração</h4>
                
                <div className="bg-white p-4 rounded border">
                  <p className="text-sm font-semibold mb-2">Questão:</p>
                  <p className="text-sm text-gray-700 mb-3">
                    Sabendo que Li⁺ tem Z_eff = 2.0 e alta energia de hidratação, 
                    calcule a molaridade de uma solução preparada dissolvendo 8.5g de LiCl em 250mL de água.
                  </p>
                  
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Solução:</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>1. Massa molar LiCl = 6.9 + 35.5 = 42.4 g/mol</p>
                      <p>2. Mols de LiCl = 8.5g ÷ 42.4 g/mol = 0.20 mol</p>
                      <p>3. Volume = 250mL = 0.25L</p>
                      <p>4. Molaridade = 0.20 mol ÷ 0.25L = <strong>0.80 M</strong></p>
                      <p>5. Alta solubilidade devido ao Z_eff elevado do Li⁺</p>
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
