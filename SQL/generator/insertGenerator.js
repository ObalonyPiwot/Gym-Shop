function generateInsertSqlQuery(tableName) {
  const imie = faker.name.firstName();
  const nazwisko = faker.name.lastName();
  const typ = faker.random.arrayElement(['Admin', 'Uzytkownik']);
  const login = faker.internet.userName();
  const haslo = faker.internet.password();
  const email = faker.internet.email();
  const numer_telefonu = faker.phone.phoneNumber();

  const sqlQuery = `INSERT INTO ${tableName} VALUES (UzytkownikID.nextVal, '${imie}', '${nazwisko}', '${typ}', '${login}', '${haslo}', '${email}', '${numer_telefonu}');`;
  
  console.log(sqlQuery);
}

// Przykładowe użycie
generateInsertSqlQuery('uzytkownik');
