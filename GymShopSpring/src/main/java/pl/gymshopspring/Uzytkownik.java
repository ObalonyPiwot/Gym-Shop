package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Uzytkownik {
    private Long id;
    private String imie;
    private String nazwisko;
    private String typKonta;
    private String haslo;
    private String email;
    private String telefon;

    public Uzytkownik(Long id, String imie, String nazwisko, String typKonta, String haslo, String email, String telefon) {
        this.id = id;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.typKonta = typKonta;
        this.haslo = haslo;
        this.email = email;
        this.telefon = telefon;
    }
    public Uzytkownik(ResultSet rs) throws SQLException {
        this.id = rs.getLong("ID");
        this.imie = rs.getString("Imie");
        this.nazwisko = rs.getString("Nazwisko");
        this.typKonta = rs.getString("TypKonta");
        this.haslo = rs.getString("Haslo");
        this.email = rs.getString("Email");
        this.telefon = rs.getString("Telefon");
    }
    // getters i setters dla wszystkich pól
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getTypKonta() {
        return typKonta;
    }

    public void setTypKonta(String typKonta) {
        this.typKonta = typKonta;
    }

    public String getHaslo() {
        return haslo;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    @Override
    public String toString() {
        return "Uzytkownik{" +
                "id=" + id +
                ", imie='" + imie + '\'' +
                ", nazwisko='" + nazwisko + '\'' +
                ", typKonta='" + typKonta + '\'' +
                ", haslo='" + haslo + '\'' +
                ", email='" + email + '\'' +
                ", telefon='" + telefon + '\'' +
                '}';
    }
}
