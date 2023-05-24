package pl.gymshopspring;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.servlet.http.HttpSessionBindingEvent;
import jakarta.servlet.http.HttpSessionBindingListener;
import org.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;


import java.io.Serializable;
import java.util.HashMap;


@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)

public class SessionData implements HttpSessionBindingListener, Serializable {
    private transient  HashMap<String, HashMap<String, String>> data = new HashMap<>();

    public void setData(String key1, String key2, String value ) {
        HashMap<String, String> userValue;
        if (data == null)
            userValue = new HashMap<>();
        else
            userValue = data.get(key1);
        userValue.put(key2, value);
        data.put(key1, userValue);
    }

    public HashMap<String, HashMap<String, String>> getData() {
        return data;
    }

    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        // Powiadomienie o dodaniu obiektu do sesji
    }

    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        // Powiadomienie o usunięciu obiektu z sesji
    }
}
