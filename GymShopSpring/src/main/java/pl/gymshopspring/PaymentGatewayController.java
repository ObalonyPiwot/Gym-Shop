package pl.gymshopspring;
import com.stripe.model.Charge;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private StripeClient stripeClient;
    @Autowired
    PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }
    @Autowired
    private JdbcTemplate jdbc;
    @PostMapping("/charge")
    public Charge chargeCard(@RequestHeader(value="token") String token, @RequestHeader(value="amount") Double amount, @RequestBody String bodyData) throws Exception {
        JSONObject json = new JSONObject(bodyData);
        System.out.println("TEEEST" + (json));
        JSONObject userData = new JSONObject(json.get("userData").toString());
        System.out.println("TEEESTOOOWWWYYYYY" + (userData));
        return this.stripeClient.chargeNewCard(token, amount);
    }

    @PostMapping("/insertDatabase")
    public String insertDatabased(@RequestBody String bodyData) throws Exception {
        JSONObject json = new JSONObject(bodyData);
        JSONObject userData = new JSONObject(json.get("userData").toString());
        System.out.println(userData);
        String sql = " INSERT INTO TRANSAKCJE VALUES (transakcjeID.nextVal, '"+userData.get("id")+"', '"+json.get("userCart").toString()+"', sysdate , "+json.get("amount")+", '"+json.get("total")+"','"+json.get("succes") +"' )";
        System.out.println("TEST SQL  "+sql);
        jdbc.update(sql);
        return "sukces";
    }

    @PostMapping("/getTransactionHistory")
    public String getTransactionHistory(@RequestHeader(value="userID") int userID) throws Exception {
        String sql = "Select * from Transakcje where IDUzyt="+userID;

        try {
            List<Transaction> result = jdbc.query(sql, new RowMapper<Transaction>() {
                @Override
                public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Transaction transaction = new Transaction(rs.getInt("id"), rs.getString("Data"),rs.getString("Dane"), rs.getDouble("Cena"), rs.getInt("ilosc"), rs.getString("czySukces"));
                    return transaction;
                }
            });

            String returnProducts ="";
            for(int i=0;i<result.size();i++) {
                returnProducts += result.get(i).toJSON();
                if(i!=result.size()-1)
                    returnProducts +=",";
            }
            System.out.println("{\"TEEEEEEESSSSSTTTTTT\":\"success\", \"Transakcje\":["+returnProducts+"]}");
            return"{\"Status\":\"success\", \"Transakcje\":["+returnProducts+"]}";
        } catch (EmptyResultDataAccessException e) {
            return "{\"Status\":\"error\"}";
        } catch (Exception e) {
            return "{\"Status\":\"error\",\"Message\":\"" + e.getMessage() + "\"}";
        }
    }
}
