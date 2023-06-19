package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Firma {
    private int id;
    private int idUzyt;
    private String nazwa;
    private String telefon;

    public Firma(int id, int idUzyt, String nazwa, String telefon) {
        this.id = id;
        this.idUzyt = idUzyt;
        this.nazwa = nazwa;
        this.telefon = telefon;
    }
    public Firma() {
    }


    public int getId() {
        return id;
    }

    public int getIdUzyt() {
        return idUzyt;
    }

    public String getNazwa() {
        return nazwa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setIdUzyt(int idUzyt) {
        this.idUzyt = idUzyt;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}