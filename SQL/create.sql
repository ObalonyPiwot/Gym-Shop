drop table uzytkownik;
drop sequence UzytkownikID;

create table uzytkownik(
    ID_uzytkownika numeric primary key,
    login NVARCHAR2(50),
    haslo NVARCHAR2(50),
    czyKontrahent char(1) default 'F',
    CONSTRAINT CheckczyKontrahent CHECK (czyKontrahent IN ('F','T'))
);

  Create sequence UzytkownikID
    minvalue 0
    start with 1
    increment by 1;

INSERT INTO Uzytkownik(ID_UZYTKOWNIKA,LOGIN,HASLO) Values (UzytkownikID.nextVal, 'login1', 'haslo1');
INSERT INTO Uzytkownik(ID_UZYTKOWNIKA,LOGIN,HASLO) Values (UzytkownikID.nextVal, 'login2', 'haslo2');
INSERT INTO Uzytkownik(ID_UZYTKOWNIKA,LOGIN,HASLO) Values (UzytkownikID.nextVal, 'login3', 'haslo3');

Select * from uzytkownik where ID_uzytkownika = 1;