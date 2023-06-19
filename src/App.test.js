import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct  from './components/ForAdmin/AddProduct';
import DeleteProducts  from './components/ForAdmin/DeleteProducts';
import GetSaleCodes  from './components/ForAdmin/GetSaleCodes';
import SetPromotion  from './components/ForAdmin/SetPromotion';
import ChangeData  from './components/Account/ChangeData';
import AddFirm  from './components/ForFirms/AddFirm';
import AddGym  from './components/ForFirms/AddGym';


describe('Navbar', () => {
  it('renders component correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Ulubione')).toBeInTheDocument();
    expect(screen.getByText('Koszyk')).toBeInTheDocument();
    expect(screen.getByText('Promocje')).toBeInTheDocument();
    expect(screen.getByText('Nowości')).toBeInTheDocument();
    expect(screen.getByText('Konto')).toBeInTheDocument();
  });
});
  describe('Sidebar', () => {
    beforeEach(() => {
      // Mockowanie fetch
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Kategorie: [
            { id: 1, nazwa: 'Kategoria 1' },
            { id: 2, nazwa: 'Kategoria 2' },
            { id: 3, nazwa: 'Kategoria 3' },
          ],
        }),
      });
    });
  
    afterEach(() => {
      // Resetowanie mocka fetch po każdym teście
      global.fetch.mockClear();
    });
  
    it('renders category buttons correctly', async () => {
      render(<Sidebar setCat={jest.fn()} />);
  
      // Oczekiwanie na pobranie danych
      await screen.findByText('Kategoria 1');
  
      expect(screen.getByText('Kategoria 1')).toBeInTheDocument();
      expect(screen.getByText('Kategoria 2')).toBeInTheDocument();
      expect(screen.getByText('Kategoria 3')).toBeInTheDocument();
    });
  
    it('calls setCat function when category button is clicked', async () => {
      const setCatMock = jest.fn();
      render(<Sidebar setCat={setCatMock} />);
  
      // Oczekiwanie na pobranie danych
      await screen.findByText('Kategoria 1');
  
      fireEvent.click(screen.getByText('Kategoria 2'));
      expect(setCatMock).toHaveBeenCalledWith(2);
  
      fireEvent.click(screen.getByText('Kategoria 3'));
      expect(setCatMock).toHaveBeenCalledWith(3);
    });
  });


  describe('AddProduct', () => {
    beforeEach(() => {
      // Mockowanie fetch dla pobierania kategorii
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Kategorie: [
            { id: 1, nazwa: 'Kategoria 1' },
            { id: 2, nazwa: 'Kategoria 2' },
            { id: 3, nazwa: 'Kategoria 3' },
          ],
          Grupy: [
            { id: 1, nazwa: 'Grupa 1', idKat: 1 },
            { id: 2, nazwa: 'Grupa 2', idKat: 2 },
            { id: 3, nazwa: 'Grupa 3', idKat: 3 },
          ],
        }),
      });
    });
  
    afterEach(() => {
      // Resetowanie mocka fetch po każdym teście
      global.fetch.mockClear();
    });
  
    it('renders category options correctly', async () => {
      render(<AddProduct />);
  
      // Oczekiwanie na pobranie danych
      await screen.findByText('Kategoria 1');
  
      expect(screen.getByText('Kategoria 1')).toBeInTheDocument();
      expect(screen.getByText('Kategoria 2')).toBeInTheDocument();
      expect(screen.getByText('Kategoria 3')).toBeInTheDocument();
    });
  
    it('updates selected category correctly', async () => {
      render(<AddProduct />);
  
      // Oczekiwanie na pobranie danych
      await screen.findByText('Kategoria 1');
  
      const selectElement = screen.getByLabelText('Kategoria');
      fireEvent.change(selectElement, { target: { value: '2' } });
  
      expect(selectElement.value).toBe('2');
    });
  });

  describe('DeleteProducts', () => {
    beforeEach(() => {
      // Mockowanie fetch dla pobierania produktów
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Produkty: [
            { id: 1, nazwa: 'Produkt 1' },
            { id: 2, nazwa: 'Produkt 2' },
            { id: 3, nazwa: 'Produkt 3' },
          ],
        }),
      });
    });
  
    afterEach(() => {
      // Resetowanie mocka fetch po każdym teście
      global.fetch.mockClear();
    });
  
    it('renders DeleteProducts correctly', async () => {
      render(<DeleteProducts />);
  
      expect(screen.getByText('Usuń produkt')).toBeInTheDocument();
      expect(screen.getByText('Usuń')).toBeInTheDocument();
      expect(screen.getByText('Cofnij')).toBeInTheDocument();
    });
  });

  describe('GetSaleCodes', () => {
    beforeEach(() => {
      // Mockowanie fetch
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Kody: [
            { id: 1, kod: 'KOD1', rabat: 10, dataWaznosci: '2023-06-30', czyUzyty: "F" },
            { id: 2, kod: 'KOD2', rabat: 20, dataWaznosci: '2023-07-31', czyUzyty: "T" },
            { id: 3, kod: 'KOD3', rabat: 30, dataWaznosci: '2023-08-31', czyUzyty: "F" },
          ],
        }),
      });
    });
  
    afterEach(() => {
      // Resetowanie mocka fetch po każdym teście
      global.fetch.mockClear();
    });
  
    it('renders sale codes correctly', async () => {
      render(<GetSaleCodes />);
  
      // Oczekiwanie na pobranie danych
      await screen.findByText('Kod: KOD1');
  
      expect(screen.getByText('Kod: KOD1')).toBeInTheDocument();
      expect(screen.getByText('Rabat: 10 Data ważności: 2023-06-30 Czy użyty: F')).toBeInTheDocument();
      expect(screen.getByText('Kod: KOD2')).toBeInTheDocument();
      expect(screen.getByText('Rabat: 20 Data ważności: 2023-07-31 Czy użyty: T')).toBeInTheDocument();
      expect(screen.getByText('Kod: KOD3')).toBeInTheDocument();
      expect(screen.getByText('Rabat: 30 Data ważności: 2023-08-31 Czy użyty: F')).toBeInTheDocument();
    });
  });

  describe('SetPromotion', () => {
    beforeEach(() => {
      // Mockowanie fetch dla pobierania produktów
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Produkty: [
            { id: 1, nazwa: 'Produkt 1' },
            { id: 2, nazwa: 'Produkt 2' },
            { id: 3, nazwa: 'Produkt 3' },
          ],
        }),
      });
    });
  
    afterEach(() => {
      // Resetowanie mocka fetch po każdym teście
      global.fetch.mockClear();
    });
  
    it('renders SetPromotion correctly', async () => {
      render(<SetPromotion />);
  
      expect(screen.getByText('Promocja')).toBeInTheDocument();
      expect(screen.getByText('Cena')).toBeInTheDocument();
      expect(screen.getByText('Aktualizuj produkt')).toBeInTheDocument();
    });
  });
  describe('ChangeData', () => {
    const user = {
      imie: 'John',
      nazwisko: 'Doe',
      email: 'johndoe@example.com',
      telefon: '123456789',
      password: 'password123',
    };
    it('renders ChangeData correctly', async () => {
      render(<ChangeData user={user}/>);
  
    expect(screen.getByText('Wprowadź nowe dane kontaktowe')).toBeInTheDocument();
    expect(screen.getByText('Imie')).toBeInTheDocument();
    expect(screen.getByLabelText('Imie')).toHaveValue('John');
    expect(screen.getByText('Nazwisko')).toBeInTheDocument();
    expect(screen.getByLabelText('Nazwisko')).toHaveValue('Doe');
    expect(screen.getByText('Telefon')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefon')).toHaveValue('123456789');
    expect(screen.getByText('Zmien dane')).toBeInTheDocument();
    expect(screen.getByText('Anuluj')).toBeInTheDocument();
    });
  });
