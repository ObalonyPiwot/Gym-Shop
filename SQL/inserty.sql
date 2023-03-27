
create table uzytkownik(
    ID numeric primary key,
    Imie NVARCHAR2(50),
    Nazwisko NVARCHAR2(50),
    TypKonta NVARCHAR2(50),
    Login NVARCHAR2(50),
    Haslo NVARCHAR2(50),
    Email NVARCHAR2(50),
    Telefon NVARCHAR2(9)
);

INSERT INTO uzytkownik VALUES(UzytkownikID.nextVal, 'Imie','Nazwisko','Admin','login','haslo','email@gmail.com', '123456789');