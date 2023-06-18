package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Transaction {
    private String dane;
    private double cena;

    public Transaction(String dane, double cena) {
        this.dane = dane;
        this.cena = cena;
    }

    public Transaction() {
    }
    // Gettery i settery dla pól

    public String getDane()
    {
        return this.dane;
    }
    public double getCena()
    {
        return this.cena;
    }

    public void setDane(String dane)
    {
        this.dane = dane;
    }
    public void setCena( double cena){
        this.cena = cena;
    }

    public String toJSON() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
