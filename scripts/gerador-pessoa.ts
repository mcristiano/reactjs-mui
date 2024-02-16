import { fakerPT_BR as faker } from '@faker-js/faker';
import { writeFile, readFile } from 'node:fs/promises';

interface Pessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

const create1Pessoa = (): Pessoa => {
  return {
    id: faker.number.int({ min: 1, max: 200 }),
    nomeCompleto: faker.person.fullName(),
    email: faker.internet.email(),
    cidadeId: faker.number.int({ min: 1, max: 10 }),
  };
};

// const createRandomPessoas = (quantidade: number): Pessoa[] => {
//   const pessoas: Pessoa[] = [];
//   for (let i = 0; i < quantidade; i++) {
//     pessoas.push(create1Pessoa());
//   }
//   return pessoas;
// };

const main = async () => {
  const pessoas = faker.helpers.multiple(create1Pessoa, {
    count: 200,
  });

  const database = await readFile('./mock/database.json');
  const data = JSON.parse(database.toString());
  //data.pessoas = [...data.pessoas, ...pessoas];
  data.pessoas = [...pessoas];
  await writeFile('./mock/database.json', JSON.stringify({ ...data }, null, 2));
  console.log(`Gerador ${data.pessoas.length} registros com sucesso!`);
};

main();
