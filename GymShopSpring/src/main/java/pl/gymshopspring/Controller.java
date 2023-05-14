package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
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
        try {
            String pass = jdbc.queryForObject(sql, new Object[]{}, String.class);
            if(pass.equals(password)) {
                String sqlGetUser = "Select * from uzytkownik where email = '" + email + "'";
                Uzytkownik uzytkownik = jdbc.queryForObject(sqlGetUser, new Uzytkownik[]{}, (rs, rowNum) -> {
                    Uzytkownik u = new Uzytkownik(rs);
                    return u;
                });
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
    public String register(@PathVariable("password") String password,
                        @PathVariable("email") String email,@PathVariable("imie") String imie,
                        @PathVariable("nazwisko") String nazwisko,@PathVariable("telefon") String telefon) throws SQLException {
        String sql = "INSERT INTO uzytkownik VALUES(UzytkownikID.nextVal, '"+imie+"','"+nazwisko+"','Klient','"+password+"','"+email+"', '"+telefon+"')" ;
        String sqlCheck = "SELECT count(*) FROM uzytkownik where email = '" + email + "' group by email";
        try {
            jdbc.queryForObject(sqlCheck, Integer.class);
            return "{\"Status\":\"exists\"}";
        } catch (Exception e) {
            try {
                jdbc.update(sql);
                return "{\"Status\":\"success\"}";
            } catch (Exception ex) {
                return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
            }
        }
    }

    @GetMapping("/googleLogin/{email}")
    public String googleLogin(@PathVariable("email") String email) throws SQLException {
        String sqlCheck = "SELECT count(*) FROM uzytkownik where email = '" + email + "' group by email";
        try {
            jdbc.queryForObject(sqlCheck, Integer.class);
            String sqlGetUser = "Select * from uzytkownik where email = '" + email + "'";
            Uzytkownik uzytkownik = jdbc.queryForObject(sqlGetUser, new Uzytkownik[]{}, (rs, rowNum) -> {
                Uzytkownik u = new Uzytkownik(rs);
                return u;
            });
            return "{\"Status\":\"success\",\"User\":" + uzytkownik.toJSON() + "}";
        } catch (EmptyResultDataAccessException e) {
            try {
                return "{\"Status\":\"firstTime\"}";
            } catch (Exception ex) {
                return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login/setUserToSession")
    @ResponseBody
    public String setUserSession(@RequestBody String userData,HttpServletRequest request) {
        JSONObject json = new JSONObject(userData);
        int idValue = json.getInt("id");
        String idString = String.valueOf(idValue);
        json.put("id", idString);
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        if (sessionData == null) {
            sessionData = new SessionData();
        }
        sessionData.setData("user","id", json.toString());
        redisTemplate.opsForValue().set(sessionId, sessionData);
        return "Data set in session";
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
        sessionData.setData("collections",json.getString("title"), json.toString());
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