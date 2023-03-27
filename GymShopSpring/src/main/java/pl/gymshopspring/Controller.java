package pl.gymshopspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;

@CrossOrigin
@RestController
public class Controller {

    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping("/test")
    public String registration() throws SQLException {
        String sql = "Select login from uzytkownik where ID = 1";
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);
        return "{\"Status\":\""+data+"\"}";
    }

    @GetMapping("/login/{login}/{password}")
    public String login(@PathVariable("login") String login,@PathVariable("password") String password) throws SQLException {
        String sql = "Select haslo from uzytkownik where login = "+login;
        System.out.println(sql);
        
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);
        return "{\"Status\":\""+data+"\"}";
    }
}