package pl.gymshopspring;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.session.SessionRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class Controller {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private RedisTemplate<String, SessionData> redisTemplate;


    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping("/test")
    public String registration() throws SQLException {
        String sql = "Select login from uzytkownik where ID = 1";
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);
        System.out.println("Wykonano");
        return "{\"Status\":\""+data+"\"}";
    }

    @GetMapping("/login/{email}/{password}")
    public String login(@PathVariable("email") String email,@PathVariable("password") String password) throws SQLException {
        String sql = "Select haslo from uzytkownik where email = '" + email + "'";
        System.out.println(email);
        System.out.println(password);
        System.out.println(sql);
        try {
            String pass = jdbc.queryForObject(sql, new Object[]{}, String.class);
            System.out.println(pass);
            if(pass.equals(password)) {
                String sqlGetUser = "Select * from uzytkownik where email = '" + email + "'";
                Uzytkownik uzytkownik = jdbc.queryForObject(sqlGetUser, new Uzytkownik[]{}, (rs, rowNum) -> {
                    Uzytkownik u = new Uzytkownik(rs);
                    return u;
                });
                System.out.println(uzytkownik.toString());
                System.out.println("{\"Status\":\"success\",\"User\":"+uzytkownik.toJSON()+"}");
                return "{\"Status\":\"success\",\"User\":"+uzytkownik.toJSON()+"}";
            }
            else return "{\"Status\":\"error\",\"Message\":\"Wrong password\"}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\",\"Message\":\"User not found\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }

    @GetMapping("/register/{password}/{email}/{imie}/{nazwisko}/{telefon}")
    public String login(@PathVariable("password") String password,
                        @PathVariable("email") String email,@PathVariable("imie") String imie,
                        @PathVariable("nazwisko") String nazwisko,@PathVariable("telefon") String telefon) throws SQLException {
        String sql = "INSERT INTO uzytkownik VALUES(UzytkownikID.nextVal, '"+imie+"','"+nazwisko+"','Klient','"+password+"','"+email+"', '"+telefon+"')" ;
        System.out.println(sql);
        String sqlCheck = "SELECT count(*) FROM uzytkownik where email = '" + email + "' group by email";
        System.out.println(sqlCheck);
        try {
            jdbc.queryForObject(sqlCheck, Integer.class);
            return "{\"Status\":\"exists\"}";
        } catch (Exception e) {
            try {
                int data = jdbc.update(sql);
                return "{\"Status\":\"success\"}";
            } catch (Exception ex) {
                return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
            }
        }
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
    @PostMapping("/Cart/setRedisData")
    @ResponseBody
    public String setDataInSession(@RequestBody String item,HttpServletRequest request) {
        JSONObject json = new JSONObject(item);
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        if (sessionData == null) {
            sessionData = new SessionData();
        }
        sessionData.setData(json.getString("title"), json.toString());
        redisTemplate.opsForValue().set(sessionId, sessionData);
        return "Data set in session";
    }


    //NAVBAR - KOSZYK
    @GetMapping("/getDataFromSession")
    @ResponseBody
    public String getDataFromSession(HttpServletRequest request) {
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        if (sessionData != null) {
            return sessionData.getData().toString();
        } else {
            return "Session not found";
        }
    }


    @GetMapping("/api/getSessionID")
    public String getSessionId(HttpServletRequest request) {
        return request.getSession().getId();
    }


}