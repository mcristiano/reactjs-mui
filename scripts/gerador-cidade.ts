import { fakerPT_BR as faker } from '@faker-js/faker';
import { readFile, writeFile } from 'node:fs/promises';

interface Cidade {
  id: number;
  nome: string;
  uf: string;
}

const create1Cidade = (): Cidade => {
  return {
    id: faker.number.int({ min: 1, max: 10 }),
    nome: faker.location.city(),
    uf: faker.location.state({ abbreviated: true }),
  };
};

const main = async () => {
  const cidades = faker.helpers.multiple(create1Cidade, {
    count: 10,
  });

  const database = await readFile('./mock/database.json');
  const data = JSON.parse(database.toString());
  //data.pessoas = [...data.pessoas, ...pessoas];
  data.cidades = [...cidades];
  await writeFile('./mock/database.json', JSON.stringify({ ...data }, null, 2));

  console.log(`Gerador ${data.pessoas.length} registros com sucesso!`);
};

main();
