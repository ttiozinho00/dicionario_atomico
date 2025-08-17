"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Element {
  number: number
  symbol: string
  name: string
  mass: number
  group: number
  period: number
  category: string
  electronConfig: string
  state: string
  discoveryYear?: number
}

const elements: Element[] = [
  // Período 1
  {
    number: 1,
    symbol: "H",
    name: "Hidrogênio",
    mass: 1.008,
    group: 1,
    period: 1,
    category: "nonmetal",
    electronConfig: "1s¹",
    state: "gas",
    discoveryYear: 1766,
  },
  {
    number: 2,
    symbol: "He",
    name: "Hélio",
    mass: 4.003,
    group: 18,
    period: 1,
    category: "noble-gas",
    electronConfig: "1s²",
    state: "gas",
    discoveryYear: 1895,
  },

  // Período 2
  {
    number: 3,
    symbol: "Li",
    name: "Lítio",
    mass: 6.941,
    group: 1,
    period: 2,
    category: "alkali-metal",
    electronConfig: "[He] 2s¹",
    state: "solid",
    discoveryYear: 1817,
  },
  {
    number: 4,
    symbol: "Be",
    name: "Berílio",
    mass: 9.012,
    group: 2,
    period: 2,
    category: "alkaline-earth",
    electronConfig: "[He] 2s²",
    state: "solid",
    discoveryYear: 1797,
  },
  {
    number: 5,
    symbol: "B",
    name: "Boro",
    mass: 10.811,
    group: 13,
    period: 2,
    category: "metalloid",
    electronConfig: "[He] 2s² 2p¹",
    state: "solid",
    discoveryYear: 1808,
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbono",
    mass: 12.011,
    group: 14,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p²",
    state: "solid",
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogênio",
    mass: 14.007,
    group: 15,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p³",
    state: "gas",
    discoveryYear: 1772,
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxigênio",
    mass: 15.999,
    group: 16,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p⁴",
    state: "gas",
    discoveryYear: 1774,
  },
  {
    number: 9,
    symbol: "F",
    name: "Flúor",
    mass: 18.998,
    group: 17,
    period: 2,
    category: "halogen",
    electronConfig: "[He] 2s² 2p⁵",
    state: "gas",
    discoveryYear: 1886,
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neônio",
    mass: 20.18,
    group: 18,
    period: 2,
    category: "noble-gas",
    electronConfig: "[He] 2s² 2p⁶",
    state: "gas",
    discoveryYear: 1898,
  },

  // Período 3
  {
    number: 11,
    symbol: "Na",
    name: "Sódio",
    mass: 22.99,
    group: 1,
    period: 3,
    category: "alkali-metal",
    electronConfig: "[Ne] 3s¹",
    state: "solid",
    discoveryYear: 1807,
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnésio",
    mass: 24.305,
    group: 2,
    period: 3,
    category: "alkaline-earth",
    electronConfig: "[Ne] 3s²",
    state: "solid",
    discoveryYear: 1755,
  },
  {
    number: 13,
    symbol: "Al",
    name: "Alumínio",
    mass: 26.982,
    group: 13,
    period: 3,
    category: "post-transition",
    electronConfig: "[Ne] 3s² 3p¹",
    state: "solid",
    discoveryYear: 1825,
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silício",
    mass: 28.086,
    group: 14,
    period: 3,
    category: "metalloid",
    electronConfig: "[Ne] 3s² 3p²",
    state: "solid",
    discoveryYear: 1824,
  },
  {
    number: 15,
    symbol: "P",
    name: "Fósforo",
    mass: 30.974,
    group: 15,
    period: 3,
    category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p³",
    state: "solid",
    discoveryYear: 1669,
  },
  {
    number: 16,
    symbol: "S",
    name: "Enxofre",
    mass: 32.065,
    group: 16,
    period: 3,
    category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p⁴",
    state: "solid",
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Cloro",
    mass: 35.453,
    group: 17,
    period: 3,
    category: "halogen",
    electronConfig: "[Ne] 3s² 3p⁵",
    state: "gas",
    discoveryYear: 1774,
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argônio",
    mass: 39.948,
    group: 18,
    period: 3,
    category: "noble-gas",
    electronConfig: "[Ne] 3s² 3p⁶",
    state: "gas",
    discoveryYear: 1894,
  },

  // Período 4
  {
    number: 19,
    symbol: "K",
    name: "Potássio",
    mass: 39.098,
    group: 1,
    period: 4,
    category: "alkali-metal",
    electronConfig: "[Ar] 4s¹",
    state: "solid",
    discoveryYear: 1807,
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Cálcio",
    mass: 40.078,
    group: 2,
    period: 4,
    category: "alkaline-earth",
    electronConfig: "[Ar] 4s²",
    state: "solid",
    discoveryYear: 1808,
  },
  {
    number: 21,
    symbol: "Sc",
    name: "Escândio",
    mass: 44.956,
    group: 3,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d¹ 4s²",
    state: "solid",
    discoveryYear: 1879,
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titânio",
    mass: 47.867,
    group: 4,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d² 4s²",
    state: "solid",
    discoveryYear: 1791,
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanádio",
    mass: 50.942,
    group: 5,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d³ 4s²",
    state: "solid",
    discoveryYear: 1801,
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Cromo",
    mass: 51.996,
    group: 6,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d⁵ 4s¹",
    state: "solid",
    discoveryYear: 1797,
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganês",
    mass: 54.938,
    group: 7,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d⁵ 4s²",
    state: "solid",
    discoveryYear: 1774,
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Ferro",
    mass: 55.845,
    group: 8,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d⁶ 4s²",
    state: "solid",
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalto",
    mass: 58.933,
    group: 9,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d⁷ 4s²",
    state: "solid",
    discoveryYear: 1735,
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Níquel",
    mass: 58.693,
    group: 10,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d⁸ 4s²",
    state: "solid",
    discoveryYear: 1751,
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Cobre",
    mass: 63.546,
    group: 11,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d¹⁰ 4s¹",
    state: "solid",
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinco",
    mass: 65.38,
    group: 12,
    period: 4,
    category: "transition-metal",
    electronConfig: "[Ar] 3d¹⁰ 4s²",
    state: "solid",
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gálio",
    mass: 69.723,
    group: 13,
    period: 4,
    category: "post-transition",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹",
    state: "solid",
    discoveryYear: 1875,
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germânio",
    mass: 72.64,
    group: 14,
    period: 4,
    category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p²",
    state: "solid",
    discoveryYear: 1886,
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsênio",
    mass: 74.922,
    group: 15,
    period: 4,
    category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p³",
    state: "solid",
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selênio",
    mass: 78.96,
    group: 16,
    period: 4,
    category: "nonmetal",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴",
    state: "solid",
    discoveryYear: 1817,
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromo",
    mass: 79.904,
    group: 17,
    period: 4,
    category: "halogen",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵",
    state: "liquid",
    discoveryYear: 1826,
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Criptônio",
    mass: 83.798,
    group: 18,
    period: 4,
    category: "noble-gas",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶",
    state: "gas",
    discoveryYear: 1898,
  },

  // Período 5
  {
    number: 37,
    symbol: "Rb",
    name: "Rubídio",
    mass: 85.468,
    group: 1,
    period: 5,
    category: "alkali-metal",
    electronConfig: "[Kr] 5s¹",
    state: "solid",
    discoveryYear: 1861,
  },
  {
    number: 38,
    symbol: "Sr",
    name: "Estrôncio",
    mass: 87.62,
    group: 2,
    period: 5,
    category: "alkaline-earth",
    electronConfig: "[Kr] 5s²",
    state: "solid",
    discoveryYear: 1790,
  },
  {
    number: 39,
    symbol: "Y",
    name: "Ítrio",
    mass: 88.906,
    group: 3,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d¹ 5s²",
    state: "solid",
    discoveryYear: 1794,
  },
  {
    number: 40,
    symbol: "Zr",
    name: "Zircônio",
    mass: 91.224,
    group: 4,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d² 5s²",
    state: "solid",
    discoveryYear: 1789,
  },
  {
    number: 41,
    symbol: "Nb",
    name: "Nióbio",
    mass: 92.906,
    group: 5,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d⁴ 5s¹",
    state: "solid",
    discoveryYear: 1801,
  },
  {
    number: 42,
    symbol: "Mo",
    name: "Molibdênio",
    mass: 95.96,
    group: 6,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d⁵ 5s¹",
    state: "solid",
    discoveryYear: 1778,
  },
  {
    number: 43,
    symbol: "Tc",
    name: "Tecnécio",
    mass: 98,
    group: 7,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d⁵ 5s²",
    state: "solid",
    discoveryYear: 1937,
  },
  {
    number: 44,
    symbol: "Ru",
    name: "Rutênio",
    mass: 101.07,
    group: 8,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d⁷ 5s¹",
    state: "solid",
    discoveryYear: 1844,
  },
  {
    number: 45,
    symbol: "Rh",
    name: "Ródio",
    mass: 102.906,
    group: 9,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d⁸ 5s¹",
    state: "solid",
    discoveryYear: 1803,
  },
  {
    number: 46,
    symbol: "Pd",
    name: "Paládio",
    mass: 106.42,
    group: 10,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d¹⁰",
    state: "solid",
    discoveryYear: 1803,
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Prata",
    mass: 107.868,
    group: 11,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d¹⁰ 5s¹",
    state: "solid",
  },
  {
    number: 48,
    symbol: "Cd",
    name: "Cádmio",
    mass: 112.411,
    group: 12,
    period: 5,
    category: "transition-metal",
    electronConfig: "[Kr] 4d¹⁰ 5s²",
    state: "solid",
    discoveryYear: 1817,
  },
  {
    number: 49,
    symbol: "In",
    name: "Índio",
    mass: 114.818,
    group: 13,
    period: 5,
    category: "post-transition",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹",
    state: "solid",
    discoveryYear: 1863,
  },
  {
    number: 50,
    symbol: "Sn",
    name: "Estanho",
    mass: 118.71,
    group: 14,
    period: 5,
    category: "post-transition",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p²",
    state: "solid",
  },
  {
    number: 51,
    symbol: "Sb",
    name: "Antimônio",
    mass: 121.76,
    group: 15,
    period: 5,
    category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p³",
    state: "solid",
  },
  {
    number: 52,
    symbol: "Te",
    name: "Telúrio",
    mass: 127.6,
    group: 16,
    period: 5,
    category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴",
    state: "solid",
    discoveryYear: 1782,
  },
  {
    number: 53,
    symbol: "I",
    name: "Iodo",
    mass: 126.904,
    group: 17,
    period: 5,
    category: "halogen",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵",
    state: "solid",
    discoveryYear: 1811,
  },
  {
    number: 54,
    symbol: "Xe",
    name: "Xenônio",
    mass: 131.293,
    group: 18,
    period: 5,
    category: "noble-gas",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶",
    state: "gas",
    discoveryYear: 1898,
  },

  // Período 6
  {
    number: 55,
    symbol: "Cs",
    name: "Césio",
    mass: 132.905,
    group: 1,
    period: 6,
    category: "alkali-metal",
    electronConfig: "[Xe] 6s¹",
    state: "solid",
    discoveryYear: 1860,
  },
  {
    number: 56,
    symbol: "Ba",
    name: "Bário",
    mass: 137.327,
    group: 2,
    period: 6,
    category: "alkaline-earth",
    electronConfig: "[Xe] 6s²",
    state: "solid",
    discoveryYear: 1808,
  },
  {
    number: 57,
    symbol: "La",
    name: "Lantânio",
    mass: 138.905,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 5d¹ 6s²",
    state: "solid",
    discoveryYear: 1839,
  },
  {
    number: 58,
    symbol: "Ce",
    name: "Cério",
    mass: 140.116,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹ 5d¹ 6s²",
    state: "solid",
    discoveryYear: 1803,
  },
  {
    number: 59,
    symbol: "Pr",
    name: "Praseodímio",
    mass: 140.908,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f³ 6s²",
    state: "solid",
    discoveryYear: 1885,
  },
  {
    number: 60,
    symbol: "Nd",
    name: "Neodímio",
    mass: 144.242,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁴ 6s²",
    state: "solid",
    discoveryYear: 1885,
  },
  {
    number: 61,
    symbol: "Pm",
    name: "Promécio",
    mass: 145,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁵ 6s²",
    state: "solid",
    discoveryYear: 1945,
  },
  {
    number: 62,
    symbol: "Sm",
    name: "Samário",
    mass: 150.36,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁶ 6s²",
    state: "solid",
    discoveryYear: 1879,
  },
  {
    number: 63,
    symbol: "Eu",
    name: "Európio",
    mass: 151.964,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁷ 6s²",
    state: "solid",
    discoveryYear: 1901,
  },
  {
    number: 64,
    symbol: "Gd",
    name: "Gadolínio",
    mass: 157.25,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁷ 5d¹ 6s²",
    state: "solid",
    discoveryYear: 1880,
  },
  {
    number: 65,
    symbol: "Tb",
    name: "Térbio",
    mass: 158.925,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁹ 6s²",
    state: "solid",
    discoveryYear: 1843,
  },
  {
    number: 66,
    symbol: "Dy",
    name: "Disprósio",
    mass: 162.5,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁰ 6s²",
    state: "solid",
    discoveryYear: 1886,
  },
  {
    number: 67,
    symbol: "Ho",
    name: "Hólmio",
    mass: 164.93,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹¹ 6s²",
    state: "solid",
    discoveryYear: 1878,
  },
  {
    number: 68,
    symbol: "Er",
    name: "Érbio",
    mass: 167.259,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹² 6s²",
    state: "solid",
    discoveryYear: 1843,
  },
  {
    number: 69,
    symbol: "Tm",
    name: "Túlio",
    mass: 168.934,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹³ 6s²",
    state: "solid",
    discoveryYear: 1879,
  },
  {
    number: 70,
    symbol: "Yb",
    name: "Itérbio",
    mass: 173.054,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁴ 6s²",
    state: "solid",
    discoveryYear: 1878,
  },
  {
    number: 71,
    symbol: "Lu",
    name: "Lutécio",
    mass: 174.967,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²",
    state: "solid",
    discoveryYear: 1907,
  },
  {
    number: 72,
    symbol: "Hf",
    name: "Háfnio",
    mass: 178.49,
    group: 4,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d² 6s²",
    state: "solid",
    discoveryYear: 1923,
  },
  {
    number: 73,
    symbol: "Ta",
    name: "Tântalo",
    mass: 180.948,
    group: 5,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²",
    state: "solid",
    discoveryYear: 1802,
  },
  {
    number: 74,
    symbol: "W",
    name: "Tungstênio",
    mass: 183.84,
    group: 6,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²",
    state: "solid",
    discoveryYear: 1783,
  },
  {
    number: 75,
    symbol: "Re",
    name: "Rênio",
    mass: 186.207,
    group: 7,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²",
    state: "solid",
    discoveryYear: 1925,
  },
  {
    number: 76,
    symbol: "Os",
    name: "Ósmio",
    mass: 190.23,
    group: 8,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²",
    state: "solid",
    discoveryYear: 1803,
  },
  {
    number: 77,
    symbol: "Ir",
    name: "Irídio",
    mass: 192.217,
    group: 9,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²",
    state: "solid",
    discoveryYear: 1803,
  },
  {
    number: 78,
    symbol: "Pt",
    name: "Platina",
    mass: 195.084,
    group: 10,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    state: "solid",
  },
  {
    number: 79,
    symbol: "Au",
    name: "Ouro",
    mass: 196.967,
    group: 11,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    state: "solid",
  },
  {
    number: 80,
    symbol: "Hg",
    name: "Mercúrio",
    mass: 200.59,
    group: 12,
    period: 6,
    category: "transition-metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    state: "liquid",
  },
  {
    number: 81,
    symbol: "Tl",
    name: "Tálio",
    mass: 204.383,
    group: 13,
    period: 6,
    category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    state: "solid",
    discoveryYear: 1861,
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Chumbo",
    mass: 207.2,
    group: 14,
    period: 6,
    category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    state: "solid",
  },
  {
    number: 83,
    symbol: "Bi",
    name: "Bismuto",
    mass: 208.98,
    group: 15,
    period: 6,
    category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    state: "solid",
  },
  {
    number: 84,
    symbol: "Po",
    name: "Polônio",
    mass: 209,
    group: 16,
    period: 6,
    category: "post-transition",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    state: "solid",
    discoveryYear: 1898,
  },
  {
    number: 85,
    symbol: "At",
    name: "Astato",
    mass: 210,
    group: 17,
    period: 6,
    category: "halogen",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    state: "solid",
    discoveryYear: 1940,
  },
  {
    number: 86,
    symbol: "Rn",
    name: "Radônio",
    mass: 222,
    group: 18,
    period: 6,
    category: "noble-gas",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    state: "gas",
    discoveryYear: 1900,
  },

  // Período 7
  {
    number: 87,
    symbol: "Fr",
    name: "Frâncio",
    mass: 223,
    group: 1,
    period: 7,
    category: "alkali-metal",
    electronConfig: "[Rn] 7s¹",
    state: "solid",
    discoveryYear: 1939,
  },
  {
    number: 88,
    symbol: "Ra",
    name: "Rádio",
    mass: 226,
    group: 2,
    period: 7,
    category: "alkaline-earth",
    electronConfig: "[Rn] 7s²",
    state: "solid",
    discoveryYear: 1898,
  },
  {
    number: 89,
    symbol: "Ac",
    name: "Actínio",
    mass: 227,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 6d¹ 7s²",
    state: "solid",
    discoveryYear: 1899,
  },
  {
    number: 90,
    symbol: "Th",
    name: "Tório",
    mass: 232.038,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 6d² 7s²",
    state: "solid",
    discoveryYear: 1828,
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactínio",
    mass: 231.036,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f² 6d¹ 7s²",
    state: "solid",
    discoveryYear: 1913,
  },
  {
    number: 92,
    symbol: "U",
    name: "Urânio",
    mass: 238.029,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f³ 6d¹ 7s²",
    state: "solid",
    discoveryYear: 1789,
  },
  {
    number: 93,
    symbol: "Np",
    name: "Netúnio",
    mass: 237,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁴ 6d¹ 7s²",
    state: "solid",
    discoveryYear: 1940,
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutônio",
    mass: 244,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁶ 7s²",
    state: "solid",
    discoveryYear: 1940,
  },
  {
    number: 95,
    symbol: "Am",
    name: "Amerício",
    mass: 243,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁷ 7s²",
    state: "solid",
    discoveryYear: 1944,
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Cúrio",
    mass: 247,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁷ 6d¹ 7s²",
    state: "solid",
    discoveryYear: 1944,
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berquélio",
    mass: 247,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁹ 7s²",
    state: "solid",
    discoveryYear: 1949,
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Califórnio",
    mass: 251,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹⁰ 7s²",
    state: "solid",
    discoveryYear: 1950,
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einstênio",
    mass: 252,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹¹ 7s²",
    state: "solid",
    discoveryYear: 1952,
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Férmio",
    mass: 257,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹² 7s²",
    state: "solid",
    discoveryYear: 1952,
  },
  {
    number: 101,
    symbol: "Md",
    name: "Mendelévio",
    mass: 258,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹³ 7s²",
    state: "solid",
    discoveryYear: 1955,
  },
  {
    number: 102,
    symbol: "No",
    name: "Nobélio",
    mass: 259,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹⁴ 7s²",
    state: "solid",
    discoveryYear: 1957,
  },
  {
    number: 103,
    symbol: "Lr",
    name: "Laurêncio",
    mass: 262,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹",
    state: "solid",
    discoveryYear: 1961,
  },
  {
    number: 104,
    symbol: "Rf",
    name: "Rutherfórdio",
    mass: 267,
    group: 4,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d² 7s²",
    state: "solid",
    discoveryYear: 1964,
  },
  {
    number: 105,
    symbol: "Db",
    name: "Dúbnio",
    mass: 268,
    group: 5,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²",
    state: "solid",
    discoveryYear: 1967,
  },
  {
    number: 106,
    symbol: "Sg",
    name: "Seabórgio",
    mass: 271,
    group: 6,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²",
    state: "solid",
    discoveryYear: 1974,
  },
  {
    number: 107,
    symbol: "Bh",
    name: "Bóhrio",
    mass: 272,
    group: 7,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²",
    state: "solid",
    discoveryYear: 1981,
  },
  {
    number: 108,
    symbol: "Hs",
    name: "Hássio",
    mass: 270,
    group: 8,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²",
    state: "solid",
    discoveryYear: 1984,
  },
  {
    number: 109,
    symbol: "Mt",
    name: "Meitnério",
    mass: 276,
    group: 9,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²",
    state: "solid",
    discoveryYear: 1982,
  },
  {
    number: 110,
    symbol: "Ds",
    name: "Darmstádtio",
    mass: 281,
    group: 10,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁸ 7s²",
    state: "solid",
    discoveryYear: 1994,
  },
  {
    number: 111,
    symbol: "Rg",
    name: "Roentgênio",
    mass: 280,
    group: 11,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d⁹ 7s²",
    state: "solid",
    discoveryYear: 1994,
  },
  {
    number: 112,
    symbol: "Cn",
    name: "Copernício",
    mass: 285,
    group: 12,
    period: 7,
    category: "transition-metal",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    state: "solid",
    discoveryYear: 1996,
  },
  {
    number: 113,
    symbol: "Nh",
    name: "Nihônio",
    mass: 284,
    group: 13,
    period: 7,
    category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    state: "solid",
    discoveryYear: 2004,
  },
  {
    number: 114,
    symbol: "Fl",
    name: "Fleróvio",
    mass: 289,
    group: 14,
    period: 7,
    category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    state: "solid",
    discoveryYear: 1999,
  },
  {
    number: 115,
    symbol: "Mc",
    name: "Moscóvio",
    mass: 288,
    group: 15,
    period: 7,
    category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    state: "solid",
    discoveryYear: 2003,
  },
  {
    number: 116,
    symbol: "Lv",
    name: "Livermório",
    mass: 293,
    group: 16,
    period: 7,
    category: "post-transition",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    state: "solid",
    discoveryYear: 2000,
  },
  {
    number: 117,
    symbol: "Ts",
    name: "Tenesso",
    mass: 294,
    group: 17,
    period: 7,
    category: "halogen",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    state: "solid",
    discoveryYear: 2010,
  },
  {
    number: 118,
    symbol: "Og",
    name: "Oganessônio",
    mass: 294,
    group: 18,
    period: 7,
    category: "noble-gas",
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    state: "solid",
    discoveryYear: 2002,
  },
]

const categoryColors = {
  "alkali-metal": "bg-red-400 hover:bg-red-500",
  "alkaline-earth": "bg-orange-400 hover:bg-orange-500",
  "transition-metal": "bg-yellow-400 hover:bg-yellow-500",
  "post-transition": "bg-green-400 hover:bg-green-500",
  metalloid: "bg-teal-400 hover:bg-teal-500",
  nonmetal: "bg-blue-400 hover:bg-blue-500",
  halogen: "bg-indigo-400 hover:bg-indigo-500",
  "noble-gas": "bg-purple-400 hover:bg-purple-500",
  lanthanide: "bg-pink-400 hover:bg-pink-500",
  actinide: "bg-rose-400 hover:bg-rose-500",
}

const categoryNames = {
  "alkali-metal": "Metais Alcalinos",
  "alkaline-earth": "Metais Alcalino-terrosos",
  "transition-metal": "Metais de Transição",
  "post-transition": "Metais Pós-transição",
  metalloid: "Metaloides",
  nonmetal: "Não-metais",
  halogen: "Halogênios",
  "noble-gas": "Gases Nobres",
  lanthanide: "Lantanídeos",
  actinide: "Actinídeos",
}

export default function TabelaPeriodica() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const getElementPosition = (element: Element) => {
    let row = element.period
    let col = element.group

    // Ajustes especiais para lantanídeos e actinídeos
    if (element.category === "lanthanide") {
      row = 8 // Linha especial para lantanídeos
      col = element.number - 56 // Posição relativa
    } else if (element.category === "actinide") {
      row = 9 // Linha especial para actinídeos
      col = element.number - 88 // Posição relativa
    }

    return { row, col }
  }

  const filteredElements = filterCategory === "all" ? elements : elements.filter((el) => el.category === filterCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tabela Periódica</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore todos os 118 elementos químicos conhecidos com informações detalhadas sobre cada um.
          </p>
        </div>

        {/* Legenda de Categorias */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Categorias dos Elementos</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {Object.entries(categoryNames).map(([key, name]) => (
              <div key={key} className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded ${categoryColors[key as keyof typeof categoryColors].split(" ")[0]}`}
                ></div>
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              Todos
            </Button>
            {Object.entries(categoryNames).map(([key, name]) => (
              <Button
                key={key}
                variant={filterCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(key)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabela Periódica */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 overflow-x-auto">
          <div className="grid grid-cols-18 gap-1 min-w-[1200px]">
            {/* Cabeçalho com números dos grupos */}
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="text-center text-xs font-semibold p-1 bg-gray-100 rounded">
                {i + 1}
              </div>
            ))}

            {/* Elementos da tabela */}
            {Array.from({ length: 7 }, (_, period) => {
              const periodElements = elements.filter((el) => el.period === period + 1)
              const row = []

              for (let group = 1; group <= 18; group++) {
                const element = periodElements.find((el) => el.group === group)

                if (element && (filterCategory === "all" || element.category === filterCategory)) {
                  row.push(
                    <button
                      key={element.number}
                      className={`
                        ${categoryColors[element.category as keyof typeof categoryColors]}
                        text-white text-xs p-2 rounded transition-all duration-200 transform hover:scale-105
                        flex flex-col items-center justify-center min-h-[60px] border-2 border-transparent
                        ${selectedElement?.number === element.number ? "border-gray-800 scale-105" : ""}
                      `}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="font-bold text-lg">{element.symbol}</div>
                      <div className="text-[10px]">{element.number}</div>
                      <div className="text-[9px] truncate w-full text-center">{element.mass}</div>
                    </button>,
                  )
                } else {
                  row.push(<div key={`empty-${period}-${group}`} className="min-h-[60px]"></div>)
                }
              }

              return row
            })}

            {/* Espaço para lantanídeos e actinídeos */}
            <div className="col-span-18 my-4 border-t border-gray-300"></div>

            {/* Lantanídeos */}
            <div className="col-span-18 mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Lantanídeos</h3>
              <div className="grid grid-cols-15 gap-1">
                {elements
                  .filter((el) => el.category === "lanthanide")
                  .map((element) => (
                    <button
                      key={element.number}
                      className={`
                      ${categoryColors[element.category as keyof typeof categoryColors]}
                      text-white text-xs p-2 rounded transition-all duration-200 transform hover:scale-105
                      flex flex-col items-center justify-center min-h-[60px] border-2 border-transparent
                      ${selectedElement?.number === element.number ? "border-gray-800 scale-105" : ""}
                      ${filterCategory !== "all" && filterCategory !== element.category ? "opacity-30" : ""}
                    `}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="font-bold text-lg">{element.symbol}</div>
                      <div className="text-[10px]">{element.number}</div>
                      <div className="text-[9px] truncate w-full text-center">{element.mass}</div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Actinídeos */}
            <div className="col-span-18">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Actinídeos</h3>
              <div className="grid grid-cols-15 gap-1">
                {elements
                  .filter((el) => el.category === "actinide")
                  .map((element) => (
                    <button
                      key={element.number}
                      className={`
                      ${categoryColors[element.category as keyof typeof categoryColors]}
                      text-white text-xs p-2 rounded transition-all duration-200 transform hover:scale-105
                      flex flex-col items-center justify-center min-h-[60px] border-2 border-transparent
                      ${selectedElement?.number === element.number ? "border-gray-800 scale-105" : ""}
                      ${filterCategory !== "all" && filterCategory !== element.category ? "opacity-30" : ""}
                    `}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="font-bold text-lg">{element.symbol}</div>
                      <div className="text-[10px]">{element.number}</div>
                      <div className="text-[9px] truncate w-full text-center">{element.mass}</div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes do Elemento Selecionado */}
        {selectedElement && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {selectedElement.name} ({selectedElement.symbol})
                </CardTitle>
                <Badge className={categoryColors[selectedElement.category as keyof typeof categoryColors]}>
                  {categoryNames[selectedElement.category as keyof typeof categoryNames]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Informações Básicas</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Número Atômico:</strong> {selectedElement.number}
                    </p>
                    <p>
                      <strong>Massa Atômica:</strong> {selectedElement.mass} u
                    </p>
                    <p>
                      <strong>Grupo:</strong> {selectedElement.group}
                    </p>
                    <p>
                      <strong>Período:</strong> {selectedElement.period}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Propriedades</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Estado:</strong>{" "}
                      {selectedElement.state === "solid"
                        ? "Sólido"
                        : selectedElement.state === "liquid"
                          ? "Líquido"
                          : "Gasoso"}
                    </p>
                    <p>
                      <strong>Categoria:</strong>{" "}
                      {categoryNames[selectedElement.category as keyof typeof categoryNames]}
                    </p>
                    {selectedElement.discoveryYear && (
                      <p>
                        <strong>Descoberto em:</strong> {selectedElement.discoveryYear}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg mb-2">Configuração Eletrônica</h3>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <code className="text-lg">{selectedElement.electronConfig}</code>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-lg mb-2">Curiosidades</h3>
                <p className="text-sm text-gray-700">
                  {selectedElement.number === 1 &&
                    "O hidrogênio é o elemento mais abundante no universo, constituindo cerca de 75% de toda a matéria normal."}
                  {selectedElement.number === 6 &&
                    "O carbono é a base de toda vida conhecida na Terra e pode formar mais compostos que qualquer outro elemento."}
                  {selectedElement.number === 79 &&
                    "O ouro é um dos poucos elementos que pode ser encontrado na natureza em sua forma pura."}
                  {selectedElement.number === 80 && "O mercúrio é o único metal que é líquido à temperatura ambiente."}
                  {selectedElement.number === 118 &&
                    "O oganessônio é o elemento mais pesado já sintetizado, com uma meia-vida extremamente curta."}
                  {![1, 6, 79, 80, 118].includes(selectedElement.number) &&
                    `${selectedElement.name} é um elemento ${categoryNames[selectedElement.category as keyof typeof categoryNames].toLowerCase()} com propriedades únicas importantes para diversas aplicações.`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>História da Tabela Periódica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                A tabela periódica foi desenvolvida por Dmitri Mendeleev em 1869, organizando os elementos por massa
                atômica e propriedades químicas similares.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>1869: Mendeleev publica a primeira tabela periódica</li>
                <li>1913: Moseley reorganiza por número atômico</li>
                <li>1940s-2010s: Descoberta dos elementos superpesados</li>
                <li>2016: Nomeação dos elementos 113, 115, 117 e 118</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendências Periódicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Raio Atômico</h4>
                  <p className="text-sm text-gray-600">Aumenta de cima para baixo e da direita para esquerda</p>
                </div>
                <div>
                  <h4 className="font-semibold">Energia de Ionização</h4>
                  <p className="text-sm text-gray-600">Aumenta de baixo para cima e da esquerda para direita</p>
                </div>
                <div>
                  <h4 className="font-semibold">Eletronegatividade</h4>
                  <p className="text-sm text-gray-600">Aumenta de baixo para cima e da esquerda para direita</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
