package pl.gymshopspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
public class DiscountController {

    @Autowired
    private JdbcTemplate jdbc;

    @PostMapping("/discountCode/checkIfExists/{discountCode}")
    public String checkIfExists(@PathVariable("discountCode") String discountCode) throws SQLException {
        String sql = "Select Rabat from KODYRABATOWE where czyuzyty='F' and KOD = '"+discountCode+"'";

        try {
            int count = jdbc.queryForObject(sql, Integer.class);
            System.out.println(count);
            sql = "UPDATE KODYRABATOWE SET CZYUZYTY = 'T' WHERE KOD = '"+discountCode+"'";
            jdbc.update(sql);
            return Integer.toString(count);
        } catch (EmptyResultDataAccessException e) {
        return "{\"Status\":\"error\"}";
    } catch (Exception e) {
        return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
    }

    }
}
