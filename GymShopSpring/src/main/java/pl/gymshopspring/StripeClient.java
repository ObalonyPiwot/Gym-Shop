package pl.gymshopspring;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;
@Component
@CrossOrigin
public class StripeClient {
    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_51MzlNHGpf7NnxYjCEzJpcyGV1Txh8a5sUiFciggh5mrcXChguyH6l7GJSgzxzE614Z254l4m6xUuOphKUlftqX4O00x5HKgozM";
    }
    public Customer createCustomer(String token, String email) throws Exception {
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }
    private Customer getCustomer(String id) throws Exception {
        return Customer.retrieve(id);
    }
    public Charge chargeNewCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
    public Charge chargeCustomerCard(String customerId, int amount) throws Exception {
        String sourceCard = getCustomer(customerId).getDefaultSource();
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        chargeParams.put("source", sourceCard);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
}