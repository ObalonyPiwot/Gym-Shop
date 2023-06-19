package pl.gymshopspring;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Reklamacja {
    private int id;
    private String Produkt;
    private String Uzytkownik;
    private String data;
    private String opis;

    public Reklamacja(int id, String Produkt, String Uzytkownik, String data, String opis) {
        this.id = id;
        this.Produkt = Produkt;
        this.Uzytkownik = Uzytkownik;
        this.data = data;
        this.opis = opis;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIdProdukt() {
        return Produkt;
    }

    public void setIdProdukt(String idProdukt) {
        this.Produkt = idProdukt;
    }

    public String getIdUzytkownik() {
        return Uzytkownik;
    }

    public void setIdUzytkownik(String idUzytkownik) {
        this.Uzytkownik = idUzytkownik;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
