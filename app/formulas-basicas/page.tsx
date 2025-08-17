import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formulas = [
  {
    name: "Água",
    formula: "H₂O",
    description: "Composto formado por 2 átomos de hidrogênio e 1 átomo de oxigênio",
    type: "Molecular",
    example: "Essencial para a vida, solvente universal",
  },
  {
    name: "Dióxido de Carbono",
    formula: "CO₂",
    description: "Composto formado por 1 átomo de carbono e 2 átomos de oxigênio",
    type: "Molecular",
    example: "Gás produzido na respiração e combustão",
  },
  {
    name: "Cloreto de Sódio",
    formula: "NaCl",
    description: "Composto iônico formado por íons Na⁺ e Cl⁻",
    type: "Iônico",
    example: "Sal de cozinha comum",
  },
  {
    name: "Ácido Clorídrico",
    formula: "HCl",
    description: "Ácido forte formado por hidrogênio e cloro",
    type: "Ácido",
    example: "Presente no suco gástrico",
  },
  {
    name: "Hidróxido de Sódio",
    formula: "NaOH",
    description: "Base forte formada por sódio, oxigênio e hidrogênio",
    type: "Base",
    example: "Soda cáustica, usado em limpeza",
  },
  {
    name: "Metano",
    formula: "CH₄",
    description: "Hidrocarboneto mais simples, com 1 carbono e 4 hidrogênios",
    type: "Orgânico",
    example: "Gás natural, combustível",
  },
  {
    name: "Amônia",
    formula: "NH₃",
    description: "Composto formado por 1 nitrogênio e 3 hidrogênios",
    type: "Molecular",
    example: "Usado em fertilizantes e produtos de limpeza",
  },
  {
    name: "Sulfato de Cálcio",
    formula: "CaSO₄",
    description: "Sal formado por cálcio e íon sulfato",
    type: "Sal",
    example: "Gesso, usado na construção",
  },
]

const typeColors = {
  Molecular: "bg-blue-100 text-blue-800",
  Iônico: "bg-green-100 text-green-800",
  Ácido: "bg-red-100 text-red-800",
  Base: "bg-purple-100 text-purple-800",
  Orgânico: "bg-orange-100 text-orange-800",
  Sal: "bg-yellow-100 text-yellow-800",
}

export default function FormulasBasicas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fórmulas Químicas Básicas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça as fórmulas químicas mais importantes e suas aplicações no dia a dia.
          </p>
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Como ler fórmulas químicas:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Símbolos dos Elementos:</h3>
              <p className="text-gray-600">
                Cada letra maiúscula representa um elemento (H = Hidrogênio, O = Oxigênio, C = Carbono)
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Números Subscritos:</h3>
              <p className="text-gray-600">
                Indicam quantos átomos daquele elemento estão presentes (H₂O = 2 hidrogênios, 1 oxigênio)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formulas.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl text-blue-700">{item.name}</CardTitle>
                  <Badge className={typeColors[item.type as keyof typeof typeColors]}>{item.type}</Badge>
                </div>
                <div className="text-3xl font-mono font-bold text-center py-4 bg-gray-100 rounded">{item.formula}</div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-3">{item.description}</CardDescription>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Exemplo:</strong> {item.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Regras para Escrever Fórmulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Compostos Iônicos:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Cátion (íon positivo) vem primeiro</li>
                <li>Ânion (íon negativo) vem depois</li>
                <li>Cargas devem se balancear</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Compostos Moleculares:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Elemento menos eletronegativo primeiro</li>
                <li>Números indicam quantidade de átomos</li>
                <li>Seguem regras de nomenclatura específicas</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
