package pl.gymshopspring;
import com.stripe.model.Charge;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
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
}
