package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Produkt {
    private int id;
    private String nazwa;
    private String opis;
    private String zdjecie;
    private double cena;
    private double ostCena;
    private int idGrupy;
    private int isActive;
    private int onPromotion;

    public Produkt(int id, String nazwa, String opis, String zdjecie, double cena, int idGrupy, int isActive, int onPromotion, double ostCena) {
        this.id = id;
        this.nazwa = nazwa;
        this.opis = opis;
        this.zdjecie = zdjecie;
        this.cena = cena;
        this.idGrupy = idGrupy;
        this.isActive = isActive;
        this.onPromotion = onPromotion;
        this.ostCena = ostCena;
    }
    public Produkt(int id, String nazwa, String opis, String zdjecie, double cena, int idGrupy, int isActive, int onPromotion) {
        this(id, nazwa, opis, zdjecie, cena, idGrupy, isActive, onPromotion, 0);
    }
    public Produkt() {
    }
    // Gettery i settery dla pól

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public int getIdGrupy() {
        return idGrupy;
    }

    public void setIdGrupy(int idGrupy) {
        this.idGrupy = idGrupy;
    }

    public int getIsActive() {
        return isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }

    public int getOnPromotion() {
        return onPromotion;
    }

    public void setOnPromotion(int onPromotion) {
        this.onPromotion = onPromotion;
    }

    public String getZdjecie() {
        return zdjecie;
    }

    public void setZdjecie(String zdjecie) {
        this.zdjecie = zdjecie;
    }

    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
