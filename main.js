#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Input JSON file')
  .option('-o, --output <path>', 'Output file')
  .option('-d, --display', 'Display result in console')
  .option('-m, --mfo', 'Show MFO code before name')
  .option('-n, --normal', 'Show only working banks with code 1');

program.parse(process.argv);
const options = program.opts();

// Перевірка обов’язкового параметра
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// Перевірка існування файлу
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читання JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

// Фільтрація
let result = data;
if (options.normal) {
  result = result.filter(bank => bank.COD_STATE === 1 || bank.COD_STATE === "1");
}

// Форматування виводу
let outputLines = result.map(bank => {
  const name = bank.SHORTNAME || bank.FULLNAME || "Невідомий банк";
  const mfo = bank.MFO || "—";
  return options.mfo ? `${mfo} ${name}` : `${name}`;
});

const output = outputLines.join('\n');

// Вивід
if (options.display) console.log(output);
if (options.output) fs.writeFileSync(options.output, output, 'utf8');
// Додано параметри для варіанту 1
// Додано параметри для варіанту 1
// Додано параметри для варіанту 1
