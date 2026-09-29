// כל עולם חי בקובץ JSON נפרד תחת ./worlds/<id>.json - כדי להוסיף או להרחיב
// תוכן לעולם מסוים, מספיק לערוך את הקובץ שלו, בלי לגעת בקובץ הזה או ברכיבים.
// הקובץ הזה רק מאגד את כל העולמות, ממיין אותם כרונולוגית וחושף עזרי גישה.

import mesopotamia from './worlds/mesopotamia.json'
import ancientGreece from './worlds/ancient-greece.json'
import romanEmpire from './worlds/roman-empire.json'
import middleAges from './worlds/middle-ages.json'
import renaissance from './worlds/renaissance.json'
import ageOfDiscovery from './worlds/age-of-discovery.json'
import americanRevolution from './worlds/american-revolution.json'
import industrialRevolution from './worlds/industrial-revolution.json'
import worldWars from './worlds/world-wars.json'
import coldWar from './worlds/cold-war.json'
import informationAge from './worlds/information-age.json'

const worlds = [
  mesopotamia,
  ancientGreece,
  romanEmpire,
  middleAges,
  renaissance,
  ageOfDiscovery,
  americanRevolution,
  industrialRevolution,
  worldWars,
  coldWar,
  informationAge,
].sort((a, b) => a.order - b.order)

export default worlds

export function getWorldById(worldId) {
  return worlds.find((w) => w.id === worldId)
}

export function getMissionById(world, missionId) {
  return world?.missions.find((m) => m.id === missionId)
}
