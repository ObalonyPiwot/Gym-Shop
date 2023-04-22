package pl.gymshopspring;

import jakarta.annotation.PostConstruct;
import org.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.io.Serializable;
import java.util.HashMap;


@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionObjetcs implements Serializable {

    private transient HashMap<String, JSONObject> sessionData = new HashMap<>();

    public HashMap getData()
    {
        return  sessionData;
    }
    public void setSessionData(String key, JSONObject value) {
        this.sessionData.put(key, value);
    }
}
