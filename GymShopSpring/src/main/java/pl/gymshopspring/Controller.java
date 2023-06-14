package pl.gymshopspring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.session.SessionRepository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.io.File;
import java.io.IOException;
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



    @GetMapping("/selectProducts/{selectedGroup}")
    public String selectProducts(@PathVariable("selectedGroup") String selectedGroup) throws SQLException {
        String sql = "Select * from Produkty where IDGrupy ="+selectedGroup+" and isActive=1 and onPromotion=0" ;
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"), rs.getString("Zdjecie"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"), rs.getDouble("Ocena"));
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
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"), rs.getString("Zdjecie"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"), rs.getDouble("Ocena"));
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
        String sql = "SELECT P.*, COALESCE(AVG(O.ocena), 0) AS Ocena FROM Produkty P LEFT JOIN Oceny O ON P.id = O.idProd " +
                "WHERE P.isActive = 1 GROUP BY P.ID,P.NAZWA,P.OPIS,P.ZDJECIE,P.CENA,P.OSTCENA,P.DATADODANIA,P.IDGRUPY,P.ISACTIVE,P.ONPROMOTION";
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"), rs.getString("Zdjecie"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"), rs.getDouble("Ocena"));
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
    @GetMapping("/selectNewest")
    public String selectNewest() throws SQLException {
        String sql = "Select * from Produkty where isActive=1 and dataDodania>SYSDATE-30" ;
        try {
            System.out.println(sql);
            List<Produkt> result = jdbc.query(sql, new RowMapper<Produkt>() {
                @Override
                public Produkt mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Produkt produkt = new Produkt(rs.getInt("ID"),rs.getString("nazwa"), rs.getString("Opis"), rs.getString("Zdjecie"),
                            rs.getDouble("Cena"), rs.getInt("IDGrupy"),rs.getInt("isActive"), rs.getInt("onPromotion"), rs.getDouble("Ocena"));
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
    // - delete products when payment will succesful
    @GetMapping("/deleteProducts")
    public String deleteProducts(HttpServletRequest request){
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        sessionData.getData().remove("collections");
        redisTemplate.opsForValue().set(sessionId, sessionData);
        return "Succes";
    }

    // delete selected item
    @PostMapping("/deleteProduct")
    public String deleteProduct(@RequestBody String item, HttpServletRequest request) throws SQLException {
        String sessionId = request.getHeader("SESSIONID");
        SessionData sessionData = redisTemplate.opsForValue().get(sessionId);
        sessionData.getData().get("collections").remove(item);
        redisTemplate.opsForValue().set(sessionId, sessionData);
        return "";
    }
    @GetMapping("/selectUserFirm/{userID}")
    public String selectUserFirm(@PathVariable("userID") String userID) throws SQLException {
        String sql = "Select * from Firmy where IDUzyt="+userID;
        try {
            System.out.println(sql);
            List<Firma> result = jdbc.query(sql, new RowMapper<Firma>() {
                @Override
                public Firma mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Firma firma = new Firma(rs.getInt("ID"),rs.getInt("idUzyt"), rs.getString("nazwa"),
                            rs.getString("telefon"));
                    return firma;
                }
            });
            String returnFirms ="";
            for(int i=0;i<result.size();i++) {
                returnFirms += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnFirms +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Firmy\":["+returnFirms+"]}");
            return"{\"Status\":\"success\", \"Firmy\":["+returnFirms+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/insertUserFirm/{userID}/{firmName}/{telefon}")
    public String insertFirm(@PathVariable("userID") String userID,@PathVariable("firmName") String firmName,@PathVariable("telefon") String telefon) throws SQLException {
        String sql = "INSERT INTO firmy VALUES(firmyID.nextVal, '" + userID + "','" + firmName + "','" + telefon +"')";
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }
    }
    @GetMapping("/selectUserGyms/{firmID}")
    public String selectUserGyms(@PathVariable("firmID") String firmID) throws SQLException {
        String sql = "Select * from silownie  where IDFirmy="+firmID;
        try {
            System.out.println(sql);
            List<Silownia> result = jdbc.query(sql, new RowMapper<Silownia>() {
                @Override
                public Silownia mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Silownia silownia = new Silownia(rs.getInt("ID"),rs.getInt("IDFirmy"), rs.getString("Nazwa"),
                            rs.getString("Adres"), rs.getString("Telefon"));
                    return silownia;
                }
            });
            String returnS ="";
            for(int i=0;i<result.size();i++) {
                returnS += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnS +=",";
            }
            System.out.println("{\"Status\":\"success\", \"Silownie\":["+returnS+"]}");
            return"{\"Status\":\"success\", \"Silownie\":["+returnS+"]}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
    @GetMapping("/insertUserGym/{firmID}/{gymName}/{adress}/{telefon}")
    public String insertUserGym(@PathVariable("firmID") String firmID,@PathVariable("gymName") String gymName,@PathVariable("adress") String adress,@PathVariable("telefon") String telefon) throws SQLException {
        String sql = "INSERT INTO silownie VALUES(silownieID.nextVal, '" + firmID + "','" + gymName + "','"+ adress + "','" + telefon +"')";
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }
    }
    @PostMapping("/uploadPhoto")
    public String uploadPhoto(@RequestParam("file") MultipartFile file,@RequestParam("productName") String productName, @RequestParam("productDescription") String productDescription, @RequestParam("productPrice") String productPrice, @RequestParam("selectedGroup") String selectedGroup)  {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String code ="";
        Random random = new Random();
        for(int i=0;i<5;i++)
                    code=code+(characters.charAt(random.nextInt(characters.length())));

        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String fileName = productName + "_" + currentDate +"_" + code + ".png";
        String sql = "INSERT INTO produkty(ID, NAZWA, OPIS, ZDJECIE, CENA, dataDodania, IDGRUPY) VALUES(PRODUKTYID.nextVal, '"+productName+"','"+productDescription+"','"+fileName+"',"+productPrice+" , SYSDATE,'"+selectedGroup+"')" ;
        if (file.isEmpty()) {
            return "Plik nie został wybrany.";
        }
        try {
            // Zapisz plik na serwerze
            File destination = new File("D:/studia/studia/semestr 6/gymshop/zdjecia/" + fileName);
            file.transferTo(destination);
            try {
                System.out.println(sql);
                jdbc.update(sql);
                return "{\"Status\":\"success\"}";
            } catch (Exception ex) {
                return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Wystąpił błąd podczas zapisywania pliku.";
        }
    }
    /*@PostMapping("/getPhoto")
    public ResponseEntity<MultiValueMap<String, Object>> getPhotos(@RequestBody String fileName) {
        List<Resource> photos = new ArrayList<>();
            String filePath = "D:/studia/studia/semestr 6/gymshop/zdjecia/" + fileName;
            System.out.println(fileName);
            Resource photo = new FileSystemResource(filePath);
            if (photo.exists()) {
                photos.add(photo);
            }

        if (!photos.isEmpty()) {
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            for (Resource photo : photos) {
                body.add("photos", photo);
            }
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(body);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
    @PostMapping("/getPhoto")
    public ResponseEntity<Resource> getPhoto(@RequestBody String fileName) {
        System.out.println(fileName);
        String filePath = "D:/studia/studia/semestr 6/gymshop/zdjecia/"+fileName; // Ścieżka do pliku ze zdjęciem
        Resource photo = new FileSystemResource(filePath);
        if (photo.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(photo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/selectUserFavourite/{userId}")
    public String selectUserFavourite(@PathVariable("userId") String userId) throws SQLException {
        String sql = "Select * from ULUBIONE  where IDUZYT="+userId;
        try {
            System.out.println(sql);
            List<String> result = jdbc.query(sql, new RowMapper<String>() {
                @Override
                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return rs.getString("IDPROD");
                }
            });
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(result);
            System.out.println("{\"Status\":\"success\", \"Favourite\":"+json+"}");
            return"{\"Status\":\"success\", \"Silownie\":"+json+"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }

    @GetMapping("/addFavourite/{userId}/{prodId}")
    public String addUserFavourite(@PathVariable("userId") String userId, @PathVariable("prodId") String prodId) throws SQLException {
        String sql = "INSERT INTO ULUBIONE  ('"+prodId+"','"+userId+"')";
        try {
            System.out.println(sql);
            jdbc.update(sql);
            return "{\"Status\":\"success\"}";
        } catch (Exception ex) {
            return "{\"Status\":\"error\",\"Message\":\"" + ex.getMessage() + "\"}";
        }
    }

}

