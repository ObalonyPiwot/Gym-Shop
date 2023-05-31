package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



public class KodRabatowy {
    private int id;
    private String kod;
    private int rabat;
    private String dataWaznosci;
    private String czyUzyty;

    // Constructors, getters, and setters

    public KodRabatowy(int id, String kod, int rabat, String dataWaznosci, String czyUzyty) {
        this.id = id;
        this.kod = kod;
        this.rabat = rabat;
        this.dataWaznosci = dataWaznosci;
        this.czyUzyty = czyUzyty;
    }

    public KodRabatowy() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getKod() {
        return kod;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public int getRabat() {
        return rabat;
    }

    public void setRabat(int rabat) {
        this.rabat = rabat;
    }

    public String getDataWaznosci() {
        return dataWaznosci;
    }

    public void setDataWaznosci(String dataWaznosci) {
        this.dataWaznosci = dataWaznosci;
    }

    public String getCzyUzyty() {
        return czyUzyty;
    }

    public void setCzyUzyty(String czyUzyty) {
        this.czyUzyty = czyUzyty;
    }

    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
