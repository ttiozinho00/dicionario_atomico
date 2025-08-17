"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Beaker, AlertTriangle, Atom, ArrowRight } from "lucide-react"

const phExamples = [
  { substance: "Ácido de bateria", ph: 0, type: "Ácido muito forte", color: "bg-red-600", danger: "high" },
  { substance: "Suco de limão", ph: 2, type: "Ácido forte", color: "bg-red-400", danger: "medium" },
  { substance: "Vinagre", ph: 3, type: "Ácido moderado", color: "bg-orange-400", danger: "low" },
  { substance: "Café", ph: 5, type: "Ácido fraco", color: "bg-yellow-400", danger: "none" },
  { substance: "Chuva ácida", ph: 5.5, type: "Ácido fraco", color: "bg-yellow-300", danger: "low" },
  { substance: "Água pura", ph: 7, type: "Neutro", color: "bg-green-400", danger: "none" },
  { substance: "Sangue humano", ph: 7.4, type: "Base fraca", color: "bg-blue-300", danger: "none" },
  { substance: "Bicarbonato", ph: 9, type: "Base moderada", color: "bg-blue-400", danger: "none" },
  { substance: "Amônia", ph: 11, type: "Base forte", color: "bg-blue-600", danger: "medium" },
  { substance: "Soda cáustica", ph: 14, type: "Base muito forte", color: "bg-purple-600", danger: "high" },
]

const indicators = [
  {
    name: "Papel Tornassol",
    acidColor: "Vermelho",
    baseColor: "Azul",
    range: "Qualitativo",
    description: "Indicador simples para ácido/base",
  },
  {
    name: "Fenolftaleína",
    acidColor: "Incolor",
    baseColor: "Rosa/Magenta",
    range: "pH 8.2 - 10.0",
    description: "Usado em titulações ácido-base",
  },
  {
    name: "Azul de Bromotimol",
    acidColor: "Amarelo",
    baseColor: "Azul",
    range: "pH 6.0 - 7.6",
    description: "Ideal para pH próximo ao neutro",
  },
  {
    name: "Papel pH Universal",
    acidColor: "Vermelho/Laranja",
    baseColor: "Verde/Azul/Roxo",
    range: "pH 1 - 14",
    description: "Medição aproximada de toda escala",
  },
]

export default function PhPoh() {
  const [hConcentration, setHConcentration] = useState("")
  const [ohConcentration, setOhConcentration] = useState("")
  const [calculatedPh, setCalculatedPh] = useState<number | null>(null)
  const [calculatedPoh, setCalculatedPoh] = useState<number | null>(null)
  const [calculationType, setCalculationType] = useState<"h" | "oh">("h")

  const calculatePh = () => {
    if (calculationType === "h" && hConcentration) {
      const h = Number.parseFloat(hConcentration)
      if (h > 0) {
        const ph = -Math.log10(h)
        const poh = 14 - ph
        setCalculatedPh(ph)
        setCalculatedPoh(poh)
      }
    } else if (calculationType === "oh" && ohConcentration) {
      const oh = Number.parseFloat(ohConcentration)
      if (oh > 0) {
        const poh = -Math.log10(oh)
        const ph = 14 - poh
        setCalculatedPh(ph)
        setCalculatedPoh(poh)
      }
    }
  }

  const resetCalculator = () => {
    setHConcentration("")
    setOhConcentration("")
    setCalculatedPh(null)
    setCalculatedPoh(null)
  }

  const getPhClassification = (ph: number) => {
    if (ph < 3) return { type: "Ácido muito forte", color: "text-red-600", bg: "bg-red-50" }
    if (ph < 5) return { type: "Ácido forte", color: "text-red-500", bg: "bg-red-50" }
    if (ph < 7) return { type: "Ácido fraco", color: "text-orange-500", bg: "bg-orange-50" }
    if (ph === 7) return { type: "Neutro", color: "text-green-600", bg: "bg-green-50" }
    if (ph < 9) return { type: "Base fraca", color: "text-blue-500", bg: "bg-blue-50" }
    if (ph < 12) return { type: "Base forte", color: "text-blue-600", bg: "bg-blue-50" }
    return { type: "Base muito forte", color: "text-purple-600", bg: "bg-purple-50" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">pH e pOH</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda os conceitos de acidez e basicidade através das escalas de pH e pOH com calculadora interativa.
          </p>
        </div>

        {/* Calculadora de pH */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calculator className="mr-2 h-6 w-6 text-blue-600" />
            Calculadora de pH e pOH
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Tipo de Cálculo</Label>
                  <div className="flex space-x-4 mt-2">
                    <Button
                      variant={calculationType === "h" ? "default" : "outline"}
                      onClick={() => setCalculationType("h")}
                    >
                      A partir de [H⁺]
                    </Button>
                    <Button
                      variant={calculationType === "oh" ? "default" : "outline"}
                      onClick={() => setCalculationType("oh")}
                    >
                      A partir de [OH⁻]
                    </Button>
                  </div>
                </div>

                {calculationType === "h" ? (
                  <div>
                    <Label htmlFor="h-concentration">Concentração de H⁺ (mol/L)</Label>
                    <Input
                      id="h-concentration"
                      type="number"
                      step="any"
                      placeholder="Ex: 0.001"
                      value={hConcentration}
                      onChange={(e) => setHConcentration(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Use notação decimal (ex: 0.001 para 1×10⁻³)</p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="oh-concentration">Concentração de OH⁻ (mol/L)</Label>
                    <Input
                      id="oh-concentration"
                      type="number"
                      step="any"
                      placeholder="Ex: 0.0001"
                      value={ohConcentration}
                      onChange={(e) => setOhConcentration(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Use notação decimal (ex: 0.0001 para 1×10⁻⁴)</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button onClick={calculatePh} className="flex-1">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    Limpar
                  </Button>
                </div>
              </div>
            </div>

            <div>
              {calculatedPh !== null && calculatedPoh !== null && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Resultados</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{calculatedPh.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">pH</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{calculatedPoh.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">pOH</div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${getPhClassification(calculatedPh).bg}`}>
                      <div className={`font-semibold ${getPhClassification(calculatedPh).color}`}>
                        {getPhClassification(calculatedPh).type}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {calculatedPh < 7 ? "Solução ácida" : calculatedPh > 7 ? "Solução básica" : "Solução neutra"}
                      </div>
                    </div>

                    {(calculatedPh < 2 || calculatedPh > 12) && (
                      <div className="flex items-center justify-center space-x-2 text-orange-600 bg-orange-50 p-3 rounded-lg mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Cuidado: Solução muito corrosiva!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Fórmulas utilizadas:</h4>
                <div className="text-sm space-y-1">
                  <p>pH = -log[H⁺]</p>
                  <p>pOH = -log[OH⁻]</p>
                  <p>pH + pOH = 14</p>
                  <p>[H⁺] × [OH⁻] = 10⁻¹⁴</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Definições e Relações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Definições Fundamentais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">pH (Potencial Hidrogeniônico)</h3>
                <div className="bg-blue-50 p-4 rounded mb-3">
                  <p className="text-center text-lg">pH = -log[H⁺]</p>
                </div>
                <p className="text-gray-600">Mede a concentração de íons H⁺ em solução</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">pOH (Potencial Hidroxiliônico)</h3>
                <div className="bg-green-50 p-4 rounded mb-3">
                  <p className="text-center text-lg">pOH = -log[OH⁻]</p>
                </div>
                <p className="text-gray-600">Mede a concentração de íons OH⁻ em solução</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">Relações Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Produto Iônico da Água</h3>
                <div className="bg-purple-50 p-4 rounded mb-3">
                  <p className="text-center text-lg">[H⁺][OH⁻] = 10⁻¹⁴</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Relação pH e pOH</h3>
                <div className="bg-orange-50 p-4 rounded mb-3">
                  <p className="text-center text-lg">pH + pOH = 14</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Conversões</h3>
                <div className="space-y-2 text-sm">
                  <p>[H⁺] = 10⁻¹⁴ / [OH⁻]</p>
                  <p>[OH⁻] = 10⁻¹⁴ / [H⁺]</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Escala de pH Interativa */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escala de pH Interativa</h2>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-red-600">ÁCIDO</span>
              <span className="text-green-600">NEUTRO</span>
              <span className="text-blue-600">BÁSICO</span>
            </div>
            <div className="h-8 bg-gradient-to-r from-red-600 via-yellow-400 via-green-400 via-blue-400 to-purple-600 rounded-lg"></div>
            <div className="flex justify-between text-xs mt-1">
              <span>0</span>
              <span>7</span>
              <span>14</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phExamples.map((example, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className={`w-4 h-4 rounded-full ${example.color}`}></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{example.substance}</p>
                  <p className="text-xs text-gray-600">{example.type}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    pH {example.ph}
                  </Badge>
                  {example.danger !== "none" && (
                    <div className="mt-1">
                      <AlertTriangle
                        className={`h-3 w-3 ${
                          example.danger === "high"
                            ? "text-red-500"
                            : example.danger === "medium"
                              ? "text-orange-500"
                              : "text-yellow-500"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores Ácido-Base */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Beaker className="mr-2 h-6 w-6 text-green-600" />
            Indicadores Ácido-Base
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indicators.map((indicator, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{indicator.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded">
                        <div className="font-semibold text-red-600">Meio Ácido</div>
                        <div className="text-sm">{indicator.acidColor}</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-semibold text-blue-600">Meio Básico</div>
                        <div className="text-sm">{indicator.baseColor}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline">{indicator.range}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 text-center">{indicator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Soluções Ácidas e Básicas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-red-700">Soluções Ácidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>pH {"< 7"}</span>
                  <Badge className="bg-red-100 text-red-800">Ácida</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• [H⁺] {"> [OH⁻]"}</p>
                  <p>• Maior concentração de íons H⁺</p>
                  <p>• Exemplos: limão, vinagre, café</p>
                  <p>• Sabor azedo</p>
                  <p>• Conduzem eletricidade</p>
                  <p>• Reagem com metais liberando H₂</p>
                </div>

                <div className="bg-red-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Exemplo de Cálculo:</h4>
                  <p className="text-sm">Se [H⁺] = 10⁻³ M:</p>
                  <p className="text-sm">pH = -log(10⁻³) = 3</p>
                  <p className="text-sm">pOH = 14 - 3 = 11</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Soluções Básicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>pH {"> 7"}</span>
                  <Badge className="bg-blue-100 text-blue-800">Básica</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• [OH⁻] {"> [H⁺]"}</p>
                  <p>• Maior concentração de íons OH⁻</p>
                  <p>• Exemplos: sabão, amônia, antiácido</p>
                  <p>• Sabor amargo</p>
                  <p>• Sensação escorregadia</p>
                  <p>• Conduzem eletricidade</p>
                </div>

                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Exemplo de Cálculo:</h4>
                  <p className="text-sm">Se [OH⁻] = 10⁻² M:</p>
                  <p className="text-sm">pOH = -log(10⁻²) = 2</p>
                  <p className="text-sm">pH = 14 - 2 = 12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aplicações Práticas */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aplicações Práticas</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Agricultura</h3>
              <p className="text-sm text-gray-600 mb-4">
                O pH do solo afeta a absorção de nutrientes pelas plantas. Solo muito ácido ou básico prejudica o
                crescimento.
              </p>
              <div className="text-xs text-gray-500">
                <p>pH ideal: 6.0 - 7.0</p>
                <p>Correção: calcário (↑pH) ou enxofre (↓pH)</p>
              </div>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Medicina</h3>
              <p className="text-sm text-gray-600 mb-4">
                O pH do sangue deve estar entre 7,35-7,45. Alterações podem indicar problemas de saúde.
              </p>
              <div className="text-xs text-gray-500">
                <p>Acidose: pH {"< 7.35"}</p>
                <p>Alcalose: pH {"> 7.45"}</p>
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Indústria</h3>
              <p className="text-sm text-gray-600 mb-4">
                Controle de pH é essencial em processos industriais, tratamento de água e fabricação de produtos.
              </p>
              <div className="text-xs text-gray-500">
                <p>Piscinas: pH 7.2 - 7.6</p>
                <p>Água potável: pH 6.5 - 8.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Integração com Carga Nuclear Efetiva */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Atom className="mr-2 h-6 w-6 text-indigo-600" />
            Conexão: Carga Nuclear Efetiva e Acidez
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Como Z_eff Determina a Força Ácida</h3>

              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-2">Ácidos Binários (HX)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    A força do ácido depende da facilidade de liberar H⁺, que é influenciada pela carga nuclear efetiva
                    do halogênio.
                  </p>

                  <div className="space-y-2">
                    {[
                      {
                        acid: "HF",
                        zeff: "5.2",
                        pka: "3.2",
                        strength: "Fraco",
                        explanation: "Ligação H-F muito forte",
                      },
                      {
                        acid: "HCl",
                        zeff: "6.1",
                        pka: "-7",
                        strength: "Forte",
                        explanation: "Equilíbrio ideal entre Z_eff e tamanho",
                      },
                      {
                        acid: "HBr",
                        zeff: "6.8",
                        pka: "-9",
                        strength: "Muito forte",
                        explanation: "Ligação H-Br mais fraca",
                      },
                      {
                        acid: "HI",
                        zeff: "7.2",
                        pka: "-10",
                        strength: "Muito forte",
                        explanation: "Ligação H-I muito fraca",
                      },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded text-xs">
                        <div className="font-mono font-bold">{data.acid}</div>
                        <div>Z_eff = {data.zeff}</div>
                        <div>pKa = {data.pka}</div>
                        <Badge variant={data.strength === "Fraco" ? "outline" : "default"} className="text-xs">
                          {data.strength}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">Ácidos Oxigenados</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Para ácidos como HXO_n, a carga nuclear efetiva do átomo central (X) determina a polarização das
                    ligações O-H.
                  </p>

                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Exemplo: Ácidos do Cloro</strong>
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>HClO (Z_eff baixo) → pH ≈ 4 (ácido fraco)</li>
                      <li>HClO₂ (Z_eff médio) → pH ≈ 2 (ácido forte)</li>
                      <li>HClO₃ (Z_eff alto) → pH ≈ 0 (ácido muito forte)</li>
                      <li>HClO₄ (Z_eff muito alto) → pH ≈ -1 (superácido)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Calculadora de Força Ácida</h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Relação Z_eff vs pKa</h4>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-center mb-2">
                      <div className="text-lg font-bold text-blue-600">HCl</div>
                      <div className="text-sm text-gray-600">Z_eff(Cl) = 6.1</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>pKa: -7</div>
                      <div>pH (0.1M): ~1</div>
                      <div>Força: Muito forte</div>
                      <div>Ionização: 100%</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <div className="text-center mb-2">
                      <div className="text-lg font-bold text-green-600">HF</div>
                      <div className="text-sm text-gray-600">Z_eff(F) = 5.2</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>pKa: 3.2</div>
                      <div>pH (0.1M): ~2.1</div>
                      <div>Força: Fraco</div>
                      <div>Ionização: ~8%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Paradoxo do HF:</strong> Embora F tenha alta eletronegatividade, HF é ácido fraco devido à
                    ligação H-F extremamente forte (pequeno raio do F).
                  </p>
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
