package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Silownia {
    private int id;
    private int idFirmy;
    private String nazwa;
    private String adres;
    private String telefon;

    public Silownia(int id, int idFirmy, String nazwa, String adres, String telefon) {
        this.id = id;
        this.idFirmy = idFirmy;
        this.nazwa = nazwa;
        this.adres = adres;
        this.telefon = telefon;
    }
    public Silownia() {
    }

    // Gettery i Settery

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdFirmy() {
        return idFirmy;
    }

    public void setIdFirmy(int idFirmy) {
        this.idFirmy = idFirmy;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getAdres() {
        return adres;
    }

    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}

