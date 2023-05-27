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
import org.springframework.jdbc.core.RowMapper;
import org.springframework.session.SessionRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
        String data = (String) jdbc.queryForObject(sql, new Object[]{}, String.class);
        System.out.println("Wykonano");
        return "{\"Status\":\"" + data + "\"}";
    }



    //HOME - ZAMOWIENIE
    @PostMapping("/Cart/setRedisData")
    @ResponseBody
    public String setDataInSession(@RequestBody String item, HttpServletRequest request) {
        JSONObject json = new JSONObject(item);
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        if (sessionData == null) {
            sessionData = new SessionData();
        }
        sessionData.setData("collections", json.getString("title"), json.toString());
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

    @GetMapping("/generateSaleCodes/{amount}/{discount}/{time}")
    public String generateSaleCodes(@PathVariable("amount") int amount,  @PathVariable("discount") String discount,
                                    @PathVariable("time") String time) throws SQLException {
        System.out.println("dodawanie kodów");
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String code ="";
        Random random = new Random();
        for(int i=0;i<amount;i++) {
            for(int a=0;a<4;a++) {
                for (int b = 0; b < 4; b++)
                    code=code+(characters.charAt(random.nextInt(characters.length())));
                if(a<3)
                    code=code+"-";
            }
            String sql = "INSERT INTO KODYRABATOWE (ID, KOD, RABAT, DataWaznosci) VALUES (KODYRABATOWEID.nextval, '"+code+"'," +
                    " "+discount+", (select sysdate+"+time+" from dual))";
            System.out.println(sql);
            code="";
            jdbc.update(sql);
        }
        System.out.println("dodano "+amount+" kodów z "+discount+" rabatem na czas "+time+" dni");
        return "{\"Status\":\"success\"}";

    }

    @GetMapping("/selectSaleCodes")
    public String selectSaleCodes() throws SQLException {
        String sql = "Select * from KODYRABATOWE where czyuzyty='F' and (Select sysdate from dual)<datawaznosci";
        try {
            System.out.println(sql);
            List<KodRabatowy> result = jdbc.query(sql, new RowMapper<KodRabatowy>() {
                @Override
                public KodRabatowy mapRow(ResultSet rs, int rowNum) throws SQLException {
                    KodRabatowy kod = new KodRabatowy(rs.getInt("ID"),rs.getString("Kod"), rs.getInt("Rabat"),
                            rs.getString("DataWaznosci"), rs.getString("CzyUzyty"));
                    return kod;
                }
            });
            String returnCodes ="";
            for(int i=0;i<result.size();i++) {
                returnCodes += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnCodes +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Kody\":["+returnCodes+"]}");
            return"{\"Status\":\"success\", \"Kody\":["+returnCodes+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/selectCategories")
    public String selectCategories() throws SQLException {
        String sql = "Select * from KATEGORIE";
        try {
            System.out.println(sql);
            List<Kategoria> result = jdbc.query(sql, new RowMapper<Kategoria>() {
                @Override
                public Kategoria mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Kategoria kat = new Kategoria(rs.getInt("ID"), rs.getString("Nazwa"));
                    return kat;
                }
            });
            String returnKat ="";
            for(int i=0;i<result.size();i++) {
                returnKat += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnKat +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Kategorie\":["+returnKat+"]}");
            return"{\"Status\":\"success\", \"Kategorie\":["+returnKat+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/selectGroups")
    public String selectGroups() throws SQLException {
        String sql = "Select * from Grupy";
        try {
            System.out.println(sql);
            List<Grupa> result = jdbc.query(sql, new RowMapper<Grupa>() {
                @Override
                public Grupa mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Grupa grupa = new Grupa(rs.getInt("ID"),rs.getInt("IDKat"), rs.getString("Nazwa"));
                    return grupa;
                }
            });
            String returnGroups ="";
            for(int i=0;i<result.size();i++) {
                returnGroups += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnGroups +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Grupy\":["+returnGroups+"]}");
            return"{\"Status\":\"success\", \"Grupy\":["+returnGroups+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }

    @GetMapping("/insertProduct/{productName}/{productDescription}/{productPrice}/{selectedGroup}")
    public String insertProduct(@PathVariable("productName") String productName,
                                @PathVariable("productDescription") String productDescription,@PathVariable("productPrice") String productPrice,
                                @PathVariable("selectedGroup") String selectedGroup) throws SQLException {
        String sql = "INSERT INTO produkty(ID, NAZWA, OPIS, CENA, IDGRUPY) VALUES(PRODUKTYID.nextVal, '"+productName+"','"+productDescription+"','"+productPrice+"','"+selectedGroup+"')" ;
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }

    }

    @GetMapping("/selectProducts/{selectedGroup}")
    public String selectProducts(@PathVariable("selectedGroup") String selectedGroup) throws SQLException {
        String sql = "Select * from Produkty where IDGrupy ="+selectedGroup+" and isActive=1 and onPromotion=0" ;
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"));
                    return produkt;
                }
            });
            String returnProducts ="";
            for(int i=0;i<result.size();i++) {
                returnProducts += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnProducts +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}");
            return"{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/selectProductsForSale")
    public String selectProductsForSale() throws SQLException {
        String sql = "Select * from Produkty where isActive=1 and onPromotion=0" ;
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"));
                    return produkt;
                }
            });
            String returnProducts ="";
            for(int i=0;i<result.size();i++) {
                returnProducts += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnProducts +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}");
            return"{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/selectProducts")
    public String selectProducts() throws SQLException {
        String sql = "Select * from Produkty where isActive=1" ;
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"));
                    return produkt;
                }
            });
            String returnProducts ="";
            for(int i=0;i<result.size();i++) {
                returnProducts += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnProducts +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}");
            return"{\"Status\":\"success\", \"Produkty\":["+returnProducts+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }

    @GetMapping("/updateProduct/{productId}/{newPrice}/{onPromotion}")
    public String updateProduct(@PathVariable("productId") String productId, @PathVariable("newPrice") String newPrice,
                                @PathVariable("onPromotion") String onPromotion) throws SQLException {
        String sql = "Update produkty set cena = '"+newPrice+"', onPromotion = '"+onPromotion+"' where ID = '"+productId+"'" ;
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }

    }
    @GetMapping("/deleteProduct/{productId}")
    public String deleteProduct(@PathVariable("productId") String productId) throws SQLException {
        String sql = "Update produkty set isActive = '0' where ID = '"+productId+"'" ;
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }

    }
}

