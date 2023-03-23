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
        String sql = "Select login from uzytkownik where ID_uzytkownika = 1";
        String data = (String) jdbc.queryForObject(sql, new Object[] { }, String.class);
        return "{\"Status\":\""+data+"\"}";
    }
}