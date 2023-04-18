package pl.gymshopspring;

import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.session.Session;
import org.springframework.session.SessionRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class Controller {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SessionData mySessionData;

    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping("/test")
    public String registration() throws SQLException {
        String sql = "Select login from uzytkownik where ID = 1";
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);
        System.out.println("Wykonano");
        return "{\"Status\":\""+data+"\"}";
    }

    @GetMapping("/login/{login}/{password}")
    public String login(@PathVariable("login") String login,@PathVariable("password") String password) throws SQLException {
        String sql = "Select haslo from uzytkownik where login = '" + login + "'";
        System.out.println(sql);

        try {
            String data = (String) jdbc.queryForObject(sql, new Object[]{}, String.class);
            return "{\"Status\":\"" + data + "\"}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\",\"Message\":\"User not found\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }

    @GetMapping("/register/{login}/{password}/{email}/{imie}/{nazwisko}/{telefon}")
    public String login(@PathVariable("login") String login,@PathVariable("password") String password,
                        @PathVariable("email") String email,@PathVariable("imie") String imie,
                        @PathVariable("nazwisko") String nazwisko,@PathVariable("telefon") String telefon) throws SQLException {
        String sql = "INSERT INTO uzytkownik VALUES(UzytkownikID.nextVal, '"+imie+"','"+nazwisko+"','Klient','"+login+"','"+password+"','"+email+"', '"+telefon+"')" ;
        System.out.println(sql);

        jdbc.update(sql);
        return "{\"Status\":\"registered\"}";
    }

    @GetMapping("/session")

    public ResponseEntity<Map<String, Object>> getSession(HttpSession session) {
        Map<String, Object> sessionData = new HashMap<>();
        String sql = "Select login from uzytkownik where ID = 1";
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);

        sessionData.put("sessionId", session.getId());
        sessionData.put("username", data);
        sessionData.put("isLoggedIn", session.getAttribute("isLoggedIn"));
        return ResponseEntity.ok(sessionData);
    }

    //HOME - ZAMOWIENIE
    @PostMapping ("/Cart/AddToCart")
    public void addItems(@RequestBody String item)
    {
        JSONObject json = new JSONObject(item);
        System.out.println(json);
        mySessionData.setSessionData("Produkt", json.getString("title"));
        System.out.println(mySessionData.getSessionData());

    }
}