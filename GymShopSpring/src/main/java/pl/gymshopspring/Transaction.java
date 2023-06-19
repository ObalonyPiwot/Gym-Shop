package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Transaction {

    private int id;
    private String data;
    private String dane;
    private double cena;
    private int ilosc;
    private String czySukces;

    public Transaction(int id, String data, String dane, double cena, int ilosc, String czySukces) {
        this.id = id;
        this.data = data;
        this.dane = dane;
        this.cena = cena;
        this.ilosc = ilosc;
        this.czySukces = czySukces;
    }

    public Transaction() {
    }
    // Gettery i settery dla pól

    public String getDane()
    {
        return this.dane;
    }
    public String getData()
    {
        return this.data;
    }
    public double getCena()
    {
        return this.cena;
    }
    public int getIlosc() { return this.ilosc;}
    public int getId() { return this.id;}
    public String getCzySukces() { return this.czySukces ;}

    public void setDane(String dane)
    {
        this.dane = dane;
    }
    public void setCena( double cena){
        this.cena = cena;
    }
    public void  setIlosc(int ilosc) { this.ilosc = ilosc;}

    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
