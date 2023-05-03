drop table uzytkownik;
drop sequence UzytkownikID;
drop table grupy;
drop sequence grupyID;
drop table firmy;
drop sequence firmyID;
drop table kategorie;
drop sequence kategorieID;
drop table oceny;
drop sequence ocenyID;
drop table produkty;
drop sequence produktyID;
drop table reklamacje;
drop sequence reklamacjeID;
drop table serwisy;
drop sequence serwisyID;
drop table silownie;
drop sequence silownieID;
drop table transakcje;
drop sequence transakcjeID;
drop table typy;
drop sequence typyID;
drop table ulubione;
drop sequence ulubioneID;
drop table umowy;
drop sequence umowyID;
drop table zdjecia;
drop sequence zdjeciaID;
drop table KODYRABATOWE;
drop sequence KODYRABATOWEID;

create table uzytkownik(
    ID numeric primary key,
    Imie NVARCHAR2(50),
    Nazwisko NVARCHAR2(50),
    TypKonta NVARCHAR2(50),
    Haslo NVARCHAR2(50),
    Email NVARCHAR2(50),
    Telefon NVARCHAR2(9)
);

create table produkty(
    ID numeric primary key,
    nazwa NVARCHAR2(50),
    Opis NVARCHAR2(500),
    Cena FLOAT,
    IDTypu numeric
);

create table transakcje(
    ID numeric primary key,
    IDProd numeric,
    IDUzyt numeric,
    Data DATE,
    Opis NVARCHAR2(500)
);

create table reklamacje(
    ID numeric primary key,
    IDProd numeric,
    IDUzyt numeric,
    Data DATE,
    Opis NVARCHAR2(500),
    Dzialanie NVARCHAR2(50)
); 

create table oceny(
    ID numeric primary key,
    IDProd numeric,
    IDUzyt numeric,
    Data DATE,
    Opis NVARCHAR2(500),
    Ocena FLOAT
);

create table typy (
    ID numeric primary key,
    IDGr numeric,
    Nazwa NVARCHAR2(50)
);

create table grupy (
    ID numeric primary key,
    IDKat numeric,
    Nazwa NVARCHAR2(50)
);

create table kategorie (
    ID numeric primary key,
    Nazwa NVARCHAR2(50)
);

create table ulubione (
    IDProd numeric,
    IDUzyt numeric
);

create table zdjecia (
    ID numeric primary key,
    IDProd numeric,
    Zdjecie NVARCHAR2(50)
);

create table kodyRabatowe (
    ID numeric primary key,
    Kod numeric,
    Rabat FLOAT,
    DataWaznosci DATE,
    CzyUzyty char(1) default 'F',
    CONSTRAINT CzyUzytyCheck CHECK (CzyUzyty IN ('F','T'))
); 

create table firmy (
    ID numeric primary key,
    IDUzyt numeric,
    Nazwa NVARCHAR2(50),
    Telefon NVARCHAR2(9)
); 

create table silownie (
    ID numeric primary key,
    IDFirmy numeric,
    Nazwa NVARCHAR2(50),
    Adres NVARCHAR2(50),
    Telefon NVARCHAR2(9)
); 

create table umowy (
    ID numeric primary key,
    IDSil numeric,
    DataZawarcia DATE,
    DataZakonczenia DATE,
    Opis NVARCHAR2(500),
    Cena FLOAT
);  

create table serwisy (
    ID numeric primary key,
    IDUmowy numeric,
    Data DATE,
    Opis NVARCHAR2(500)
); 

  Create sequence uzytkownikID
    minvalue 0
    start with 1
    increment by 1;
  Create sequence serwisyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence umowyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence silownieID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence firmyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence kodyRabatoweID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence zdjeciaID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence ulubioneID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence kategorieID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence grupyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence typyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence ocenyID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence reklamacjeID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence transakcjeID
    minvalue 0
    start with 1
    increment by 1;
      Create sequence produktyID
    minvalue 0
    start with 1
    increment by 1;
    