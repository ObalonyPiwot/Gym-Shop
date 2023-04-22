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