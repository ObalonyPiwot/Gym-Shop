package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Umowa {
    private String nazwa;
    private String dataZawarcia;
    private String dataZakonczenia;
    private String opis;
    private String cena;

    public Umowa(String nazwa, String dataZawarcia, String dataZakonczenia, String opis, String cena) {
        this.nazwa = nazwa;
        this.dataZawarcia = dataZawarcia;
        this.dataZakonczenia = dataZakonczenia;
        this.opis = opis;
        this.cena = cena;
    }

    // Getters and Setters
    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getDataZawarcia() {
        return dataZawarcia;
    }

    public void setDataZawarcia(String dataZawarcia) {
        this.dataZawarcia = dataZawarcia;
    }

    public String getDataZakonczenia() {
        return dataZakonczenia;
    }

    public void setDataZakonczenia(String dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getCena() {
        return cena;
    }

    public void setCena(String cena) {
        this.cena = cena;
    }
    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

}



